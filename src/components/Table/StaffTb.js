import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';
import { useState } from 'react';

const cx = classNames.bind(style);

function StaffTb({ data }) {
    const [showScroll, setShowScroll] = useState(true);

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
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div onMouseLeave={() => setShowScroll(true)} onMouseEnter={() => setShowScroll(false)}>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                fixedHeader={true}
                fixedHeaderScrollHeight="60vh"
                className={showScroll ? cx('table-staff', 'hideScroll') : cx('table-staff')}
            ></DataTable>
        </div>
    );
}

export default StaffTb;
