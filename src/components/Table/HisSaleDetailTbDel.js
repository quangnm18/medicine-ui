import { faEye, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisSaleDetailTbDel({ data, method, role }) {
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
            width: '80px',
        },
        {
            name: 'Tên dược',
            col: 10,
            selector: (row) => <div>{row.ten_duoc}</div>,
            sortable: true,
        },
        {
            name: 'Số lượng bán',
            selector: (row) => row.so_luong_ban,
            width: '140px',
        },
        {
            name: 'Loại',
            selector: (row) => row.dong_goi,
            width: '180px',
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
            width: '180px',
        },

        {
            name: 'Mã hóa đơn',
            col: 8,
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            width: '140px',
            sortable: true,
        },
        {
            name: 'Thời gian xóa',
            col: 16,
            selector: (row) => {
                let date = new Date(row.deletedAt);
                return <div>{date.toLocaleString()}</div>;
            },
            width: '230px',
            // sortable: true,
        },

        {
            name: 'Người xóa',
            col: 16,
            selector: (row) => {
                return <div>{row.Name}</div>;
            },
            width: '180px',
            // sortable: true,
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
                </div>
            ),
            width: '140px',
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

export default HisSaleDetailTbDel;
