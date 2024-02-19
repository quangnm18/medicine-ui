import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';

const cx = classNames.bind(style);

function ModalViewIvDetail({ label, data, methodToggle, methodHandle }) {
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const date = new Date(data.createdDate);

    const [dataDetails, setDataDetails] = useState([]);
    console.log(dataDetails);
    const tableStyle = {
        // table: {
        //     style: {
        //         width: '12px',
        //     },
        // },
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
            selector: (row) => row.ten,
            sortable: true,
        },
        {
            name: 'Số lô hàng',
            selector: (row) => row.so_lo,
        },
        {
            name: 'SL',
            selector: (row) => row.count,
            width: '100px',
            center: true,
        },
        {
            name: 'Tổng xuất',
            selector: (row) => row.totalCount,
            sortable: true,
            width: '150px',
            center: true,
        },
        {
            name: 'Đóng gói',
            selector: (row) => row.dong_goi,
            // width: '162px',
            center: true,
        },
        {
            name: 'ĐVT',
            selector: (row) => row.dvt,
            width: '100px',
            center: true,
        },
        {
            name: 'Giá nhập (/ĐVLN)',
            selector: (row) => VND.format(row.importPrice),
            sortable: true,
            width: '200px',
            center: true,
        },

        {
            name: 'Tổng giá trị',
            selector: (row) => VND.format(row.totalImportPrice),
            sortable: true,
            width: '200px',
            center: true,
        },
    ];

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}exportwh/detailcode?q=${data.invoice_code}`)
            .then((res) => setDataDetails(res.data))
            .catch((e) => console.log(e));
    }, []);
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
                    <div>Mã hóa đơn : {data.invoice_code}</div>
                    <div>Nhân viên : {data.Name}</div>
                    <div>Ngày tạo : {date.toLocaleString()}</div>
                    <div>Tổng giá trị : {VND.format(data.totalPrice)}</div>
                </div>
                <div className={cx('table-details')}>
                    <DataTable data={dataDetails} columns={columns} customStyles={tableStyle} />
                </div>
            </div>
        </Modal>
    );
}

export default ModalViewIvDetail;
