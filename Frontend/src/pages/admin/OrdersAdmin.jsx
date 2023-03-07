import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminOrders from "../../components/admin/AdminOrders";

const OrdersAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admintokenId@#");

    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);
  return (
    <>
      <AdminOrders />
    </>
  );
};

export default OrdersAdmin;
