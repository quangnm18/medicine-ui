import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from './DirectionHeader.module.scss';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function DirectionHeader({ children }) {
    return (
        <div className={cx('direction')}>
            <FontAwesomeIcon icon={faBars} className={cx('direction-icon')} />
            <span className={cx('direction-title')}>{children}</span>
        </div>
    );
}

export default DirectionHeader;
