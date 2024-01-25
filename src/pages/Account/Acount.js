import classNames from 'classnames/bind';
import style from './Acount.module.scss';
import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faKey } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function Account() {
    const handleLogOut = () => {};

    return (
        <div>
            <DirectionHeader>Tài khoản</DirectionHeader>
            <div className={cx('content')}>
                <div className={cx('content-left')}>
                    <div className={cx('info')}>
                        <div className={cx('avatar')}></div>
                        <div className={cx('name')}>{localStorage.getItem('name')}</div>
                        <div className={cx('role')}>Nhân viên</div>
                        <button className={cx('btn-chinhsua')}>Chỉnh sửa Profile</button>
                    </div>

                    <div className={cx('action')}>
                        <div className={cx('action-item', 'action-itemkey')}>
                            <FontAwesomeIcon icon={faKey} className={cx('icon', 'icon-key')} />
                            <span>Đổi mật khẩu</span>
                        </div>
                        <div className={cx('action-item', 'action-itemgear')}>
                            <FontAwesomeIcon icon={faGear} className={cx('icon', 'icon-gear')} />
                            <span>Đăng xuất</span>
                        </div>
                    </div>
                </div>
                <div className={cx('content-right')}>abc</div>
            </div>
        </div>
    );
}

export default Account;
