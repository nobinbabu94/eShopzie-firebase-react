import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminUsers from "../../components/admin/Users";

const UsersAdmin = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const adminToken = localStorage.getItem('admintokenId@#');
  
    if (!adminToken ) {
      navigate('/admin-login')
  }
  },[navigate])

  return (
    <div>
      <AdminUsers />
    </div>
  );
};
 
export default UsersAdmin;
