import style from './Modal.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Modal({ children }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-overlay')}></div>
            <div className={cx('modal-body')}>{children}</div>
        </div>
    );
}

export default Modal;
