import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function GrMedTbDeleted({ data, method }) {
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
            width: '100px',
        },
        {
            name: 'Tên nhóm thuốc',
            selector: (row) => <div>{row.ten_nhom_thuoc}</div>,
            sortable: true,
            width: '320px',
            col: 1,
        },
        {
            name: 'Mô tả',
            selector: (row) => row.description,
        },
        {
            name: 'Mã nhóm',
            selector: (row) => <div>{row.group_code}</div>,
            sortable: true,
            width: '120px',
            col: 2,
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
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                onSort={handleSort}
                highlightOnHover
            ></DataTable>
        </div>
    );
}

export default GrMedTbDeleted;
