import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { SidebarData } from './SidebarData';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import routesConfig from '~/config/routes';
import logo from '~/assets/logo.png';

const cx = classNames.bind(style);

function Sidebar() {
    const [open, setOpen] = useState('');
    const [showSubnav, setShowSubnav] = useState(false);

    const toggle = (id) => {
        setOpen(id);
        if (id === open) {
            setShowSubnav(!showSubnav);
        } else {
            setShowSubnav(true);
        }
    };

    return (
        <div className={cx('sidebar')}>
            <aside className={cx('wrapper')}>
                <Link className={cx('sidebar-header')} to={routesConfig.home}>
                    <img src={logo} className={cx('logo')} />
                </Link>
                <nav className={cx('sidebar-nav')}>
                    {SidebarData.map((item, index) => {
                        return (
                            <div key={index}>
                                <div>
                                    <NavLink
                                        to={item.path}
                                        className={(nav) => cx('menu-item', { active: nav.isActive })}
                                        onClick={() => toggle(item.id)}
                                    >
                                        <div className={cx('menu-itemIf')}>
                                            <div className={cx('menu-icon')}>{item.icon}</div>
                                            <span className={cx('menu-title')}>{item.title}</span>
                                        </div>
                                        <div
                                            className={
                                                showSubnav && item.subNav && open === item.id
                                                    ? cx('menu-iconmore', 'opened')
                                                    : cx('menu-iconmore')
                                            }
                                        >
                                            {/* {showSubnav && item.subNav && open === item.id
                                                ? item.iconOpened
                                                : item.subNav
                                                ? item.iconClosed
                                                : null} */}
                                            {item.subNav && item.iconClosed}
                                        </div>
                                    </NavLink>
                                </div>

                                {showSubnav && item.subNav && open === item.id && (
                                    <div className={cx('subMenu-list')}>
                                        {item.subNav.map((subItem, index) => (
                                            <NavLink
                                                key={index}
                                                className={(nav) => cx('subMenu-item', { active: nav.isActive })}
                                                to={subItem.path}
                                            >
                                                <div className={cx('menu-itemIf')}>
                                                    <div className={cx('menu-icon')}>{subItem.icon}</div>
                                                    <span className={cx('menu-title')}>{subItem.title}</span>
                                                </div>
                                            </NavLink>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>
            </aside>
        </div>
    );
}

export default Sidebar;
