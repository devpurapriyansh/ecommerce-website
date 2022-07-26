import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { userRequest } from "../requestMethod";
import { useState, useEffect } from "react";

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const CreateOrder = async () => {
      try {
        const response = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrderId(response.data._id);
      } catch {}
    };
    data && CreateOrder();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
      {orderId
        ? `Order has been created successfully. Your order id is : ${orderId}`
        : `Successfull. Your order is being prepared...`}

      <button style={{ padding: 10, marginTop: 20 }}>Go To Homepage</button>
    </div>
  );
};
export default Success;
