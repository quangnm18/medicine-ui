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
                minHeight: '60px',
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
            width: '250px',
        },
        {
            name: 'SL(ĐVLN)',
            selector: (row) => {
                if (row.soluong_nho && row.so_luong_con % row.soluong_nho !== 0) {
                    let du = row.so_luong_con % row.soluong_nho;
                    let nguyen = (row.so_luong_con - (row.so_luong_con % row.soluong_nho)) / row.soluong_nho;
                    return nguyen + ' ' + row.donvi_lon + ' - ' + du + ' ' + row.donvi_nho;
                } else return row.soluong_nho ? row.so_luong_con / row.soluong_nho + ' ' + row.donvi_lon : 0;
            },
            width: '180px',
        },
        {
            name: 'SL(ĐVTB)',
            selector: (row) => {
                if (row.soluong_tb && row.so_luong_con % (row.soluong_nho / row.soluong_tb) !== 0) {
                    let du = row.so_luong_con % (row.soluong_nho / row.soluong_tb);
                    let nguyen =
                        (row.so_luong_con * row.soluong_tb - ((row.so_luong_con * row.soluong_tb) % row.soluong_nho)) /
                        row.soluong_nho;

                    return nguyen + ' ' + row.donvi_tb + ' - ' + du + ' ' + row.donvi_nho;
                } else if (row.soluong_tb) {
                    return (row.so_luong_con * row.soluong_tb) / row.soluong_nho + ' ' + row.donvi_tb;
                } else return 0;
            },
            width: '180px',
        },
        {
            name: 'SL(ĐVNN)',
            selector: (row) => (row.so_luong_con ? row.so_luong_con : 0),
            width: '140px',
        },
        {
            name: 'Đơn vị tính',
            selector: (row) => row.dvt,
            width: '120px',
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.dong_goi,
            width: '200px',
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
            width: '160px',
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
            width: '80px',
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                expandableRows
                expandableRowsComponent={(row) => <WarehouseExpander data={row} />}
                highlightOnHover
            ></DataTable>
        </div>
    );
}

export default InventoryWhTb;
