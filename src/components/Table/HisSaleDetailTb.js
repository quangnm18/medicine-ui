import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function HisSaleDetailTb({ data, method }) {
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
            width: '100px',
        },
        {
            name: 'Tên dược',
            selector: (row) => row.ten_duoc,
            width: '400px',
            sortable: true,
        },
        {
            name: 'Số lượng bán',
            selector: (row) => row.so_luong_ban,
            width: '140px',
        },
        {
            name: 'Đơn vị',
            selector: (row) => row.don_vi_ban,
            width: '100px',
        },

        {
            name: 'Đơn giá',
            selector: (row) => Intl.NumberFormat().format(row.don_gia_ban),
            width: '180px',
            sortable: true,
        },

        {
            name: 'Thành tiền',
            selector: (row) => Intl.NumberFormat().format(row.thanh_tien),
            width: '180px',
            sortable: true,
        },

        {
            name: 'Ngày bán',
            selector: (row) => {
                let date = new Date(row.createdAt);
                return date.toLocaleDateString();
            },
            width: '180px',
        },

        {
            name: 'Mã hóa đơn',
            selector: (row) => row.ma_hoa_don,
            width: '140px',
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
            width: '100px',
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default HisSaleDetailTb;
