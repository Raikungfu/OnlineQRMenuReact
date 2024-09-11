import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

interface Order {
  orderId: number;
  paymentMethod: string;
  status: string;
  subtotal: number;
  discount: number;
}

const OrderList: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const nav = useNavigate();
  const { shopId, tableId } = useOutletContext<{
    shopId: string;
    tableId: string;
  }>();

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    setOrders(storedOrders);
  }, []);

  const handleOrderClick = (orderId: number) => {
    nav(`/menu/shop/${shopId}/table/${tableId}/order-detail/${orderId}`);
  };

  return (
    <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4">Danh sách đơn hàng</h1>
      {orders.length === 0 ? (
        <div className="text-center text-gray-500">Không có đơn hàng nào.</div>
      ) : (
        <ul className="space-y-4">
          {orders
            .slice()
            .reverse()
            .map((order) => (
              <li
                key={order.orderId}
                className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleOrderClick(order.orderId)}
              >
                <div className="flex justify-between items-center  border-b border-gray-200 pb-2">
                  <div className="text-sm font-semibold text-gray-600">{`Phương thức thanh toán`}</div>
                  <div className={`text-sm font-semibold text-gray-600`}>
                    {order.paymentMethod}
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <div className="text-lg font-medium">{`Đơn hàng ${order.orderId}`}</div>
                  <div
                    className={`text-sm font-semibold ${
                      order.status === "Confirm"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
                <div className="mt-2 flex justify-between">
                  <div className="text-gray-600">Tạm tính</div>
                  <div className="font-semibold">
                    {order.subtotal.toFixed(2)} VNĐ
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-gray-600">Giảm giá</div>
                  <div className="font-semibold">
                    {order.discount.toFixed(2)} VNĐ
                  </div>
                </div>
                <div className="flex justify-between font-semibold mt-2">
                  <div>Tổng cộng</div>
                  <div>{(order.subtotal - order.discount).toFixed(2)} VNĐ</div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default OrderList;
