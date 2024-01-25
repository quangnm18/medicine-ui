import style from './HeaderInfo.module.scss';
import classNames from 'classnames/bind';

function HeaderInfo() {
    const cx = classNames.bind(style);

    return (
        <div className={cx('info')}>
            <div className={cx('header-info')}>
                <img src="https://p16-sign-sg.tiktokcdn.com/aweme/100x100/tiktok-obj/e1749f477d2cb31a8af5606ec4d46c9f.jpeg?x-expires=1699887600&x-signature=Kdh%2BdB5NTrgYXentbTecfE%2B8SDM%3D" />
                <span>{localStorage.getItem('name')}</span>
            </div>
        </div>
    );
}

export default HeaderInfo;
