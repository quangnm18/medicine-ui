import routesConfig from '~/config/routes';

import Home from '../pages/Home';
import Login from '~/pages/Login/Login';
import SignUp from '~/pages/Login/SignUp';
import LoginLayout from '~/Layout/LoginLayout';
import SellInvoiceCreate from '~/pages/SellInvoiceCreate/SellInvoiceCreate';
import InvoiceList from '~/pages/InvoiceList/InvoiceList';
import Staff from '~/pages/Staff/Staff';
import Supplier from '~/pages/Supplier/Supplier';
import Medicine from '~/pages/Medicine/Medicine';
import Report from '~/pages/Report/Report';
import ListImportWh from '~/pages/ImportWh/ListImportWh';
import IptWhInvoice from '~/pages/ImportWh/IptWhInvoice';
import InventoryWh from '~/pages/InventoryWh/InventoryWh';
import GroupMed from '~/pages/UnitGroupMed/GroupMed';
import UnitMed from '~/pages/UnitGroupMed/UnitMed';
import HisIptDetail from '~/pages/Statistic/HisIptDetail';
import HisSaleDetail from '~/pages/Statistic/HisSaleDetail';
import Account from '~/pages/Account/Acount';

const publicRoutes = [
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.signUp, component: SignUp, layout: LoginLayout },

    { path: routesConfig.home, component: Home },

    { path: routesConfig.sell, component: SellInvoiceCreate },
    { path: routesConfig.sellCreate, component: SellInvoiceCreate },
    { path: routesConfig.sellList, component: InvoiceList },

    { path: routesConfig.category, component: Staff },
    { path: routesConfig.categoryStaff, component: Staff },
    { path: routesConfig.categorySupplier, component: Supplier },
    { path: routesConfig.categoryMedicine, component: Medicine },
    { path: routesConfig.categoryGroupMedicine, component: GroupMed },
    { path: routesConfig.categoryUnitMedicine, component: UnitMed },

    { path: routesConfig.warehouse, component: IptWhInvoice },
    { path: routesConfig.importCreate, component: IptWhInvoice },
    { path: routesConfig.importList, component: ListImportWh },
    { path: routesConfig.checkInventory, component: InventoryWh },
    { path: routesConfig.exportCreate, component: InventoryWh },
    { path: routesConfig.exportList, component: InventoryWh },

    { path: routesConfig.report, component: Report },

    { path: routesConfig.statistic, component: HisIptDetail },
    { path: routesConfig.historyImportStatistic, component: HisIptDetail },
    { path: routesConfig.historySaleStatistic, component: HisSaleDetail },

    { path: routesConfig.account, component: Account },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
