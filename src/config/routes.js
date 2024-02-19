const routes = {
    login: '/login',
    signUp: '/register',
    home: '/',

    sell: '/sell',
    sellCreate: '/sell/create',
    sellList: '/sell/list',
    sellListDel: '/sell/list/deleted',

    warehouse: '/warehouse',
    importCreate: '/warehouse/importcreate',
    importList: '/warehouse/importlist',
    importListDel: '/warehouse/importlist/deleted',

    exportCreate: '/warehouse/exportcreate',
    exportList: '/warehouse/exportlist',
    exportListDel: '/warehouse/exportlist/deleted',

    checkInventory: '/warehouse/inventory',

    category: '/category',
    categoryStaff: '/category/staff',
    categorySupplier: '/category/supplier',
    categorySupplierDel: '/category/supplier/deleted',
    categoryMedicine: '/category/medicine',
    categoryMedicineDel: '/category/medicine/deleted',
    categoryGroupMedicine: '/category/grmedicine',
    categoryGroupMedicineDel: '/category/grmedicine/deleted',
    categoryUnitMedicine: '/category/unitmedicine',
    categoryUnitMedicineDel: '/category/unitmedicine/deleted',

    management: '/management',
    users: '/management/users',
    branchs: '/management/branchs',

    report: '/report',

    statistic: '/statistic',
    historyImportStatistic: '/statistic/historyImport',
    historyImportStatisticDel: '/statistic/historyImport/deleted',

    historySaleStatistic: '/statistic/historySale',
    historySaleStatisticDel: '/statistic/historySale/deleted',

    account: '/account',
};

export default routes;
