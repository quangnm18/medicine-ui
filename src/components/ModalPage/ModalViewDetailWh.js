import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(style);

function ModalViewDetailWh({ label, data, methodToggle, methodHandle }) {
    console.log(data);
    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
    const date = new Date();

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
            name: 'Hạn dùng',
            selector: (row) => row.han_dung,
            width: '152px',
            center: true,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn-deleteDetail')}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-remove')} />
                    </button>
                </div>
            ),
        },
    ];

    useEffect(() => {
        axios
            .get(`http://localhost:8081/importlist/alldetailid/${data}`)
            .then((res) => setDataDetails(res.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>{label}</div>

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

export default ModalViewDetailWh;
