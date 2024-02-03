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
            width: '70px',
        },
        {
            name: 'Đơn vị lớn',
            selector: (row) => row.donvi_lon,
            center: true,
        },
        {
            name: 'Đơn vị trung bình',
            selector: (row) => row.donvi_tb,
            center: true,
        },
        {
            name: 'Đơn vị nhỏ nhất',
            selector: (row) => row.donvi_nho,
            center: true,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.description_unit,
            center: true,
        },
        {
            name: 'Mã đơn vị',
            selector: (row) => row.unit_code,
            center: true,
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
            <DataTable columns={columns} data={data} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default UnitMedDelTb;
