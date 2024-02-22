import { faSellcast, faUnity } from '@fortawesome/free-brands-svg-icons';
import {
    faBoxesStacked,
    faCapsules,
    faCartShopping,
    faChartColumn,
    faChevronDown,
    faChevronUp,
    faClipboardList,
    faCodeBranch,
    faFileExport,
    faHouse,
    faHouseLaptop,
    faLayerGroup,
    faList,
    faListCheck,
    faListUl,
    faPaste,
    faSquarePlus,
    faTrashCan,
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
                path: routesConfig.exportCreate,
                icon: <FontAwesomeIcon icon={faFileExport} />,
            },
            {
                title: 'Danh sách xuất kho',
                path: routesConfig.exportList,
                icon: <FontAwesomeIcon icon={faListCheck} />,
            },
            {
                title: 'Tồn kho',
                path: routesConfig.checkInventory,
                icon: <FontAwesomeIcon icon={faBoxesStacked} />,
            },
        ],
    },
    {
        id: 4,
        title: 'Quản lý danh mục',
        path: routesConfig.category,
        icon: <FontAwesomeIcon icon={faLayerGroup} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Dược phẩm',
                path: routesConfig.categoryMedicine,
                icon: <FontAwesomeIcon icon={faCapsules} />,
            },
            {
                title: 'Nhóm dược phẩm',
                path: routesConfig.categoryGroupMedicine,
                icon: <FontAwesomeIcon icon={faList} />,
            },
            {
                title: 'Đơn vị dược',
                path: routesConfig.categoryUnitMedicine,
                icon: <FontAwesomeIcon icon={faUnity} />,
            },
            {
                title: 'Nhà cung cấp',
                path: routesConfig.categorySupplier,
                icon: <FontAwesomeIcon icon={faTruckMoving} />,
            },
            {
                title: 'Thông tin nhân viên',
                path: routesConfig.categoryStaff,
                icon: <FontAwesomeIcon icon={faUser} />,
            },
        ],
    },

    {
        id: 5,
        title: 'Quản lý cơ sở',
        path: routesConfig.categoryStaff,
        icon: <FontAwesomeIcon icon={faHouseLaptop} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Nhân viên',
                path: routesConfig.users,
                icon: <FontAwesomeIcon icon={faUser} />,
            },
            {
                title: 'Danh sách chi nhánh',
                path: routesConfig.branchs,
                icon: <FontAwesomeIcon icon={faCodeBranch} />,
            },
        ],
    },

    {
        id: 6,
        title: 'Thống kê',
        path: routesConfig.statistic,
        icon: <FontAwesomeIcon icon={faChartColumn} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
        subNav: [
            {
                title: 'Dược phẩm trong kho',
                path: routesConfig.checkInventory,
                icon: <FontAwesomeIcon icon={faBoxesStacked} />,
            },
            {
                title: 'Chi tiết nhập thuốc',
                path: routesConfig.historyImportStatistic,
                icon: <FontAwesomeIcon icon={faTruckMoving} />,
            },
            {
                title: 'Chi tiết bán thuốc',
                path: routesConfig.historySaleStatistic,
                icon: <FontAwesomeIcon icon={faClipboardList} />,
            },
            {
                title: 'Dược loại bỏ',
                path: routesConfig.statisticRemove,
                icon: <FontAwesomeIcon icon={faTrashCan} />,
            },
        ],
    },

    {
        id: 7,
        title: 'Báo cáo',
        path: routesConfig.report,
        icon: <FontAwesomeIcon icon={faPaste} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
    {
        id: 8,
        title: 'Tài khoản',
        path: routesConfig.account,
        icon: <FontAwesomeIcon icon={faUserGear} />,
        iconClosed: <FontAwesomeIcon icon={faChevronDown} />,
        iconOpened: <FontAwesomeIcon icon={faChevronUp} />,
    },
];
