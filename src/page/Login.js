/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */

// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { toast } from 'react-toastify';

function Login() {
    const { register,handleSubmit,formState: { errors },reset } = useForm();
    const { setToken } = useAuth();
    const navigate = useNavigate();

    /**登入按鈕  */
    const onSubmitEvent = (data) => {
        const body={
            user:data
        }
        axios.post('https://todoo.5xcamp.us/users/sign_in', body).then(res => {

            if(res.data.message ==='登入成功'){
                const getToken = res.headers.authorization
                setToken(getToken)
                toast.success(res.data.message,{
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                navigate('/todo')
            }
        }).catch(err=>{
            toast.error(err.response.data.message);
            reset()
        })
    }
    const signUpButton = () =>{
        navigate('/signup')
    }
    return(
        <div>
            <div id="loginPage" className="bg-yellow">
                <div className="container loginPage vhContainer ">
                    <div className="side">
                        <a href="#"><img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt=""/></a>
                        <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"/>
                    </div>
                    <div>
                        <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
                            <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                            <label className="formControls_label" htmlFor="email">Email</label>
                            <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" 
                            {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                            />
                            {errors.email && errors.email.type === "required" && <span style={{color:"red"}}>此欄位必填</span>}
                            {errors.email && errors.email.type === "pattern" && <span style={{color:"red"}}>不符合 Email 規則</span> }
                            <label className="formControls_label" htmlFor="pwd">密碼</label>
                            <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" 
                            {...register("password", { required: true, minLength: 8 })}
                            />
                            {errors.pwd && errors.pwd.type === "required" && <span style={{color:"red"}}>此欄位必填</span>}
                            {errors.pwd && errors.pwd.type === "minLength" && <span style={{color:"red"}}>密碼至少為 8 碼</span> }
                            <input className="formControls_btnSubmit" type="submit" value="登入"/>
                            <a className="formControls_btnLink" type="button" onClick={signUpButton}>註冊帳號</a>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login