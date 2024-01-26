import classNames from 'classnames/bind';
import style from './Acount.module.scss';
import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear, faKey } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import ModalAll from '~/components/ModalPage/ModalAll';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Account() {
    const [modalLogOut, setModalLogOut] = useState(false);

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    const toggleModalLogOut = () => {
        setModalLogOut(!modalLogOut);
    };

    axios.defaults.withCredentials = true;
    const handleLogOut = () => {
        axios
            .get('http://localhost:8081/authen/logout')
            .then((res) => {
                if (res.data.status === 'success') {
                    localStorage.clear();
                    routeChange('/login');
                } else alert('Error');
            })
            .catch((e) => console.log(e));
    };

    return (
        <div>
            <DirectionHeader>Tài khoản</DirectionHeader>
            <div className={cx('content')}>
                <div className={cx('content-left')}>
                    <div className={cx('info')}>
                        <div className={cx('avatar')}></div>
                        <div className={cx('name')}>
                            {localStorage.getItem('data_user') && JSON.parse(localStorage.getItem('data_user')).name}
                        </div>
                        <div className={cx('role')}>
                            {localStorage.getItem('data_user') &&
                                JSON.parse(localStorage.getItem('data_user')).ten_role}
                        </div>
                        <button className={cx('btn-chinhsua')}>Chỉnh sửa Profile</button>
                    </div>

                    <div className={cx('action')}>
                        <div className={cx('action-item', 'action-itemkey')}>
                            <FontAwesomeIcon icon={faKey} className={cx('icon', 'icon-key')} />
                            <span>Đổi mật khẩu</span>
                        </div>
                        <div className={cx('action-item', 'action-itemgear')} onClick={toggleModalLogOut}>
                            <FontAwesomeIcon icon={faGear} className={cx('icon', 'icon-gear')} />
                            <span>Đăng xuất</span>
                        </div>
                    </div>

                    {modalLogOut && (
                        <ModalAll
                            label={'Bạn có muốn đăng xuất?'}
                            methodToggle={toggleModalLogOut}
                            methodHandle={handleLogOut}
                        />
                    )}
                </div>

                <div className={cx('content-right')}></div>
            </div>
        </div>
    );
}

export default Account;
