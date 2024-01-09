import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const cx = classNames.bind(style);

function ModalViewSaleDetail({ label, data, methodToggle, methodHandle }) {
    console.log(data);
    const date = new Date(data.createdDate);

    const [dataDetails, setDataDetails] = useState([]);

    const tableStyle = {
        rows: {
            style: {
                fontSize: '16px',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
                fontWeight: '400',
            },
        },
    };

    const columns = [
        {
            name: '',
            cell: (row, index) => index + 1,
            width: '60px',
        },
        {
            name: 'Tên thuốc',
            selector: (row) => row.ten_duoc,
            sortable: true,
            width: '260px',
        },
        {
            name: 'Số lượng bán',
            selector: (row) => row.so_luong_ban,
            width: '152px',
            center: true,
        },
        {
            name: 'Đơn vị tính',
            selector: (row) => row.don_vi_ban,
            width: '152px',
            center: true,
        },
        {
            name: 'Đơn giá',
            selector: (row) => Intl.NumberFormat().format(row.don_gia_ban),
            sortable: true,
            width: '150px',
            center: true,
        },
        {
            name: 'Thành tiền',
            selector: (row) => Intl.NumberFormat().format(row.thanh_tien),
            width: '152px',
            center: true,
        },
        {
            name: 'Thời gian',
            selector: (row) => date.toLocaleDateString(row.createdDate),
            sortable: true,
            width: '200px',
            center: true,
        },
    ];

    useEffect(() => {
        axios
            .get(`http://localhost:8081/sell/ivdetailcurr/?q=${data.ma_hoa_don}`)
            .then((res) => setDataDetails(res.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>{label}</div>
                <div className={cx('modal-form', 'modal-formDetail')}>
                    <div className={cx('modal-if')}></div>
                    <div>Mã hóa đơn : {data.ma_hoa_don}</div>
                    <div>Nhân viên : {data.Name}</div>
                    <div>Ngày tạo : {date.toLocaleDateString()}</div>
                    <div>Tổng giá trị : {Intl.NumberFormat().format(data.tong_tien_hang)}</div>
                    <div>Tổng CK : {Intl.NumberFormat().format(data.tong_ck)}</div>
                    <div>Thành tiền : {Intl.NumberFormat().format(data.tong_phai_tra)}</div>
                    <div>Khách trả : {Intl.NumberFormat().format(data.khach_tra)}</div>
                    <div>Tiền dư : {Intl.NumberFormat().format(data.tien_du)}</div>
                </div>
                <div className={cx('table-details')}>
                    <DataTable data={dataDetails} columns={columns} customStyles={tableStyle} />
                </div>

                <div className={cx('modal-actionAll')}>
                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalViewSaleDetail;
