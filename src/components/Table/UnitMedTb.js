import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function UnitMedTb({ data, method }) {
    const handleSelectRow = (a) => {
        method.setListSelected(a.selectedRows);
    };

    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };
    const tableStyle = {
        rows: {
            style: {
                minHeight: '60px',
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
            name: 'Đơn vị lớn',
            selector: (row) => <div>{row.donvi_lon}</div>,
            width: '220px',
            center: true,
            col: 1,
            sortable: true,
        },
        {
            name: 'Đơn vị trung bình',
            selector: (row) => row.donvi_tb,
            width: '220px',
            center: true,
        },
        {
            name: 'Đơn vị nhỏ nhất',
            selector: (row) => <div>{row.donvi_nho}</div>,
            width: '220px',
            center: true,
            col: 2,
            sortable: true,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.description_unit,
            center: true,
        },
        {
            name: 'Mã đơn vị',
            selector: (row) => <div>{row.unit_code}</div>,
            center: true,
            sortable: true,
            col: 3,
        },
        {
            name: '',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
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
                selectableRows
                onSelectedRowsChange={handleSelectRow}
                onSort={handleSort}
                highlightOnHover
            ></DataTable>
        </div>
    );
}

export default UnitMedTb;
