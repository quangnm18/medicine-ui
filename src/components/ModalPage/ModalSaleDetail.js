import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const cx = classNames.bind(style);

function ModalViewSaleDetail({ label, data, methodToggle, methodHandle }) {
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
            // width: '260px',
        },
        {
            name: 'Số lô',
            selector: (row) => row.so_lo,
            sortable: true,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.loai_dong_goi,
            sortable: true,
            // width: '200px',
        },
        {
            name: 'Số lượng',
            selector: (row) => row.so_luong_ban,
            width: '100px',
            center: true,
        },
        {
            name: 'ĐVT',
            selector: (row) => row.don_vi_ban,
            width: '100px',
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
    ];

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}sell/ivdetailcurr/?q=${data.ma_hoa_don}`)
            .then((res) => {
                // let arr = res.data.filter((item) => item.isDeleted === 0);
                setDataDetails(res.data);
            })
            .catch((e) => console.log(e));
    }, []);
    console.log(dataDetails);

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-header')}>
                    <div className={cx('modal-title')}>{label}</div>
                    <button className={cx('btn-x')} onClick={methodToggle}>
                        X
                    </button>
                </div>
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
            </div>
        </Modal>
    );
}

export default ModalViewSaleDetail;
