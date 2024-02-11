import avatar from '~/assets/1234.jpg';
import style from './HeaderInfo.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function HeaderInfo() {
    const cx = classNames.bind(style);

    return (
        <div className={cx('info')}>
            <div className={cx('header-info')}>
                <div className={cx('notification')}>
                    <FontAwesomeIcon icon={faBell} className={cx('icon-bell')} />
                </div>

                <div className={cx('info-detail')}>
                    <img src={avatar} className={cx('logo')} alt="" />
                    <span>
                        {localStorage.getItem('data_user') && JSON.parse(localStorage.getItem('data_user')).name}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default HeaderInfo;
