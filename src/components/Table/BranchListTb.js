import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function BranchListTb({ data, method }) {
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
            width: '80px',
        },
        {
            name: 'Tên chi nhánh',
            selector: (row) => <div>{row.name}</div>,
            sortable: true,
            col: 1,
        },
        {
            name: 'Địa chỉ',
            selector: (row) => row.address,
            width: '300px',
        },
        {
            name: 'Mã chi nhánh',
            selector: (row) => <div>{row.branch_code}</div>,
            sortable: true,
            width: '150px',
            col: 2,
        },
        {
            name: 'Người đại diện',
            selector: (row) => <div>{row.ten_quan_ly}</div>,
            sortable: true,
            col: 3,
        },
        {
            name: 'SĐT',
            selector: (row) => row.PhoneNumber,
            width: '130px',
        },
        {
            name: 'Email',
            selector: (row) => row.Email,
        },
        {
            name: '',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.id)}>
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
                highlightOnHover
                onSort={handleSort}
            ></DataTable>
        </div>
    );
}

export default BranchListTb;
