import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceListTb({ data, method }) {
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
            name: 'Số hóa đơn',
            selector: (row) => row.ID,
        },
        {
            name: 'Ngày lập',
            selector: (row) => {
                let date = new Date(row.CreateDate);
                return date.toLocaleDateString();
            },
        },
        {
            name: 'Tổng tiền',
            selector: (row) => row.TotalPrice,
        },
        {
            name: 'Nhân viên',
            selector: (row) => row.Name,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalDelete(row.ID)}>
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
