import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisIptDetailTbDel({ data, method }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

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
            selector: (row) => <div>{row.med}</div>,
            width: '180px',
            col: 5,
            sortable: true,
        },
        {
            name: 'Số lượng',
            selector: (row) => row.soluong_lon,
            width: '100px',
        },
        {
            name: 'QĐ (TB)',
            selector: (row) => row.soluong_tb,
            width: '90px',
        },
        {
            name: 'QĐ (NN)',
            selector: (row) => row.soluong_nho,
            width: '90px',
        },
        {
            name: 'Tổng',
            selector: (row) => row.sl_tong,
            width: '100px',
        },
        {
            name: 'ĐVT',
            selector: (row) => row.dong_goi,
            width: '180px',
        },

        {
            name: 'Mã hóa đơn',
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            width: '120px',
            col: 19,
            sortable: true,
        },

        {
            name: 'Ngày nhập',
            selector: (row) => {
                let date = new Date(row.createdDt_at);
                return <div>{date.toLocaleDateString()}</div>;
            },
            width: '140px',
            col: 23,
            sortable: true,
        },
        {
            name: 'Hạn sử dụng',
            selector: (row) => {
                let date = new Date(row.han_dung);
                return <div>{date.toLocaleDateString()}</div>;
            },
            width: '140px',
            col: 17,
            sortable: true,
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
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                highlightOnHover
                onSort={handleSort}
            ></DataTable>
        </div>
    );
}

export default HisIptDetailTbDel;
