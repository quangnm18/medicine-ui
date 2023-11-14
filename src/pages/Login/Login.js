import classNames from 'classnames/bind';
import style from './Login.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

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

    const inputsSignUp = [
        {
            id: 1,
            name: 'fullname',
            type: 'text',
            placeholder: 'FullName',
            icon: faUser,
        },
        ...inputsLogin,
        {
            id: 5,
            name: 'repassword',
            type: 'password',
            placeholder: 'Re-password',
            icon: faLock,
        },
    ];

    const [action, setAction] = useState('Login');

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleLogin = () => {
        if (action === 'Login') {
            console.log(values);
        } else {
            setValues({
                username: '',
                email: '',
                password: '',
            });
            setAction('Login');
        }
    };
    const handleSignUp = () => {
        if (action === 'Sign Up') {
            console.log(values);
        } else {
            setValues({
                fullname: '',
                username: '',
                email: '',
                password: '',
                repassword: '',
            });
            setAction('Sign Up');
        }
    };

    return (
        <div className={cx('container')}>
            <div className={cx('header')}>
                <div className={cx('text')}>{action}</div>
            </div>
            <div className={cx('inputs')}>
                {action === 'Login' &&
                    inputsLogin.map((input) => (
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
                {action === 'Sign Up' &&
                    inputsSignUp.map((input) => (
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
                Lost Password? <span>Click Here!</span>
            </div>

            <div className={cx('submit-container')}>
                <div className={action === 'Login' ? cx('submit', 'gray') : cx('submit')} onClick={handleSignUp}>
                    Sign Up
                </div>
                <div className={action === 'Sign Up' ? cx('submit', 'gray') : cx('submit')} onClick={handleLogin}>
                    Login
                </div>
            </div>
        </div>
    );
}

export default Login;
