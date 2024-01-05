import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import style from './Toast.module.scss';

function Toast({ type, message }) {
    const Notify = () => {
        toast[type](message, {
            position: 'top-right',
            autoClose: 4000,
        });
    };
    Notify();
    return <ToastContainer />;
}

export default Toast;
