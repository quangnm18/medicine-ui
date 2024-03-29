import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function IptCpListTb({ data, method }) {
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
            name: 'Ngày lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return <div>{date.toLocaleDateString()}</div>;
            },
            width: '180px',
            sortable: true,
            col: 2,
        },
        {
            name: 'Giá trị nhập',
            selector: (row) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });

                return VND.format(row.giatri_nhap);
            },
            width: '160px',
        },
        {
            name: 'Thành tiền',
            selector: (row) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });

                return <div>{VND.format(row.thanh_tien)}</div>;
            },
            width: '160px',
            sortable: true,
            col: 3,
        },
        {
            name: 'Nhân viên',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 4,
        },
        {
            name: 'Nhà cung cấp',
            selector: (row) => <div>{row.ten_ncc}</div>,
            sortable: true,
            col: 5,
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
            width: '260px',
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

export default IptCpListTb;
