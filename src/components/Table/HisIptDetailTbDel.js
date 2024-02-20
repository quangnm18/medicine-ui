import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisIptDetailTbDel({ data, method, role }) {
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
            width: '40px',
        },
        {
            name: 'Tên dược',
            selector: (row) => <div>{row.med}</div>,
            col: 5,
            sortable: true,
        },
        {
            name: 'SL',
            selector: (row) => row.soluong_lon,
            width: '80px',
        },

        {
            name: 'Tổng',
            selector: (row) => row.sl_tong,
            width: '80px',
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
                return <div>{date.toLocaleString()}</div>;
            },
            width: '140px',
            col: 23,
            sortable: true,
        },

        {
            name: 'Thời gian xóa',
            selector: (row) => {
                let date = new Date(row.deletedAt);
                return <div>{date.toLocaleString()}</div>;
            },
            width: '220px',
            col: 17,
            sortable: true,
        },
        {
            name: 'Người xóa',
            selector: (row) => {
                return <div>{row.Name}</div>;
            },
            width: '140px',
            col: 17,
            sortable: true,
        },

        {
            name: '#',
            cell: (row) => (
                <div>
                    {role === 'ADMA' && (
                        <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.id)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                    {(role === 'ADMA' || role === 'ADM') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                            <FontAwesomeIcon icon={faRotateBack} className={cx('icon-view', 'icon-res')} />
                        </button>
                    )}
                </div>
            ),
            width: '140px',
        },
        {
            name: 'Trạng thái',
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
            width: '130px',
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
            ></DataTable>
        </div>
    );
}

export default HisIptDetailTbDel;
