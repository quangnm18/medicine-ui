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
            name: 'STT',
            cell: (row, index) => index + 1,
        },
        {
            name: 'Mã nhân viên',
            selector: (row) => row.name,
        },
        {
            name: 'Họ tên',
            selector: (row) => row.unit,
        },
        {
            name: 'Số điện thoại',
            selector: (row) => row.dueDate,
        },
        {
            name: 'Email',
            selector: (row) => row.count,
        },
        {
            name: 'Chức vụ',
            selector: (row) => row.count,
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
