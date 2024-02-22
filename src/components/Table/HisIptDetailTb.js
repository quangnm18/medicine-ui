import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisIptDetailTb({ data, method }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

    const tableStyle = {
        rows: {
            style: {
                fontSize: '16px',
                minHeight: '56px',
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
            width: '50px',
        },
        {
            name: 'Tên dược',
            selector: (row) => <div>{row.med}</div>,
            width: '220px',
            col: 5,
            sortable: true,
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
            width: '150px',
        },
        {
            name: 'SL(ĐVL)',
            selector: (row) => row.soluong_lon,
            width: '100px',
        },
        {
            name: 'Tổng',
            selector: (row) => row.sl_tong,
            width: '90px',
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.dong_goi,
            // width: '180px',
        },

        {
            name: 'Mã hóa đơn',
            col: 19,
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            width: '118px',
            sortable: true,
        },

        {
            name: 'Ngày nhập',
            col: 23,
            selector: (row) => {
                let date = new Date(row.createdDt_at);
                // return <div>{date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}</div>;
                return <div>{date.toLocaleDateString()}</div>;
            },
            width: '140px',
            sortable: true,
        },
        {
            name: 'Hạn sử dụng',
            col: 17,
            selector: (row) => {
                let date = new Date(row.han_dung);
                // return <div>{date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear()}</div>;
                return <div>{date.toLocaleDateString()}</div>;
            },
            width: '130px',
            sortable: true,
        },

        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
            width: '100px',
        },
        {
            name: 'Trạng thái',
            col: 17,
            cell: (row) => {
                const currDate = new Date();
                const dueDate = new Date(row.han_dung);
                const count_date = dueDate - currDate;

                if (count_date > 172800000 && count_date < 1728000000) {
                    return (
                        <div>
                            <button className={cx('btn-status', 'btn-near')}>Sắp hết hạn</button>
                        </div>
                    );
                }

                if (count_date <= 172800000) {
                    return (
                        <div>
                            <button className={cx('btn-due', 'btn-status')}>Đã hết hạn</button>
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
            width: '150px',
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
                fixedHeader
                fixedHeaderScrollHeight="620px"
                className={cx('wrapper-tb')}

                // selectableRows
            ></DataTable>
        </div>
    );
}

export default HisIptDetailTb;
