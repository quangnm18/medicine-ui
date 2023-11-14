import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import style from './Menu.module.scss';
import routesConfig from '~/config/routes';

const cx = classNames.bind(style);

function MenuItem({ title, to, icon }) {
    return (
        <NavLink to={to} className={cx('menu-item')}>
            {icon}
            <span className={cx('menu-title')}>{title}</span>
        </NavLink>
    );
}

export default MenuItem;
