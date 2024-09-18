import React, { useState } from "react";
import PaymentMethod from "../../Component/Payment";
import PaymentAccept from "../../Component/Footer/Payment";
import { useNavigate, useOutletContext } from "react-router-dom";
import PayPalButton from "../../Component/Layout/PaypalButton";
import { RootState } from "../../Hook/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import axios from "axios";
import CryptoJS from "crypto-js";
import { API_ORDER } from "../../Service/Payment";
import { CartItem, clearCart } from "../../Hook/CartSlide";
import { OrderResponse } from "../../Type/Order";

export interface SendOrderItem {
  productId: number;
  quantity: number;
  sizeOptions: string;
  note: string;
  price: number;
}

const Checkout: React.FC = () => {
  const [selectedMethod, setSelectedMethod] = useState<string>("Cash");
  const [amount, setAmount] = useState<number>(10);
  const [showPayPal, setShowPayPal] = useState<boolean>(false);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [qrCodeLink, setQrCodeLink] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const items = useSelector((state: RootState) => state.cart.items);
  const { shopId, tableId } = useOutletContext<{
    shopId: string;
    tableId: string;
  }>();

  function convertCartToOrderItems(cartItems: CartItem[]): SendOrderItem[] {
    const orderItems: SendOrderItem[] = [];

    cartItems.forEach((item) => {
      item.sizeOptions.forEach((sizeOption) => {
        const orderItem: SendOrderItem = {
          productId: item.productId,
          quantity: sizeOption.quantity,
          sizeOptions: sizeOption.option,
          note: item.note,
          price: item.price + sizeOption.price,
        };
        orderItems.push(orderItem);
      });
    });

    return orderItems;
  }

  const subtotal = items.reduce((acc, item) => {
    const itemTotal = item.sizeOptions.reduce(
      (itemAcc, sizeOption) => itemAcc + sizeOption.quantity * item.price,
      0
    );
    return acc + itemTotal;
  }, 0);

  const discount = 0;

  const handleChange = async (method: string) => {
    setSelectedMethod(method);
    setAmount(subtotal - discount);
    setShowPayPal(method === "PayPal");

    if (method === "QR - Transfer") {
      await generateQRCode(subtotal - discount);
    } else {
      setQrCode(null);
      setQrCodeLink(null);
    }
  };

  const generateQRCode = async (amount: number) => {
    try {
      setLoading(true);

      const response = await axios.post(
        "https://api-merchant.payos.vn/v2/payment-requests",
        {
          orderCode: Date.now(),
          amount,
          description: "Thanh toán",
          cancelUrl:
            "https://onlineqrmenuapp20240813144713.azurewebsites.net/cancel",
          returnUrl:
            "https://onlineqrmenuapp20240813144713.azurewebsites.net/success",
          expiredAt: Math.floor(Date.now() / 1000) + 60,
          signature: generateSignature({
            orderCode: Date.now(),
            amount,
            description: "Thanh toán",
            cancelUrl:
              "https://onlineqrmenuapp20240813144713.azurewebsites.net/cancel",
            returnUrl:
              "https://onlineqrmenuapp20240813144713.azurewebsites.net/success",
          }),
        },
        {
          headers: {
            "x-api-key": import.meta.env.VITE_API_KEY,
            "x-client-id": import.meta.env.VITE_PAYOS_CLIENT_ID,
          },
        }
      );

      const { data } = response;
      if (data.code === "00" && data.desc === "success") {
        setQrCode(data.data.qrCode);
        setQrCodeLink(data.data.checkoutUrl);
      } else {
        alert("Tạo mã QR không thành công: " + data.desc);
      }
    } catch (error) {
      console.error("Error generating QR code:", error);
      alert("Đã xảy ra lỗi khi tạo mã QR. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  const generateSignature = (params: {
    orderCode: number;
    amount: number;
    description: string;
    cancelUrl: string;
    returnUrl: string;
  }): string => {
    const secretKey = import.meta.env.VITE_CHECKSUM_KEY;
    const data = `amount=${params.amount}&cancelUrl=${params.cancelUrl}&description=${params.description}&orderCode=${params.orderCode}&returnUrl=${params.returnUrl}`;
    return CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);
  };

  const handleCheckout = async () => {
    try {
      if (items.length <= 0) {
        alert("Cart empty!");
        return;
      }

      const listOrder = convertCartToOrderItems(items);

      let orderRes;
      let deviceId = localStorage.getItem("deviceId") ?? "";

      switch (selectedMethod) {
        case "Cash":
          orderRes = (await API_ORDER(
            listOrder,
            "Cash",
            shopId,
            tableId,
            deviceId,
            "NOT PAID"
          )) as unknown as OrderResponse;
          break;
        case "QR - Transfer":
          orderRes = (await API_ORDER(
            listOrder,
            "QR - Transfer",
            shopId,
            tableId,
            deviceId,
            "PAID"
          )) as unknown as OrderResponse;
          break;
        case "PayPal":
          setShowPayPal(false);
          orderRes = (await API_ORDER(
            listOrder,
            "PayPal",
            shopId,
            tableId,
            deviceId,
            "PAID"
          )) as unknown as OrderResponse;
          break;
        default:
          throw new Error("Phương thức thanh toán không hợp lệ");
      }

      if (orderRes) {
        const order = {
          orderId: orderRes.OrderId,
          paymentMethod: orderRes.PaymentMethod,
          items,
          subtotal,
          discount,
          status: orderRes.Status,
          orderDate: orderRes.OrderDate,
        };

        const existingOrders = JSON.parse(
          localStorage.getItem("orders") || "[]"
        );
        const updatedOrders = [...existingOrders, order];

        localStorage.setItem("orders", JSON.stringify(updatedOrders));

        dispatch(clearCart());
      }
    } catch (error) {
      console.error("Đã xảy ra lỗi khi thanh toán:", error);
      alert("Đã xảy ra lỗi khi thanh toán. Vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    nav(-1);
  };

  return (
    <div
      className="w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col space-y-6 p-4"
      style={{ height: "calc(100vh - 136px)" }}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="text-black text-2xl font-medium font-['Inter'] mb-4">
          Thanh toán
        </div>
        <div className="space-y-4">
          <PaymentMethod
            imgSrc="https://cdn-icons-png.freepik.com/512/2017/2017461.png"
            label="Tiền mặt"
            isSelected={selectedMethod === "Cash"}
            onChange={() => handleChange("Cash")}
          />
          <PaymentMethod
            imgSrc="https://cdn-icons-png.freepik.com/512/2017/2017461.png"
            label="Quét mã QR - Chuyển khoản"
            isSelected={selectedMethod === "QR - Transfer"}
            onChange={() => handleChange("QR - Transfer")}
          />
          <PaymentMethod
            imgSrc="https://storelinhtinh.com/wp-content/uploads/2022/03/kisspng-paypal-logo-brand-font-payment-paypal-logo-icon-paypal-icon-logo-png-and-vecto-5b7f273e45e8a9.9067728615350597742864.png"
            label="Paypal/Debit or Credit Card"
            isSelected={selectedMethod === "PayPal"}
            onChange={() => handleChange("PayPal")}
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
            {selectedMethod === "QR - Transfer" && qrCode ? (
              <div className="flex flex-col items-center">
                <QRCode value={qrCode} size={256} />
                <p className="mt-4 text-center">Quét mã QR để thanh toán</p>
                {qrCodeLink && (
                  <a
                    href={qrCodeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-orange-500"
                  >
                    Mở liên kết mã QR
                  </a>
                )}
              </div>
            ) : (
              <PaymentAccept
                onCheckout={handleCheckout}
                onCancel={handleCancel}
                checkoutText={"Thanh toán"}
                cancelText={"Hủy"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
