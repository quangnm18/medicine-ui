import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function StaffTb({ data, method, user }) {
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
            name: 'Mã nhân viên',
            selector: (row) => row.ID,
            width: '130px',
        },
        {
            name: 'Họ tên',
            selector: (row) => <div>{row.Name}</div>,
            sortable: true,
            col: 1,
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
            name: 'Chức vụ',
            selector: (row) => <div>{row.ten_vai_tro}</div>,
            sortable: true,
            col: 2,
        },
        {
            name: 'Chi nhánh',
            selector: (row) => <div>{row.name}</div>,
            width: '130px',
            sortable: true,
            col: 3,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    {(user.role === 'ADM' || user.role === 'ADMA') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.ID)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}

                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                </div>
            ),
            width: '130px',
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

export default StaffTb;
