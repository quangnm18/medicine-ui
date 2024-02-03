import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function GrMedTbDeleted({ data, method }) {
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
            width: '100px',
        },
        {
            name: 'Tên nhóm thuốc',
            selector: (row) => row.ten_nhom_thuoc,
            sortable: true,
            width: '320px',
        },
        {
            name: 'Mô tả',
            selector: (row) => row.description,
        },
        {
            name: 'Mã nhóm',
            selector: (row) => row.group_code,
            sortable: true,
            width: '120px',
        },
        {
            name: 'Nguời xóa',
            selector: (row) => row.Name,
            sortable: true,
        },
        {
            name: 'Thời gian xóa',
            selector: (row) => new Date(row.deletedAt).toLocaleString(),
            sortable: true,
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
                    <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                        <FontAwesomeIcon icon={faRotateLeft} className={cx('icon-eye')} />
                    </button>
                </div>
            ),
            center: true,
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default GrMedTbDeleted;
