import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceCreateTb({ data }) {
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
        },
        {
            name: 'Tên dược',
            selector: (row) => row.ten,
        },
        {
            name: 'Số lượng',
            cell: (row) => <input />,
        },
        {
            name: 'Giá bán',
            cell: (row) => <input />,
        },
        {
            name: 'Đơn giá',
            selector: (row) => row.don_gia,
        },
        {
            name: 'Thành tiền',
            selector: (row) => row.totalPrice,
        },
        {
            name: '#',
            cell: (row) => (
                <button className={cx('btn')}>
                    <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                </button>
            ),
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default InvoiceCreateTb;
