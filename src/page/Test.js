import { useNavigate } from "react-router-dom";

import { useAuth } from "../components/AuthContext";



function Test() {
    const navigate = useNavigate();
    const { token,setToken } = useAuth();
    console.log();
    const signUpButton = () =>{
        setToken(null)
        navigate('/signup')
    }
    return(
        <div>
            {token}
            <button onClick={signUpButton}>
                跳轉
            </button>
        </div>
    )
}
export default Test