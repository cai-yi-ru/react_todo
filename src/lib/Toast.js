import { toast } from 'react-toastify';

/** toast吐司 */
function Toast(toastMessage,status) {
    if(status==='success'){
        toast.success(toastMessage,{
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }else if(status==='error'){
        toast.error(toastMessage,{
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    

}

export default Toast