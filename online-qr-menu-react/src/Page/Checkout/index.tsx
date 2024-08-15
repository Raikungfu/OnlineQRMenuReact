import React, { useState } from 'react';
import PaymentMethod from '../../Component/Payment';
import PaymentAccept from '../../Component/Footer/Payment';
import { useNavigate } from 'react-router-dom';
import PayPalButton from '../../Component/Layout/PaypalButton';
import { RootState } from '../../Hook/rootReducer';
import { useSelector } from 'react-redux';

const Checkout: React.FC = () => {
    const [selectedMethod, setSelectedMethod] = useState<string>('Cash');
    const [amount, setAmount] = useState<number>(10);
    const [showPayPal, setShowPayPal] = useState<boolean>(false);
    const nav = useNavigate();
    const items = useSelector((state: RootState) => state.cart.items);


    const subtotal = items.reduce((acc, item) => {
      const itemTotal = item.sizeOptions.reduce((itemAcc, sizeOption) => itemAcc + (sizeOption.quantity * item.price), 0);
      return acc + itemTotal;
    }, 0);
  
    const discount = 0;

    const handleChange = (method: string) => {
        setSelectedMethod(method);
        if (method === 'PayPal') {
            setAmount(subtotal - discount);
            setShowPayPal(true);
        } else {
            setShowPayPal(false);
        }
    };

    const handleCheckout = async () => {
        try {
            switch (selectedMethod) {
                case 'Cash':
                    alert('Thanh toán bằng tiền mặt thành công');
                    break;
                case 'QR':
                    await fetch('/api/checkout/qr', { method: 'POST' });
                    alert('Thanh toán qua mã QR thành công');
                    break;
                case 'PayPal':
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
                    <PaymentAccept onCheckout={handleCheckout} onCancel={handleCancel} checkoutText={'Thanh toán'} cancelText={'Hủy'} />
                )}
            </div>
        </div>
    );
};

export default Checkout;
