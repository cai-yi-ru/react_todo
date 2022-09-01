/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import Cookies from 'universal-cookie'
import Toast  from "../lib/Toast";

function SignUp() {
    //cookie
    const cookies = new Cookies();
    const { register,handleSubmit,formState: { errors },reset } = useForm();
    const { token,setToken } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(token !==null){
            console.log(`已有token`);
            navigate('/')
        }
    }, [navigate, token]);
    /** 註冊按鈕 */
    const onSubmitEvent = async(data) => {
        if(data.password !==data.pwdagain) return Toast('密碼與再次輸入密碼不相同','error')
        const body={
            user:data
        }
        await axios.post('https://todoo.5xcamp.us/users', body).then(res => {
            const getToken = res.headers.authorization
            cookies.set('token', getToken)
            const nickName = res.data.nickname
            sessionStorage.setItem('nickName', nickName);
            setToken(getToken)
            Toast(res.data.message,'success')
            navigate('/')
        }).catch(err=>{
            Toast(err.response.data.error[0],'error')
            reset()
        })
    }

    const loginButton = () =>{
        navigate('/login')
    }
    return(
        <div>
            <div id="signUpPage" className="bg-yellow">
        <div className="container signUpPage vhContainer">
            <div className="side">
                <img className="logoImg" src="https://upload.cc/i1/2022/03/23/rhefZ3.png" alt=""/>
                <img className="d-m-n" src="https://upload.cc/i1/2022/03/23/tj3Bdk.png" alt="workImg"/>
            </div>
            <div>
                <form className="formControls" onSubmit={handleSubmit(onSubmitEvent)}>
                    <h2 className="formControls_txt">註冊帳號</h2>
                    <label className="formControls_label" htmlFor="email">Email</label>
                    <input className="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email"
                    {...register("email", { required: true, pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g })}
                    />
                    {errors.email && errors.email.type === "required" && <span style={{color:"red"}}>此欄位必填</span>}
                    {errors.email && errors.email.type === "pattern" && <span style={{color:"red"}}>不符合 Email 規則</span> }
                    <label className="formControls_label" htmlFor="nickName">您的暱稱</label>
                    <input className="formControls_input" type="text" name="nickName" id="nickName" placeholder="請輸入您的暱稱"
                    {...register("nickname", { required: { value: true, message: "請輸入您的暱稱" } })}
                    />
                    {<span style={{color:"red"}}>{errors.nickName?.message}</span>}
                    <label className="formControls_label" htmlFor="pwd">密碼</label>
                    <input className="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" 
                    {...register("password", { required: true, minLength: 8 })}
                    />
                    {errors.pwd && errors.pwd.type === "required" && <span style={{color:"red"}}>此欄位必填</span>}
                    {errors.pwd && errors.pwd.type === "minLength" && <span style={{color:"red"}}>密碼至少為 8 碼</span> }
                    <label className="formControls_label" htmlFor="pwdagain">再次輸入密碼</label>
                    <input className="formControls_input" type="password" name="pwdagain" id="pwdagain" placeholder="請再次輸入密碼" 
                    {...register("pwdagain", { required: true, minLength: 8 })}
                    />
                    {errors.pwdagain && errors.pwdagain.type === "required" && <span style={{color:"red"}}>此欄位必填</span>}
                    {errors.pwdagain && errors.pwdagain.type === "minLength" && <span style={{color:"red"}}>密碼至少為 8 碼</span> }
                    <input className="formControls_btnSubmit" type="submit" value="註冊帳號"/>
                    <a className="formControls_btnLink" onClick={loginButton}>登入</a>
                </form>
            </div>
        </div>

    </div>
        </div>
    )
}
export default SignUp