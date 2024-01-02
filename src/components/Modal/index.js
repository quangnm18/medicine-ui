import style from './Modal.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

const cx = classNames.bind(style);

function Modal({ children }) {
    return (
        <div className={cx('modal')}>
            <div className={cx('modal-overlay')}></div>
            <div className={cx('modal-body')}>{children}</div>
        </div>
    );
}

export default memo(Modal);
