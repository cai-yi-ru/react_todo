import { useAuth } from "../components/AuthContext";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "universal-cookie";
import { useEffect } from "react";

function CheckedLayout() {
  const cookies = new Cookies();
  const getCookie = cookies.get("token");
  const { setToken } = useAuth();
  useEffect(()=>{
    if(getCookie){
        setToken(getCookie)
    }
  })
  
  if (!getCookie) {
    return <Navigate to="/login" replace />;
  }else{
    
    return <Outlet />;
  }
  
}
export default CheckedLayout;
