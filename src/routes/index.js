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
import ListIptCp from '~/pages/ImportWh/ListIptCp';
import IptWhInvoice from '~/pages/ImportWh/IptWhInvoice';
import InventoryWh from '~/pages/InventoryWh/InventoryWh';
import GroupMed from '~/pages/UnitGroupMed/GroupMed';
import UnitMed from '~/pages/UnitGroupMed/UnitMed';
import HisIptDetail from '~/pages/Statistic/HisIptDetail';
import HisSaleDetail from '~/pages/Statistic/HisSaleDetail';
import Account from '~/pages/Account/Acount';
import GroupMedDel from '~/pages/UnitGroupMed/GroupMedDel';
import MedicineDel from '~/pages/Medicine/MedicineDel';
import SupplierDel from '~/pages/Supplier/SupplierDel';
import UnitMedDel from '~/pages/UnitGroupMed/UnitMedDel';
import ListIptCpDel from '~/pages/ImportWh/ListIptCpDel';
import HisIptDetailDel from '~/pages/Statistic/HisIptDetailDel';
import InvoiceListDel from '~/pages/InvoiceList/InvoiceListDel';
import Branch from '~/pages/Branch/Branch';
import AllStaff from '~/pages/Branch/AllStaff';
import HisSaleDetailDel from '~/pages/Statistic/HisSaleDetailDel';
import CreateExpCp from '~/pages/ExportWh/CreateExpCp';
import ListExpCp from '~/pages/ExportWh/ListExpCp';
import ListExpCpDel from '~/pages/ExportWh/ListExpCpDel';

const publicRoutes = [
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.signUp, component: SignUp, layout: LoginLayout },
    { path: routesConfig.home, component: Home },

    // { path: routesConfig.sell, component: SellInvoiceCreate },
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
    { path: routesConfig.importList, component: ListIptCp },
    { path: routesConfig.checkInventory, component: InventoryWh },
    { path: routesConfig.exportCreate, component: CreateExpCp },
    { path: routesConfig.exportList, component: ListExpCp },

    { path: routesConfig.branchs, component: Branch },
    { path: routesConfig.users, component: AllStaff },

    { path: routesConfig.report, component: Report },

    { path: routesConfig.statistic, component: HisIptDetail },
    { path: routesConfig.historyImportStatistic, component: HisIptDetail },
    { path: routesConfig.historySaleStatistic, component: HisSaleDetail },

    { path: routesConfig.account, component: Account },

    //private routes
    { path: routesConfig.categoryMedicineDel, component: MedicineDel },
    { path: routesConfig.categoryGroupMedicineDel, component: GroupMedDel },
    { path: routesConfig.categoryUnitMedicineDel, component: UnitMedDel },
    { path: routesConfig.categorySupplierDel, component: SupplierDel },
    { path: routesConfig.categoryGroupMedicineDel, component: GroupMedDel },

    { path: routesConfig.importListDel, component: ListIptCpDel },
    { path: routesConfig.sellListDel, component: InvoiceListDel },
    { path: routesConfig.exportListDel, component: ListExpCpDel },

    { path: routesConfig.historyImportStatisticDel, component: HisIptDetailDel },
    { path: routesConfig.historySaleStatisticDel, component: HisSaleDetailDel },
];

const privateRoutes = [
    { path: routesConfig.categoryMedicineDel, component: MedicineDel },
    { path: routesConfig.categoryGroupMedicineDel, component: GroupMedDel },
    { path: routesConfig.categoryUnitMedicineDel, component: UnitMedDel },
    { path: routesConfig.categorySupplierDel, component: SupplierDel },
    { path: routesConfig.categoryGroupMedicineDel, component: GroupMedDel },

    { path: routesConfig.importListDel, component: ListIptCpDel },
    { path: routesConfig.sellListDel, component: InvoiceListDel },

    { path: routesConfig.historyImportStatisticDel, component: HisIptDetailDel },
    { path: routesConfig.historySaleStatisticDel, component: HisSaleDetail },
];

export { publicRoutes, privateRoutes };
