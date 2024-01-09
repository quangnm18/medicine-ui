const routes = {
    login: '/login',
    signUp: '/register',
    home: '/',

    sell: '/sell',
    sellCreate: '/sell/create',
    sellList: '/sell/list',

    warehouse: '/warehouse',
    importCreate: '/warehouse/import/create',
    importList: '/warehouse/import/list',
    exportCreate: '/warehouse/export/create',
    exportList: '/warehouse/export/list',
    checkInventory: '/warehouse/inventory',

    category: '/category',
    categoryStaff: '/category/staff',
    categorySupplier: '/category/supplier',
    categoryMedicine: '/category/medicine',
    categoryGroupMedicine: '/category/grmedicine',
    categoryUnitMedicine: '/category/unitmedicine',

    report: '/report',

    statistic: '/statistic',
    historyImportStatistic: '/statistic/historyImport',
    historySaleStatistic: '/statistic/historySale',

    account: '/account',
};

export default routes;
