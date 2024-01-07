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

    { path: routesConfig.importCreate, component: IptWhInvoice },
    { path: routesConfig.importList, component: ListImportWh },

    { path: routesConfig.exportCreate, component: ListImportWh },
    { path: routesConfig.exportList, component: ListImportWh },

    { path: routesConfig.checkInventory, component: InventoryWh },

    { path: routesConfig.report, component: Report },

    { path: routesConfig.historyImportStatistic, component: HisIptDetail },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
