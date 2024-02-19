import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function ExpCpListTb({ data, method }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

    const tableStyle = {
        rows: {
            style: {
                fontSize: '16px',
                minHeight: '64px',
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
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Số hóa đơn',
            selector: (row) => <div>{row.invoice_code}</div>,
            width: '140px',
            sortable: true,
            col: 1,
        },

        {
            name: 'Tổng giá trị',
            selector: (row) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });

                return <div>{VND.format(row.totalPrice)}</div>;
            },
            width: '180px',
            sortable: true,
            col: 3,
        },
        {
            name: 'Thời gian tạo',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return <div>{date.toLocaleString()}</div>;
            },
            width: '240px',
            sortable: true,
            col: 2,
        },
        {
            name: 'Nhân viên',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 4,
        },
        {
            name: 'Ghi chú',
            selector: (row) => <div>{row.co_so}</div>,
            width: '120px',
            sortable: true,
            col: 5,
        },
        {
            name: 'Địa chỉ',
            selector: (row) => <div>{row.address}</div>,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.invoice_code)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
            width: '100px',
            center: true,
        },

        {
            name: 'Trạng thái',
            cell: (row) => (
                <div>
                    {row.status === 2 &&
                        (JSON.parse(localStorage.getItem('data_user')).role === 'STFW' ||
                            JSON.parse(localStorage.getItem('data_user')).role === 'STFS' ||
                            JSON.parse(localStorage.getItem('data_user')).role === 'ADMA') && (
                            <button className={cx('btn-status')}>Đang chờ</button>
                        )}
                    {row.status === 0 && <button className={cx('btn-status', 'btn-reject')}>Từ chối</button>}
                    {row.status === 1 && <button className={cx('btn-status', 'btn-okay')}>Đã duyệt</button>}
                    {row.status === 2 && JSON.parse(localStorage.getItem('data_user')).role === 'ADM' && (
                        <div>
                            <button
                                className={cx('btn-status', 'btn-reject', 'btn-click')}
                                onClick={() => method.toggleModalReject(row.invoice_code)}
                            >
                                Từ chối
                            </button>
                            <button
                                className={cx('btn-status', 'btn-click')}
                                onClick={() => method.toggleModalAccept(row.invoice_code)}
                            >
                                Phê duyệt
                            </button>
                        </div>
                    )}
                </div>
            ),
            width: '240px',
            center: true,
            sortable: true,
            col: 6,
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                fixedHeader
                fixedHeaderScrollHeight="620px"
                className={cx('wrapper-tb')}
                highlightOnHover
                onSort={handleSort}
            ></DataTable>
        </div>
    );
}

export default ExpCpListTb;
