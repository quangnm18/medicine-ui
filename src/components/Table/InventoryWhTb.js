import DataTable from 'react-data-table-component';
import WarehouseExpander from '../ExpandRow/warehouse';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function InventoryWhTb({ data, method }) {
    console.log(data);
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };

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
            col: 24,
            selector: (row) => <div>{row.ten}</div>,
            sortable: true,
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
            col: 10,
            selector: (row) => <div>{row.so_luong_con ? row.so_luong_con : 0}</div>,
            width: '140px',
            sortable: true,
        },
        {
            name: 'ĐVT',
            selector: (row) => row.dvt,
            width: '80px',
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.dong_goi,
            // width: '200px',
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
            width: '160px',
        },
        {
            name: 'Trạng thái',
            selector: (row) => {
                const currDate = new Date();
                const dueDate = new Date(row.han_dung);
                const count_date =
                    dueDate.getFullYear() * 12 * 30 +
                    (dueDate.getMonth() + 1) * 30 +
                    dueDate.getDate() -
                    currDate.getFullYear() * 12 * 30 -
                    (currDate.getMonth() + 1) * 30 -
                    currDate.getDate();

                if (count_date > 2 && count_date < 20) {
                    return (
                        <div>
                            <button className={cx('btn-status', 'btn-near')}>Sắp hết hạn</button>
                        </div>
                    );
                }

                if (count_date <= 2) {
                    return (
                        <div>
                            <button className={cx('btn-due', 'btn-status')}>Đã hết hạn</button>
                        </div>
                    );
                } else {
                    return (
                        <div>
                            <button className={cx('btn-status', 'btn-okay')}>Sẵn sàng</button>
                        </div>
                    );
                }
            },
            width: '136px',
            sortable: true,
            col: 17,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
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
                onSort={handleSort}
                responsive
            ></DataTable>
        </div>
    );
}

export default InventoryWhTb;
