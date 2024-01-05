import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function UnitMedDelTb({ data, method }) {
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
            name: 'Đơn vị lớn',
            selector: (row) => row.donvi_lon,
            width: '220px',
            center: true,
        },
        {
            name: 'Đơn vị trung bình',
            selector: (row) => row.donvi_tb,
            width: '220px',
            center: true,
        },
        {
            name: 'Đơn vị nhỏ nhất',
            selector: (row) => row.donvi_nho,
            width: '220px',
            center: true,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.description_unit,
            width: '280px',
            center: true,
        },
        {
            name: 'Mã đơn vị',
            selector: (row) => row.unit_code,
            width: '200px',
            center: true,
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
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data} customStyles={tableStyle} pagination selectableRows></DataTable>
        </div>
    );
}

export default UnitMedDelTb;
