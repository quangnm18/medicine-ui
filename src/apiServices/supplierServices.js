import * as request from '~/utils/request';

export const getAll = async () => {
    try {
        const res = await request.get('category/supplier/');
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
