import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function ReportTb({ data }) {
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
            selector: (row) => row.id,
        },
        {
            name: 'Mã báo cáo',
            selector: (row) => row.name,
        },
        {
            name: 'Người tạo',
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
            name: 'Ngày tạo',
            selector: (row) => row.count,
        },
        {
            name: 'Trạng thái',
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
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default ReportTb;
