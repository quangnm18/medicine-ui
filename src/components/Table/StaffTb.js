import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function StaffTb({ data, method }) {
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
        },
        {
            name: 'Họ tên',
            selector: (row) => row.Name,
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
            selector: (row) => row.ten_vai_tro,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    {JSON.parse(localStorage.getItem('data_user')).role === 'ADM' && (
                        <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.ID)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}

                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
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

export default StaffTb;
