import * as request from '~/utils/request';

export const search = async (q) => {
    try {
        const res = await request.get('category/medicine/search/', {
            params: {
                q,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};

export const searchWh = async (isDeleted, q) => {
    try {
        const res = await request.get('category/warehouse/sellsearch/', {
            params: {
                isDeleted: isDeleted,
                q: q,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
