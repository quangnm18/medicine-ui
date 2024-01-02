import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function IptDetailTb({ data, method }) {
    const tableStyle = {
        table: {
            style: {
                width: '1457px',
            },
        },
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
            name: 'Tên',
            selector: (row) => row.ten,
        },
        {
            name: 'Số lượng',
            selector: (row) => row.count_max,
            sortable: true,
        },
        {
            name: 'Quy đổi 2',
            selector: (row) => row.count_medium,
        },
        {
            name: 'Quy đổi 1',
            selector: (row) => row.count_min,
        },
        {
            name: 'SL',
            selector: (row) => row.sl_tong,
        },
        {
            name: 'ĐVT',
            selector: (row) => row.dvt,
        },
        {
            name: 'Giá nhập chưa Q.đổi',
            selector: (row) => row.gianhap_chuaqd,
        },
        {
            name: 'Giá nhập đã Q.đổi',
            selector: (row) => row.gianhap_daqd,
        },
        {
            name: 'Giá bán đã Q.đổi',
            selector: (row) => row.giaban_daqd,
        },
        {
            name: 'Thành tiền',
            selector: (row) => row.thanh_tien,
        },
        {
            name: 'CK',
            selector: (row) => row.ck,
        },
        {
            name: 'VAT',
            selector: (row) => row.vat,
        },
        {
            name: 'Hạn dùng',
            selector: (row) => row.han_dung,
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
        },
        {
            name: '',
            cell: (row) => (
                <div className={cx('action-item')}>
                    <button className={cx('btn')} onClick={() => method(row.ten)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
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
                fixedHeader={true}
                pagination
            ></DataTable>
        </div>
    );
}

export default IptDetailTb;
