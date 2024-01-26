import { useNavigate } from 'react-router-dom';
import HeaderInfo from '../Components/HeaderInfo/HeaderInfo.js';
import Sidebar from '../Components/Sidebar/Sidebar.js';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';
import { useEffect } from 'react';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        if (!document.cookie) {
            routeChange('/login');
        }
    }, []);

    if (localStorage.getItem('data_user')) {
        return (
            <div className={cx('wrapper')}>
                <Sidebar />
                <div className={cx('substance')}>
                    <HeaderInfo />
                    <div className={cx('substance-content')}>{children}</div>
                </div>
            </div>
        );
    } else return <div></div>;
}

export default DefaultLayout;
