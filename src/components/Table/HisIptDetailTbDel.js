import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisIptDetailTbDel({ data, method }) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const tableStyle = {
        rows: {
            style: {
                fontSize: '16px',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
            },
        },
    };

    const columns = [
        {
            name: '',
            cell: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'Tên dược',
            selector: (row) => row.med,
            width: '200px',
            sortable: true,
        },
        {
            name: 'Số lượng',
            selector: (row) => row.soluong_lon,
            width: '100px',
        },
        {
            name: 'Quy đổi (TB)',
            selector: (row) => row.soluong_tb,
            width: '128px',
        },
        {
            name: 'Quy đổi (NN)',
            selector: (row) => row.soluong_nho,
            width: '128px',
        },
        {
            name: 'Tổng nhập',
            selector: (row) => row.sl_tong,
            width: '140px',
        },
        {
            name: 'ĐVT',
            selector: (row) => row.dvt,
            width: '80px',
        },

        {
            name: 'Mã hóa đơn',
            selector: (row) => row.ma_hoa_don,
            width: '140px',
            sortable: true,
        },

        {
            name: 'Ngày nhập',
            selector: (row) => {
                let date = new Date(row.createdDt_at);
                return date.toLocaleDateString();
            },
            width: '180px',
        },
        {
            name: 'Hạn sử dụng',
            selector: (row) => {
                let date = new Date(row.han_dung);
                return date.toLocaleDateString();
            },
            width: '140px',
        },

        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                        <FontAwesomeIcon icon={faRotateBack} className={cx('icon-view', 'icon-res')} />
                    </button>
                </div>
            ),
            width: '140px',
        },
        {
            name: 'Trạng thái',
            cell: (row) => {
                const currDate = new Date();
                const dueDate = new Date(row.han_dung);
                const count_date =
                    dueDate.getFullYear() * 12 * 30 +
                    (dueDate.getMonth() + 1) * 30 +
                    dueDate.getDate() -
                    currDate.getFullYear() * 12 * 30 -
                    (currDate.getMonth() + 1) * 30 -
                    currDate.getDate();

                if (count_date > 2 && count_date < 20) {
                    return (
                        <div>
                            <button className={cx('btn-status')}>Sắp hết hạn</button>
                        </div>
                    );
                }

                if (count_date <= 2) {
                    return (
                        <div>
                            <button className={cx('btn-near', 'btn-status')}>Đã hết hạn</button>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <button className={cx('btn-status', 'btn-okay')}>Sẵn sàng</button>
                        </div>
                    );
                }
            },
            sortable: true,
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default HisIptDetailTbDel;
