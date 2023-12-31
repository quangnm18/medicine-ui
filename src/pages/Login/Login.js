import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Login() {
    const [values, setValues] = useState({
        username: '',
        email: '',
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
            name: 'email',
            type: 'email',
            placeholder: 'Email',
            icon: faEnvelope,
        },
        {
            id: 4,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            icon: faLock,
        },
    ];

    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/register`;
        navigate(path);
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        setValues({
            username: '',
            email: '',
            password: '',
        });
    };

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
                Nếu bạn chưa có tài khoản? <span onClick={routeChange}>Đăng ký</span>
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
