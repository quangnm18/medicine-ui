import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceListTb({ data }) {
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
            name: 'Số hóa đơn',
            selector: (row) => row.name,
        },
        {
            name: 'Ngày lập',
            selector: (row) => row.unit,
        },
        {
            name: 'Tổng tiền',
            selector: (row) => row.dueDate,
        },
        {
            name: 'Nhân viên',
            selector: (row) => row.count,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
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
