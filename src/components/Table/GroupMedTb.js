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

    const tableStyle = {
        table: {
            style: {
                textAlign: 'center',
            },
        },
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
            name: 'ID',
            cell: (row, index) => index + 1,
            width: '100px',
        },
        {
            name: 'Tên nhóm thuốc',
            selector: (row) => row.ten_nhom_thuoc,
            sortable: true,
            width: '360px',
        },
        {
            name: 'Mô tả',
            selector: (row) => row.description,
            width: '500px',
        },
        {
            name: 'Mã nhóm thuốc',
            selector: (row) => row.group_code,
            sortable: true,
            width: '180px',
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
                // onSort={(e) => console.log(e)}
                onSelectedRowsChange={handleSelectRow}
            ></DataTable>
        </div>
    );
}

export default GroupMedTb;
