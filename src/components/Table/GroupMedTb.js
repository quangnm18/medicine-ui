import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function GroupMedTb({ data, method }) {
    const handleSelectRow = (a) => {
        method.setListSelected(a.selectedRows);
    };

    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

    const tableStyle = {
        table: {
            style: {
                textAlign: 'center',
            },
        },
        rows: {
            style: {
                fontSize: '16px',
                minHeight: '60px',
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
            name: 'Tên nhóm thuốc',
            selector: (row) => <div>{row.ten_nhom_thuoc}</div>,
            sortable: true,
            width: '400px',
            col: 1,
        },
        {
            name: 'Mô tả',
            selector: (row) => row.description,
        },
        {
            name: 'Mã nhóm thuốc',
            selector: (row) => <div>{row.group_code}</div>,
            sortable: true,
            width: '180px',
            col: 2,
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
            width: '200px',
            right: true,
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                selectableRows
                fixedHeader
                fixedHeaderScrollHeight="700px"
                onSort={handleSort}
                onSelectedRowsChange={handleSelectRow}
                highlightOnHover
            ></DataTable>
        </div>
    );
}

export default GroupMedTb;
