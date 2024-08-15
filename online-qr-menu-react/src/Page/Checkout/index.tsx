import React, { useState } from 'react';
import PaymentMethod from '../../Component/Payment';
import PaymentAccept from '../../Component/Footer/Payment';
import { useNavigate } from 'react-router-dom';
import PayPalButton from '../../Component/Layout/PaypalButton';
import { RootState } from '../../Hook/rootReducer';
import { useSelector } from 'react-redux';
import QRCode from 'react-qr-code';

const Checkout: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>('Cash');
    const [amount, setAmount] = useState<number>(10);
    const [showPayPal, setShowPayPal] = useState<boolean>(false);
    const [qrCode, setQrCode] = useState<string | null>(null);
    const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
    const nav = useNavigate();
    const items = useSelector((state: RootState) => state.cart.items);

    const subtotal = items.reduce((acc, item) => {
      const itemTotal = item.sizeOptions.reduce((itemAcc, sizeOption) => itemAcc + (sizeOption.quantity * item.price), 0);
      return acc + itemTotal;
    }, 0);
  
    const discount = 0;

    const handleChange = async (method: string) => {
        setSelectedMethod(method);
        if (method === 'PayPal') {
            setAmount(subtotal - discount);
            setShowPayPal(true);
        } else if (method === 'QR') {
            setAmount(subtotal - discount);
            setShowPayPal(false);
            await generateQRCode(subtotal - discount);
        } else {
            setShowPayPal(false);
        }
    };

    const generateQRCode = async (amount: number) => {
        try {
            const response = await fetch('https://<vietqr-host>/<basepath>/api/qr/generate-customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer <token>'
                },
                body: JSON.stringify({
                    bankCode: 'YOUR_BANK_CODE',
                    bankAccount: 'YOUR_BANK_ACCOUNT', // Thay thế bằng tài khoản ngân hàng thực tế
                    userBankName: 'YOUR_NAME', // Thay thế bằng tên của chủ tài khoản
                    content: 'Payment for order',
                    qrType: 0, // Tùy chọn loại mã QR: 0 cho mã QR động
                    amount: amount,
                    orderId: 'ORDER_ID', // Thay thế bằng mã ID giao dịch thực tế
                    transType: 'C',
                    terminalCode: 'YOUR_TERMINAL_CODE', // Thay thế bằng mã cửa hàng thực tế
                    serviceCode: 'YOUR_SERVICE_CODE', // Thay thế bằng mã dịch vụ thực tế
                    sign: 'YOUR_SIGNATURE', // Thay thế bằng chữ ký thực tế (nếu cần)
                    urlLink: 'YOUR_REDIRECT_URL' // Thay thế bằng URL cần chuyển hướng sau khi quét mã QR
                })
            });
            const data = await response.json();
            setQrCode(data.qrCode); // Mã QR dạng string
            setQrCodeLink(data.qrLink); // Mã QR dạng link
        } catch (error) {
            console.error('Error generating QR code:', error);
            alert('Đã xảy ra lỗi khi tạo mã QR. Vui lòng thử lại.');
        }
    };

    const handleCheckout = async () => {
        try {
            switch (selectedMethod) {
                case 'Cash':
                    alert('Thanh toán bằng tiền mặt thành công');
                    break;
                case 'QR':
                    alert('Thanh toán qua mã QR thành công');
                    break;
                case 'PayPal':
                    setShowPayPal(false);
                    alert('Thanh toán qua mã Paypal thành công');
                    break;
                case 'Bank':
                    await fetch('/api/checkout/bank', { method: 'POST' });
                    alert('Thanh toán qua chuyển khoản ngân hàng thành công');
                    break;
                default:
                    throw new Error('Phương thức thanh toán không hợp lệ');
            }
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
                {showPayPal ? (
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
