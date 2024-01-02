import { faSellcast } from '@fortawesome/free-brands-svg-icons';
import {
    faBoxesStacked,
    faCapsules,
    faCartShopping,
    faChartColumn,
    faChevronDown,
    faChevronUp,
    faFileExport,
    faHouse,
    faList,
    faListCheck,
    faListUl,
    faPaste,
    faRectangleList,
    faSquarePlus,
    faTruckMoving,
    faUser,
    faUserGear,
    faWarehouse,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import routesConfig from '~/config/routes';

export const SidebarData = [
    {
        id: 1,
        title: 'Trang chủ',
        path: routesConfig.home,
        icon: <FontAwesomeIcon icon={faHouse} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
    {
        id: 2,
        title: 'Bán hàng',
        path: routesConfig.sell,
        icon: <FontAwesomeIcon icon={faCartShopping} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Lập hóa đơn',
                path: routesConfig.sellCreate,
                icon: <FontAwesomeIcon icon={faSellcast} />,
            },
            {
                title: 'Danh sách hóa đơn',
                path: routesConfig.sellList,
                icon: <FontAwesomeIcon icon={faListUl} />,
            },
        ],
    },
    {
        id: 3,
        title: 'Quản lý kho',
        path: routesConfig.warehouse,
        icon: <FontAwesomeIcon icon={faWarehouse} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Nhập kho',
                path: routesConfig.importCreate,
                icon: <FontAwesomeIcon icon={faSquarePlus} />,
            },
            {
                title: 'Danh sách nhập kho',
                path: routesConfig.importList,
                icon: <FontAwesomeIcon icon={faListCheck} />,
            },
            {
                title: 'Xuất kho',
                path: routesConfig.exportGoods,
                icon: <FontAwesomeIcon icon={faFileExport} />,
            },
            {
                title: 'Danh sách xuất kho',
                path: routesConfig.importGoods,
                icon: <FontAwesomeIcon icon={faListCheck} />,
            },
            {
                title: 'Kiểm kho',
                path: routesConfig.checkInventory,
                icon: <FontAwesomeIcon icon={faBoxesStacked} />,
            },
        ],
    },
    {
        id: 4,
        title: 'Danh mục',
        path: routesConfig.category,
        icon: <FontAwesomeIcon icon={faRectangleList} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Nhân viên',
                path: routesConfig.categoryStaff,
                icon: <FontAwesomeIcon icon={faUser} />,
            },
            {
                title: 'Nhà cung cấp',
                path: routesConfig.categorySupplier,
                icon: <FontAwesomeIcon icon={faTruckMoving} />,
            },
            {
                title: 'Dược phẩm',
                path: routesConfig.categoryMedicine,
                icon: <FontAwesomeIcon icon={faCapsules} />,
            },
            {
                title: 'Nhóm dược phẩm',
                path: routesConfig.categoryMedicine,
                icon: <FontAwesomeIcon icon={faList} />,
            },
        ],
    },
    {
        id: 5,
        title: 'Báo cáo',
        path: routesConfig.report,
        icon: <FontAwesomeIcon icon={faPaste} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
    {
        id: 6,
        title: 'Thống kê',
        path: routesConfig.statistic,
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
    {
        id: 7,
        title: 'Tài khoản',
        path: routesConfig.account,
        icon: <FontAwesomeIcon icon={faUserGear} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
];
