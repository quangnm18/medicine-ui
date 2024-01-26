import avatar from '~/assets/1234.jpg';
import style from './HeaderInfo.module.scss';
import classNames from 'classnames/bind';

function HeaderInfo() {
    const cx = classNames.bind(style);

    return (
        <div className={cx('info')}>
            <div className={cx('header-info')}>
                <img src={avatar} className={cx('logo')} alt="" />

                <span>{localStorage.getItem('data_user') && JSON.parse(localStorage.getItem('data_user')).name}</span>
            </div>
        </div>
    );
}

export default HeaderInfo;
