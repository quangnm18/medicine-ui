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

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

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
                    <img src={logo} className={cx('logo')} alt="" />
                </Link>
                <nav className={cx('sidebar-nav')}>
                    {SidebarData.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className={cx(item.id === 5 && user.role !== 'ADMA' ? 'hidden-menu' : null)}
                            >
                                <div>
                                    <NavLink
                                        to={item.subNav ? null : item.path}
                                        className={(nav) =>
                                            cx('menu-item', {
                                                active:
                                                    showSubnav && item.subNav && open === item.id
                                                        ? nav.isActive
                                                        : undefined,
                                            })
                                        }
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
                                                className={(nav) => {
                                                    if (
                                                        item.id === 3 &&
                                                        (subItem.title === 'Nhập kho' ||
                                                            subItem.title === 'Xuất kho') &&
                                                        (user.role === 'STFS' || user.role === 'ADMA')
                                                    ) {
                                                        return cx(
                                                            'subMenu-item',
                                                            { active2: nav.isActive },
                                                            'sub-hidden',
                                                        );
                                                    } else if (
                                                        item.id === 2 &&
                                                        subItem.title === 'Lập hóa đơn' &&
                                                        user.role !== 'STFS'
                                                    ) {
                                                        return cx(
                                                            'subMenu-item',
                                                            { active2: nav.isActive },
                                                            'sub-hidden',
                                                        );
                                                    } else {
                                                        return cx('subMenu-item', { active2: nav.isActive });
                                                    }
                                                }}
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
