import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function ReportTb({ data, method }) {
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
            name: 'STT',
            selector: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Người tạo',
            selector: (row) => <div>{row.Name}</div>,
            col: 1,
            sortable: true,
        },

        {
            name: 'Thời gian tạo',
            selector: (row) => <div>{new Date(row.createdAt).toLocaleString()}</div>,
        },
        {
            name: 'SĐT',
            selector: (row) => <div>{row.PhoneNumber}</div>,
            width: '140px',
        },
        {
            name: 'Email',
            selector: (row) => <div>{row.Email}</div>,
        },

        {
            name: 'Tiêu đề',
            selector: (row) => <div>{row.title}</div>,
        },

        {
            name: 'Cơ sở',
            selector: (row) => <div>{row.ten_co_so}</div>,
            width: '100px',
        },
        {
            name: 'Trạng thái',
            selector: (row) => (
                <div>
                    {row.status === 1 && <button className={cx('btn-status', 'btn-okay')}>Đã duyệt</button>}
                    {row.status === 0 && <button className={cx('btn-status', 'btn-near')}>Chưa duyệt</button>}
                </div>
            ),
            width: '136px',
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon
                            icon={faTrashCan}
                            className={cx('icon-delete')}
                            onClick={() => method.toggleModalSoftDel(row.id)}
                        />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className={cx('icon-view')}
                            onClick={() => method.toggleModalView(row)}
                        />
                    </button>
                </div>
            ),
            width: '100px',
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                onSort={handleSort}
                highlightOnHover
                fixedHeader
                fixedHeaderScrollHeight="690px"
                className={cx('wrapper-tb')}
            ></DataTable>
        </div>
    );
}

export default ReportTb;
