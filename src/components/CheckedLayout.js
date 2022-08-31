// import { useAuth } from "../components/AuthContext";
import { Navigate,Outlet } from 'react-router-dom';


function CheckedLayout() {
    // const { token } = useAuth();
    // if(!token){
    //     return <Navigate to="/" replace />;
    // }
    return <Outlet />
}
export default CheckedLayout