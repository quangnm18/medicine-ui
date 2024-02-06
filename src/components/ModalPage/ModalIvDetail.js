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
            selector: (row) => row.med,
            sortable: true,
            width: '260px',
        },
        {
            name: 'Số lượng (ĐVLN)',
            selector: (row) => row.soluong_lon,
            width: '152px',
            center: true,
        },
        {
            name: 'Quy đổi (ĐVNN)',
            selector: (row) => row.soluong_nho,
            width: '152px',
            center: true,
        },
        {
            name: 'Tổng nhập',
            selector: (row) => row.sl_tong,
            sortable: true,
            width: '150px',
            center: true,
        },
        {
            name: 'Đơn vị tính (NN)',
            selector: (row) => row.dvt,
            width: '152px',
            center: true,
        },
        {
            name: 'Giá nhập (/ĐVLN)',
            selector: (row) => VND.format(row.gianhap_chuaqd),
            sortable: true,
            width: '200px',
            center: true,
        },

        {
            name: 'Tổng giá trị',
            selector: (row) => VND.format(row.thanh_tien),
            sortable: true,
            width: '200px',
            center: true,
        },
    ];

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}importlist/alldetail/?q=${data.invoice_code}`)
            .then((res) => setDataDetails(res.data))
            .catch((e) => console.log(e));
    }, []);
    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>{label}</div>
                <div className={cx('modal-form', 'modal-formDetail')}>
                    <div className={cx('modal-if')}></div>
                    <div>Mã hóa đơn : {data.invoice_code}</div>
                    <div>Ngày tạo : {date.toLocaleDateString()}</div>
                    <div>Tổng giá trị : {VND.format(data.giatri_nhap)}</div>
                    <div>Tổng VAT : {VND.format(data.tong_vat)}</div>
                    <div>Tổng CK : {VND.format(data.tong_ck)}</div>
                    <div>Thành tiền : {VND.format(data.thanh_tien)}</div>
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

export default ModalViewIvDetail;
