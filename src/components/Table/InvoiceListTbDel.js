import { faEye, faPenToSquare, faRotateBack, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceListTbDel({ data, method }) {
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
        },
        {
            name: 'Số hóa đơn',
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            sortable: true,
            col: 1,
        },
        {
            name: 'Ngày lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return <div>{date.toLocaleDateString()}</div>;
            },
            sortable: true,
            col: 2,
        },
        {
            name: 'Tổng tiền',
            selector: (row) => Intl.NumberFormat().format(row.tong_phai_tra),
        },
        {
            name: 'Người lập',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 4,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-eye')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalRes(row)}>
                        <FontAwesomeIcon icon={faRotateBack} className={cx('icon-view')} />
                    </button>
                </div>
            ),
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

export default InvoiceListTbDel;
