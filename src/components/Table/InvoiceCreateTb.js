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
            selector: (row) => row.id,
        },
        {
            name: 'Tên dược',
            selector: (row) => row.name,
        },
        {
            name: 'Đơn vị',
            selector: (row) => row.unit,
        },
        {
            name: 'Hạn dùng',
            selector: (row) => row.dueDate,
        },
        {
            name: 'Số lượng',
            selector: (row) => row.count,
        },
        {
            name: 'Đơn giá',
            selector: (row) => row.price,
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
