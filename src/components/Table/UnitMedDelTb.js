import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function UnitMedDelTb({ data, method, role }) {
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

    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

    const columns = [
        {
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '70px',
        },
        {
            name: 'Đơn vị lớn',
            selector: (row) => <div>{row.donvi_lon}</div>,
            center: true,
            sortable: true,
            col: 1,
        },
        {
            name: 'Đơn vị trung bình',
            selector: (row) => row.donvi_tb,
            center: true,
        },
        {
            name: 'Đơn vị nhỏ nhất',
            selector: (row) => <div>{row.donvi_nho}</div>,
            center: true,
            sortable: true,
            col: 2,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.description_unit,
            center: true,
        },
        {
            name: 'Mã đơn vị',
            selector: (row) => <div>{row.unit_code}</div>,
            center: true,
            sortable: true,
            col: 3,
        },
        {
            name: 'Nguời xóa',
            selector: (row) => row.Name,
            center: true,
        },
        {
            name: 'Thời gian xóa',
            selector: (row) => new Date(row.deletedAt).toLocaleString(),
            center: true,
            width: '300px',
        },

        {
            name: '',
            cell: (row) => (
                <div>
                    {(role === 'ADM' || role === 'ADMA') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.id)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                    {(role === 'ADM' || role === 'ADMA') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                            <FontAwesomeIcon icon={faRotateLeft} className={cx('icon-eye')} />
                        </button>
                    )}
                </div>
            ),
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

export default UnitMedDelTb;
