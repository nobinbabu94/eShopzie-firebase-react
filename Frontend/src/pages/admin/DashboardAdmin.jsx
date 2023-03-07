import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHome from "../../components/admin/AdminHome";

const DashboardAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admintokenId@#");

    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <>
      <AdminHome />
    </>
  );
};

export default DashboardAdmin;
