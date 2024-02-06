import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const cx = classNames.bind(style);

function Login() {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });

    const inputsLogin = [
        {
            id: 2,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            icon: faUser,
        },
        {
            id: 3,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            icon: faLock,
        },
    ];

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    axios.defaults.withCredentials = true;
    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}`)
            .then((res) => {
                if (document.cookie) {
                    const obj = {
                        userId: res.data.userId,
                        name: res.data.name,
                        role: res.data.role,
                        ten_role: res.data.ten_role,
                        ma_chi_nhanh: res.data.ma_chi_nhanh,
                        ten_chi_nhanh: res.data.ten_chi_nhanh,
                        id_chi_nhanh: res.data.id_chi_nhanh,
                    };
                    localStorage.setItem('data_user', JSON.stringify(obj));
                    routeChange('/');
                } else {
                }
            })
            .catch((e) => console.log(e));
    };

    const handleLogin = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${baseUrl}authen/login`, values)
            .then((res) => {
                if (res.data.status === 'loginSuccess') {
                    localStorage.setItem('statusLogin', res.data.status);
                    loadData();
                } else {
                    alert(res.data.status);
                }
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        if (document.cookie) {
            routeChange('/');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('text')}>Đăng nhập</div>
            </div>
            <div className={cx('inputs')}>
                {inputsLogin.map((input) => (
                    <div key={input.id} className={cx('input')}>
                        <FontAwesomeIcon icon={input.icon} className={cx('icon')} />
                        <input
                            name={input.name}
                            type={input.type}
                            placeholder={input.placeholder}
                            value={values[input.name]}
                            onChange={onChange}
                        />
                    </div>
                ))}
            </div>

            <div className={cx('forgot-password')}>
                Quên mật khẩu? <span>Click Here!</span>
            </div>

            <div className={cx('forgot-password')}>
                Nếu bạn chưa có tài khoản? <span onClick={() => routeChange('/register')}>Đăng ký</span>
            </div>

            <div className={cx('submit-container')}>
                <div className={cx('submit')} onClick={handleLogin}>
                    Login
                </div>
            </div>
        </div>
    );
}

export default Login;
