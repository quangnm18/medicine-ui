import { faEye, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function IptCpListTbDel({ data, method, role }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

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
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Số hóa đơn',
            selector: (row) => <div>{row.invoice_code}</div>,
            width: '120px',
            sortable: true,
            col: 1,
        },
        {
            name: 'Thời gian lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return <div>{date.toLocaleString()}</div>;
            },
            sortable: true,
            col: 2,
        },

        {
            name: 'Người lập',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 4,
            width: '180px',
        },
        {
            name: 'Nhà cung cấp',
            selector: (row) => <div>{row.ten_ncc}</div>,
            sortable: true,
            col: 5,
        },

        {
            name: 'Thời gian xóa',
            selector: (row) => {
                let date = new Date(row.deletedAt);
                return <div>{date.toLocaleString()}</div>;
            },
            sortable: true,
            col: 2,
        },
        {
            name: 'Người xóa',
            selector: (row) => <div>{row.nguoi_xoa}</div>,
            sortable: true,
            col: 4,
            width: '180px',
        },

        {
            name: 'Trạng thái',
            cell: (row) => (
                <div>
                    {row.status === 2 && <button className={cx('btn-status')}>Đang chờ</button>}
                    {row.status === 0 && <button className={cx('btn-status', 'btn-reject')}>Từ chối</button>}
                    {row.status === 1 && <button className={cx('btn-status', 'btn-okay')}>Đã duyệt</button>}
                    {/* {row.status === 2 && (
                        <button className={cx('btn-status')} onClick={() => method.toggleModalAccept(row.invoice_code)}>
                            Phê duyệt
                        </button>
                    )} */}
                </div>
            ),
            sortable: true,
            col: 6,
            width: '125px',
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

                    {(role === 'ADM' || role === 'ADMA') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                            <FontAwesomeIcon icon={faRotateBack} className={cx('icon-view', 'icon-res')} />
                        </button>
                    )}
                </div>
            ),
            width: '135px',
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

export default IptCpListTbDel;
