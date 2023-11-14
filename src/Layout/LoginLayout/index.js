import style from './LoginLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function LoginLayout({ children }) {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default LoginLayout;
