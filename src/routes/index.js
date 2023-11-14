import routesConfig from '~/config/routes';

import Home from '../pages/Home';
import InvoiceCreate from '~/pages/InvoiceCreate/InvoiceCreate';
import Login from '~/pages/Login/Login';
import LoginLayout from '~/Layout/LoginLayout';
import InvoiceList from '~/pages/InvoiceList/InvoiceList';
import Staff from '~/pages/Staff/Staff';
import Supplier from '~/pages/Supplier/Supplier';
import Medicine from '~/pages/Medicine/Medicine';
import Report from '~/pages/Report/Report';
import ImportWh from '~/pages/ImportWh/ImportWh';

const publicRoutes = [
    { path: routesConfig.login, component: Login, layout: LoginLayout },

    { path: routesConfig.home, component: Home },

    { path: routesConfig.sell, component: InvoiceCreate },
    { path: routesConfig.sellCreate, component: InvoiceCreate },
    { path: routesConfig.sellList, component: InvoiceList },

    { path: routesConfig.category, component: Staff },
    { path: routesConfig.categoryStaff, component: Staff },
    { path: routesConfig.categorySupplier, component: Supplier },
    { path: routesConfig.categoryMedicine, component: Medicine },

    { path: routesConfig.warehouse, component: ImportWh },
    { path: routesConfig.importGoods, component: ImportWh },

    { path: routesConfig.report, component: Report },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
