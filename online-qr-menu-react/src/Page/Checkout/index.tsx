import React, { useState } from 'react';
import PaymentMethod from '../../Component/Payment';
import PaymentAccept from '../../Component/Footer/Payment';
import { useNavigate, useOutletContext } from 'react-router-dom';
import PayPalButton from '../../Component/Layout/PaypalButton';
import { RootState } from '../../Hook/rootReducer';
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { API_ORDER } from '../../Service/Payment';
import { CartItem } from '../../Hook/CartSlide';


interface SendOrderItem {
    productId: number;
    productName: string;
    quantity: number;
    size: string;
    option: string;
    note: string;
    price: number;
}

const Checkout: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>('Cash');
    const [amount, setAmount] = useState<number>(10);
    const [showPayPal, setShowPayPal] = useState<boolean>(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const nav = useNavigate();
    const items = useSelector((state: RootState) => state.cart.items);
    const { id } = useOutletContext<{ id: string }>();

      
    function convertCartToOrderItems(cartItems: CartItem[]): SendOrderItem[] {
        const orderItems: SendOrderItem[] = [];

        cartItems.forEach(item => {
            item.sizeOptions.forEach(sizeOption => {
                const orderItem: SendOrderItem = {
                    productId: item.productId,
                    productName: item.productName,
                    quantity: sizeOption.quantity,
                    size: sizeOption.size,
                    option: sizeOption.option,
                    note: item.note,
                    price: item.price * sizeOption.quantity,
                };
                orderItems.push(orderItem);
            });
        });

        return orderItems;
    }
      

    const subtotal = items.reduce((acc, item) => {
      const itemTotal = item.sizeOptions.reduce((itemAcc, sizeOption) => itemAcc + (sizeOption.quantity * item.price), 0);
      return acc + itemTotal;
    }, 0);

    const discount = 0;

    const handleChange = async (method: string) => {
        setSelectedMethod(method);
        setAmount(subtotal - discount);
        setShowPayPal(method === 'PayPal');
        
        if (method === 'QR') {
            await generateQRCode(subtotal - discount);
        } else {
            setQrCode(null);
            setQrCodeLink(null);
        }
    };

    const generateQRCode = async (amount: number) => {
        try {
            setLoading(true);
            const response = await fetch('https://<vietqr-host>/<basepath>/api/qr/generate-customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>'
                },
                body: JSON.stringify({
                    bankCode: 'YOUR_BANK_CODE',
                    bankAccount: 'YOUR_BANK_ACCOUNT',
                    userBankName: 'YOUR_NAME',
                    content: 'Payment for order',
                    qrType: 0,
                    amount: amount,
                    orderId: 'ORDER_ID',
                    transType: 'C',
                    terminalCode: 'YOUR_TERMINAL_CODE',
                    serviceCode: 'YOUR_SERVICE_CODE',
                    sign: 'YOUR_SIGNATURE',
                    urlLink: 'YOUR_REDIRECT_URL'
                })
            });
            const data = await response.json();
            setQrCode(data.qrCode);
            setQrCodeLink(data.qrLink);
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Đã xảy ra lỗi khi tạo mã QR. Vui lòng thử lại.');
        } finally {
            setLoading(false);
        }
    };

    const handleCheckout = async () => {
        try {
            let newOrderId = "order";

            switch (selectedMethod) {
                case 'Cash':
                    newOrderId = await API_ORDER(items, 'Cash');
                    alert('Thanh toán bằng tiền mặt thành công');
                    break;
                case 'QR':
                    newOrderId = await API_ORDER(items, 'QR');
                    alert('Thanh toán qua mã QR thành công');
                    break;
                case 'PayPal':
                    setShowPayPal(false);
                    newOrderId = await API_ORDER(items, 'PayPal');
                    alert('Thanh toán qua PayPal thành công');
                    break;
                default:
                    throw new Error('Phương thức thanh toán không hợp lệ');
            }
            const listOrder = convertCartToOrderItems(items);
            console.log(listOrder);
            const order = {
                orderId: newOrderId,
                listOrder,
                subtotal,
                discount,
                status: 'pending',
            };
            
            const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
            const updatedOrders = [...existingOrders, order];

            localStorage.setItem('orders', JSON.stringify(updatedOrders));

            localStorage.removeItem('cart'); 
            
            nav(`/menu/${id}/order-detail/${newOrderId}`);
        } catch (error) {
            console.error('Đã xảy ra lỗi khi thanh toán:', error);
            alert('Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.');
        }
    };

    const handleCancel = () => {
        nav(-1);
    };

    return (
        <div className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4" style={{ height: 'calc(100vh - 136px)' }}>
            <div className="flex-1 overflow-y-auto">
                <div className="text-black text-2xl font-medium font-['Inter'] mb-4">Thanh toán</div>
                <div className="space-y-4">
                    <PaymentMethod
                        imgSrc="https://cdn-icons-png.freepik.com/512/2017/2017461.png"
                        label="Tiền mặt"
                        isSelected={selectedMethod === 'Cash'}
                        onChange={() => handleChange('Cash')}
                    />
                    <PaymentMethod
                        imgSrc="https://cdn-icons-png.freepik.com/512/2017/2017461.png"
                        label="Quét mã QR"
                        isSelected={selectedMethod === 'QR'}
                        onChange={() => handleChange('QR')}
                    />
                    <PaymentMethod
                        imgSrc="https://storelinhtinh.com/wp-content/uploads/2022/03/kisspng-paypal-logo-brand-font-payment-paypal-logo-icon-paypal-icon-logo-png-and-vecto-5b7f273e45e8a9.9067728615350597742864.png"
                        label="Paypal/Debit or Credit Card"
                        isSelected={selectedMethod === 'PayPal'}
                        onChange={() => handleChange('PayPal')}
                    />
                </div>
            </div>
            <div className="w-full">
                {loading ? (
                    <div className="flex justify-center items-center">
                        <p>Đang tạo mã QR, vui lòng chờ...</p>
                    </div>
                ) : showPayPal ? (
                    <PayPalButton amount={amount} onSuccess={handleCheckout} />
                ) : (
                    <div>
                        {selectedMethod === 'QR' && qrCode ? (
                            <div className="flex flex-col items-center">
                                <QRCode value={qrCode} size={256} />
                                <p className="mt-4 text-center">Quét mã QR để thanh toán</p>
                                {qrCodeLink && (
                                    <a href={qrCodeLink} target="_blank" rel="noopener noreferrer" className="mt-4 text-blue-500">
                                        Mở liên kết mã QR
                                    </a>
                                )}
                            </div>
                        ) : (
                            <PaymentAccept onCheckout={handleCheckout} onCancel={handleCancel} checkoutText={'Thanh toán'} cancelText={'Hủy'} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Checkout;
