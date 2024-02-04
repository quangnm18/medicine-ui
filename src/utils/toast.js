import { toast } from 'react-toastify';

export const notify = (data, type) => {
    if (type === 'success') {
        toast.success(data, {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
            draggable: true,
        });
    }

    if (type === 'error') {
        toast.error(data, {
            position: 'top-right',
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
            hideProgressBar: true,
            draggable: true,
        });
    }
};
