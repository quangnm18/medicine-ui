import * as request from '~/utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('category/supplier/');
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getCurr = async (data) => {
    try {
        const res = await request.get('category/supplier/current/');
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const getDeleted = async (data) => {
    try {
        const res = await request.get('category/supplier/deleted/');
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
