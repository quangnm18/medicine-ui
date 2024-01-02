import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function SignUp() {
    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/`;
        navigate(path);
    };

    const [values, setValues] = useState({
        fullname: '',
        username: '',
        email: '',
        password: '',
        repassword: '',
    });

    const inputsSignUp = [
        {
            id: 1,
            name: 'fullname',
            type: 'text',
            placeholder: 'Họ và tên',
            icon: faUser,
        },
        {
            id: 2,
            name: 'username',
            type: 'text',
            placeholder: 'Tài khoản',
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
            placeholder: 'Mật khẩu',
            icon: faLock,
        },
        {
            id: 5,
            name: 'repassword',
            type: 'password',
            placeholder: 'Nhập lại mật khẩu',
            icon: faLock,
        },
    ];

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSignUp = () => {
        setValues({
            fullname: '',
            username: '',
            email: '',
            password: '',
            repassword: '',
        });
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('text')}>Đăng ký</div>
            </div>
            <div className={cx('inputs')}>
                {inputsSignUp.map((input) => (
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
                Nếu bạn đã có tài khoản? <span onClick={routeChange}>Click Here!</span>
            </div>

            <div className={cx('submit-container')}>
                <div className={cx('submit')} onClick={handleSignUp}>
                    Đăng ký
                </div>
            </div>
        </div>
    );
}

export default SignUp;
