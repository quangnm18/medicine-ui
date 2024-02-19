import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisSaleDetailTb({ data, method }) {
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
            name: 'Số lô',
            selector: (row) => row.so_lo,
            width: '160px',
        },
        {
            name: 'SL',
            selector: (row) => row.so_luong_ban,
            width: '100px',
        },
        {
            name: 'ĐVT',
            selector: (row) => row.don_vi_ban,
            width: '100px',
        },

        {
            name: 'Đơn giá',
            selector: (row) => Intl.NumberFormat().format(row.don_gia_ban),
            width: '100px',
        },

        {
            name: 'Thành tiền',
            selector: (row) => Intl.NumberFormat().format(row.thanh_tien),
            width: '120px',
        },
        {
            name: 'Loại',
            selector: (row) => row.dong_goi,
            center: true,
        },

        {
            name: 'Thời gian bán',
            col: 16,
            selector: (row) => {
                let date = new Date(row.createdAt);
                return <div>{date.toLocaleString()}</div>;
            },
            // width: '180px',
            sortable: true,
        },

        {
            name: 'Mã hóa đơn',
            col: 8,
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            width: '140px',
            sortable: true,
        },

        {
            name: '#',
            cell: (row) => (
                <div>
                    {/* <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button> */}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
            width: '80px',
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

export default HisSaleDetailTb;
