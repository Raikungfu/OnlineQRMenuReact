import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VerifiedIcon from "@mui/icons-material/Verified";
import DoneIcon from "@mui/icons-material/Done";

const OrderDetail: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [openStatus, setOpenStatus] = useState<boolean>(false);
  const { orderId } = useParams<{ orderId: string }>();

  const steps = [
    {
      label: "Đặt hàng thành công",
      icon: <CheckCircleIcon className="text-white-300" />,
    },
    {
      label: "Chờ thanh toán",
      icon: <AccessTimeIcon className="text-yellow-400" />,
    },
    {
      label: "Thanh toán thành công",
      icon: <CreditCardIcon className="text-blue-600" />,
    },
    {
      label: "Đã xác nhận",
      icon: <VerifiedIcon className="text-purple-600" />,
    },
    { label: "Đã làm xong", icon: <DoneIcon className="text-white-300" /> },
  ];

  const getCurrentStep = (status: string) => {
    switch (status) {
      case "Ordered":
        return 1;
      case "Pending":
        return 2;
      case "Paid":
        return 3;
      case "Confirm":
        return 4;
      case "Done":
        return 5;
      default:
        return 0;
    }
  };

  const toggleStatus = () => {
    setOpenStatus(!openStatus);
  };

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const foundOrder = storedOrders.find(
      (order: any) => order.orderId === Number(orderId)
    );
    setOrder(foundOrder);
    setCurrentStep(getCurrentStep(foundOrder.status));
  }, [orderId]);

  if (!order) {
    return (
      <div className="text-center text-gray-500">Đơn hàng không tìm thấy.</div>
    );
  }

  return (
    <div className="flex flex-col w-full max-w-md h-auto p-4 space-y-5">
      <div className="w-full h-5 relative flex justify-between">
        <div
          className={`${
            openStatus ? "text-black/50" : "text-black"
          } text-base font-normal font-['Inter'] cursor-pointer`}
          onClick={toggleStatus}
        >
          Thông tin đơn hàng
        </div>
        <div
          className={`${
            openStatus ? "text-black" : "text-black/50"
          } text-base font-normal font-['Inter'] cursor-pointer`}
          onClick={toggleStatus}
        >
          Trạng thái
        </div>
      </div>

      {!openStatus ? (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="text-black text-2xl font-medium font-['Inter']">
            Đơn hàng {order.orderId}
          </div>
          <div className="mb-4 flex flex-row justify-between">
            <div className="text-black/50 text-base font-normal font-['Inter']">
              Phương thức thanh toán
            </div>
            <div className="text-orange-600 text-base font-semibold font-['Inter']">
              {order.paymentMethod}
            </div>
          </div>

          <div className="bg-white border border-black/10 mb-2" />
          <div className="mb-4 text-black text-lg font-semibold font-['Inter']">
            Danh sách sản phẩm
          </div>
          {order.items.map((item: any, index: number) => (
            <>
              <div key={index} className=" flex justify-between">
                <div className="text-black/50 text-lg font-semibold font-['Inter']">
                  {item.productName}
                </div>
                <div className="text-black/50 text-lg font-semibold font-['Inter']">
                  {item.price}
                </div>
              </div>
              {item.sizeOptions.map((size: any, index: number) => (
                <div
                  key={`${item.productId}-${index}`}
                  className="mb-4 flex justify-between"
                >
                  <span className="text-black/50 text-base font-semibold font-['Inter']">
                    {size.size} - {size.option} - {size.price}
                  </span>

                  <div className="text-black/50 text-sm font-normal font-['Inter']">
                    x {size.quantity}
                  </div>
                </div>
              ))}
            </>
          ))}

          <div className="bg-white border border-black/10 my-4" />
          <div className="space-y-2">
            <div className="text-black/80 text-lg flex flex-row justify-between">
              <div className="font-semibold font-['Inter']">
                Tạm tính ({order.items.length} món)
              </div>
              <div className="font-semibold font-['Inter']">
                {order.subtotal}
              </div>
            </div>
            <div className="text-black/80 text-lg flex flex-row justify-between">
              <div className="font-semibold font-['Inter']">Giảm giá</div>
              <div className="font-semibold font-['Inter']">
                {order.discount}
              </div>
            </div>
            <div className="text-xl flex flex-row justify-between">
              <div className="text-black font-semibold font-['Inter']">
                Tổng cộng
              </div>
              <div className="text-black font-semibold font-['Inter']">
                {order.subtotal - order.discount}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full p-4 bg-white border border-gray-200 rounded-lg shadow-md">
          <div className="relative">
            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-row items-center mb-4 justify-between"
              >
                <div className="flex flex-row gap-4  items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index < currentStep
                        ? "bg-green-500 text-white"
                        : "bg-gray-300 text-black"
                    }`}
                  >
                    {step.icon}
                  </div>

                  <div className="text-sm font-semibold">{step.label}</div>
                </div>

                {index < steps.length && (
                  <div
                    className={`w-1 h-16 mx-2 ${
                      index < currentStep ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <button className="w-full text-xl font-semibold font-['Inter'] text-center py-5 bg-orange-500 text-white border-none cursor-pointer rounded-lg shadow-lg transform transition-transform duration-300 hover:scale-105 hover:bg-orange-600">
        Gọi phục vụ
      </button>
    </div>
  );
};

export default OrderDetail;
