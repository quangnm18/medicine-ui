import classNames from 'classnames/bind';
import style from './Popper.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);

function Popper({ children }) {
    return <div className={cx('popper')}>{children}</div>;
}

export default memo(Popper);
