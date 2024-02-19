import * as request from '~/utils/request';

export const search = async (q) => {
    try {
        const res = await request.get('category/medicine/search/', {
            params: {
                q,
            },
        });
        return res.data[0];
    } catch (e) {
        console.log(e);
    }
};

export const searchWh = async (branch_id, q) => {
    try {
        const res = await request.get('category/warehouse/sellsearch/', {
            params: {
                branch_id: branch_id,
                q: q,
            },
        });
        return res.data;
    } catch (e) {
        console.log(e);
    }
};
