import classNames from 'classnames/bind';
import style from './Sidebar.module.scss';
import { SidebarData } from './SidebarData';
import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';

import routesConfig from '~/config/routes';
import Menu from './Menu/Menu';
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
        <aside className={cx('wrapper')}>
            <Link className={cx('sidebar-header')} to={routesConfig.home}>
                <img src={logo} className={cx('logo')} />
            </Link>
            <Menu>
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
                                    <div className={cx('menu-iconmore')}>
                                        {showSubnav && item.subNav && open === item.id
                                            ? item.iconOpened
                                            : item.subNav
                                            ? item.iconClosed
                                            : null}
                                    </div>
                                </NavLink>
                            </div>

                            {showSubnav && item.subNav && open === item.id && (
                                <div>
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
            </Menu>
        </aside>
    );
}

export default Sidebar;
