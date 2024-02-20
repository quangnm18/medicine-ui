import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function SupplierTb({ data, method, role }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

    const handleSelectRow = (a) => {
        method.setListSelected(a.selectedRows);
    };
    const tableStyle = {
        rows: {
            style: {
                minHeight: '56px',
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
            name: 'Tên',
            selector: (row) => <div>{row.ten_ncc}</div>,
            col: 1,
            sortable: true,
        },
        {
            name: 'Số điện thoại',
            selector: (row) => row.PhoneNumber,
        },
        {
            name: 'Địa chỉ',
            selector: (row) => row.Address,
        },
        {
            name: 'Email',
            selector: (row) => row.Email,
        },
        {
            name: '',
            cell: (row) => (
                <div>
                    {(role === 'ADM' || role === 'STFW' || role === 'ADMA') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalSingleDelete(row.ID)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row.ID)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
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
                selectableRows
                onSelectedRowsChange={handleSelectRow}
                fixedHeader
                fixedHeaderScrollHeight="690px"
                className={cx('wrapper-tb')}
            ></DataTable>
        </div>
    );
}

export default SupplierTb;
