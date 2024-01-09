import { faEye, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function ImportCpListTb({ data, method }) {
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
            name: 'Số hóa đơn',
            selector: (row) => row.invoice_code,
            width: '140px',
        },
        {
            name: 'Ngày lập',
            selector: (row) => {
                let date = new Date(row.createdDate);
                return date.toLocaleDateString();
            },
            width: '180px',
        },
        {
            name: 'Giá trị nhập',
            selector: (row) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });

                return VND.format(row.giatri_nhap);
            },
            width: '160px',
        },
        {
            name: 'Thành tiền',
            selector: (row) => {
                const VND = new Intl.NumberFormat('vi-VN', {
                    style: 'currency',
                    currency: 'VND',
                });

                return VND.format(row.thanh_tien);
            },
            width: '160px',
        },
        {
            name: 'Nhân viên',
            selector: (row) => row.Name,
        },
        {
            name: 'Nhà cung cấp',
            selector: (row) => row.ten_ncc,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalSoftDel(row.id)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faEye} className={cx('icon-view', 'icon-eye')} />
                    </button>
                </div>
            ),
        },
        {
            name: 'Trạng thái',
            cell: (row) => (
                <div>
                    {row.status === 2 && <button className={cx('btn-status')}>Đang chờ</button>}
                    {row.status === 0 && <button className={cx('btn-status', 'btn-reject')}>Từ chối</button>}
                    {row.status === 1 && <button className={cx('btn-status', 'btn-okay')}>Đã duyệt</button>}
                    {row.status === 2 && (
                        <button className={cx('btn-status')} onClick={() => method.toggleModalAccept(row.invoice_code)}>
                            Phê duyệt
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

export default ImportCpListTb;
