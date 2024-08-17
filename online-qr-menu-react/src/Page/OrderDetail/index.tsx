import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const OrderDetail: React.FC = () => {
    const [order, setOrder] = useState<any>(null);
    const { id2 } = useParams<{ id2: string }>();

    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
        const foundOrder = storedOrders.find((order: any) => order.orderId === id2);
        setOrder(foundOrder);
    }, [id2]);

    if (!order) {
        return <div className="text-center text-gray-500">Đơn hàng không tìm thấy.</div>;
    }

    return (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-2">
                <div className="text-black text-2xl font-medium font-['Inter']">
                    Đơn hàng {order.orderId}
                </div>
            </div>

            <div className="">
                <div className="text-black text-base font-normal font-['Inter']">
                    Thông tin đơn hàng
                </div>
                <div className="text-black/50 text-base font-normal font-['Inter']">
                    Trạng thái
                </div>
                <div className="text-[#2044c1] text-xs font-semibold font-['Inter']">
                    {order.status}
                </div>
            </div>

            <div className="">
                <div className="bg-white border border-black/10 mb-2" />
                <div className="text-black/50 text-lg font-semibold font-['Inter']">
                    Danh sách sản phẩm
                </div>
                {order.listOrder.map((item: any, index: number) => (
                    <div key={index} className="mb-4">
                        <div className="text-black/60 text-base font-semibold font-['Inter']">
                            {item.size}
                        </div>
                        <div className="text-black text-base font-semibold font-['Inter']">
                            {item.productName}
                        </div>
                        <div className="text-black/60 text-sm font-normal font-['Inter']">
                            {item.option}
                        </div>
                    </div>
                ))}
            </div>

            <div className="">
                <div className="bg-white border border-black/5 mb-2" />
                <div className="text-black text-xs font-semibold font-['Inter']">
                    Tạm tính ({order.listOrder.length} món)
                </div>
                <div className="text-[#818181] text-xs font-semibold font-['Inter']">
                    {order.subtotal}
                </div>
                <div className="text-[#818181] text-xs font-semibold font-['Inter']">
                    {order.discount}
                </div>
                <div className="text-black text-xs font-semibold font-['Inter']">
                    Giảm giá
                </div>
            </div>

            <div className="">
                <div className="bg-white border-t border-black/5 mb-2" />
                <div className="text-black text-base font-semibold font-['Inter']">
                    Tổng cộng
                </div>
                <div className="text-black text-base font-semibold font-['Inter']">
                    {order.subtotal - order.discount}
                </div>
            </div>

            <div className="">
                <div className="bg-[#69aeff]/60 rounded-lg mb-2" />
                <div className="text-[#2044c1]/70 text-xl font-semibold font-['Inter']">
                    Gọi phục vụ
                </div>
                <div className="px-1.5 py-1 justify-center items-center inline-flex" />
            </div>
        </div>
    );
};

export default OrderDetail;
