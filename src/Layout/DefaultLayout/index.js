import HeaderInfo from '../Components/HeaderInfo/HeaderInfo.js';
import Sidebar from '../Components/Sidebar/Sidebar.js';
import style from './DefaultLayout.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function DefaultLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Sidebar />
            <div className={cx('substance')}>
                <HeaderInfo />
                <div className={cx('substance-content')}>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;
