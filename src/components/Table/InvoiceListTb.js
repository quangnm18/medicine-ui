import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceListTb({ data, method }) {
    console.log(data);
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
            width: '100px',
        },
        {
            name: 'Số hóa đơn',
            selector: (row) => row.ma_hoa_don,
            width: '140px',
        },
        {
            name: 'Ngày lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return date.toLocaleDateString();
            },
        },
        {
            name: 'Tổng tiền hàng',
            selector: (row) => Intl.NumberFormat().format(row.tong_tien_hang),
        },
        {
            name: 'Tổng CK',
            selector: (row) => Intl.NumberFormat().format(row.tong_ck),
        },
        {
            name: 'Thành tiền',
            selector: (row) => Intl.NumberFormat().format(row.tong_phai_tra),
        },
        {
            name: 'Nhân viên',
            selector: (row) => row.Name,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-eye')} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default InvoiceListTb;
