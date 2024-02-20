import { faEye, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InvoiceListTb({ data, method }) {
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
            cell: (row, index) => index + 1,
            width: '100px',
        },
        {
            name: 'Số hóa đơn',
            selector: (row) => <div>{row.ma_hoa_don}</div>,
            width: '140px',
            sortable: true,
            col: 1,
        },
        {
            name: 'Thời gian lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return <div>{date.toLocaleDateString()}</div>;
            },
            sortable: true,
            col: 2,
        },
        {
            name: 'Tổng tiền hàng',
            selector: (row) => Intl.NumberFormat().format(row.tong_tien_hang),
        },
        {
            name: 'Tổng CK',
            selector: (row) => Intl.NumberFormat().format(row.tong_ck),
            width: '150px',
        },
        {
            name: 'Thành tiền',
            selector: (row) => <div>{Intl.NumberFormat().format(row.tong_phai_tra)}</div>,
            sortable: true,
            col: 3,
        },
        {
            name: 'Nhân viên',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 4,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-eye')} />
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
                highlightOnHover
                onSort={handleSort}
                fixedHeader
                fixedHeaderScrollHeight="580px"
                className={cx('wrapper-tb')}
            ></DataTable>
        </div>
    );
}

export default InvoiceListTb;
