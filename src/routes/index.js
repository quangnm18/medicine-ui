import routesConfig from '~/config/routes';

import Home from '../pages/Home';
import Login from '~/pages/Login/Login';
import SignUp from '~/pages/Login/SignUp';
import LoginLayout from '~/Layout/LoginLayout';
import InvoiceCreate from '~/pages/InvoiceCreate/InvoiceCreate';
import InvoiceList from '~/pages/InvoiceList/InvoiceList';
import Staff from '~/pages/Staff/Staff';
import Supplier from '~/pages/Supplier/Supplier';
import Medicine from '~/pages/Medicine/Medicine';
import Report from '~/pages/Report/Report';
import ListImportWh from '~/pages/ImportWh/ListImportWh';
import CreateInvoiceIpt from '~/pages/ImportWh/IptWhInvoice';

const publicRoutes = [
    { path: routesConfig.login, component: Login, layout: LoginLayout },
    { path: routesConfig.signUp, component: SignUp, layout: LoginLayout },

    { path: routesConfig.home, component: Home },

    { path: routesConfig.sell, component: InvoiceCreate },
    { path: routesConfig.sellCreate, component: InvoiceCreate },
    { path: routesConfig.sellList, component: InvoiceList },

    { path: routesConfig.category, component: Staff },
    { path: routesConfig.categoryStaff, component: Staff },
    { path: routesConfig.categorySupplier, component: Supplier },
    { path: routesConfig.categoryMedicine, component: Medicine },

    { path: routesConfig.warehouse, component: ListImportWh },
    { path: routesConfig.importCreate, component: CreateInvoiceIpt },
    { path: routesConfig.importList, component: ListImportWh },

    { path: routesConfig.importGoods, component: ListImportWh },

    { path: routesConfig.report, component: Report },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
