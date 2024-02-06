import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function BranchListTb({ data, method }) {
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
            width: '80px',
        },
        {
            name: 'Tên chi nhánh',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: 'Địa chỉ',
            selector: (row) => row.address,
            width: '300px',
        },
        {
            name: 'Mã chi nhánh',
            selector: (row) => row.branch_code,
            sortable: true,
            width: '150px',
        },
        {
            name: 'Người đại diện',
            selector: (row) => row.ten_quan_ly,
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
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default BranchListTb;
