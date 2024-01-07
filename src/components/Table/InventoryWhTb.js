import DataTable from 'react-data-table-component';
import WarehouseExpander from '../ExpandRow/warehouse';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InventoryWhTb({ data, method }) {
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
            width: '80px',
        },
        {
            name: 'Tên thuốc',
            selector: (row) => row.ten,
            width: '340px',
        },
        {
            name: 'SL(ĐVLN)',
            selector: (row) => (row.soluong_nho ? row.sl_tong / row.soluong_nho : 0),
            width: '150px',
        },
        {
            name: 'SL(ĐVTB)',
            selector: (row) => (row.soluong_tb ? (row.sl_tong * row.soluong_tb) / row.soluong_nho : 0),
            width: '140px',
        },
        {
            name: 'SL(ĐVNN)',
            selector: (row) => (row.sl_tong ? row.sl_tong : 0),
            width: '140px',
        },
        {
            name: 'Đơn vị tính',
            selector: (row) => row.dvt,
            width: '140px',
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.dong_goi,
            width: '250px',
        },
        {
            name: 'Đã bán',
            selector: (row) => row.Name,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
            width: '100px',
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                pagination
                expandableRows
                expandableRowsComponent={(row) => <WarehouseExpander data={row} />}
            ></DataTable>
        </div>
    );
}

export default InventoryWhTb;
