import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InvoiceList.module.scss';
import InvoiceListTb from '~/components/Table/InvoiceListTb';
import ModalDelete from '~/components/ModalPage/ModalSingleDelete';

const cx = classNames.bind(style);

function InvoiceList() {
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [updatedList, setUpdatedList] = useState();

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [listInvoice, setListInvoice] = useState([]);
    const [renderInvoices, setRenderInvoices] = useState([]);

    const [idSelected, setIdSelected] = useState();

    const toggleModalDelete = (id) => {
        setShowModalDelete(!showModalDelete);
        setIdSelected(id);
    };

    const toggleModalView = (id) => {
        setShowModalView(!showModalView);
    };

    const handleChooseDateStart = (e) => {
        console.log(e.target.value);
        setDateStart(e.target.value);
    };

    const handleChooseDateEnd = (e) => {
        setDateTo(e.target.value);
    };

    const handleSearch = () => {
        if (dateStart !== '' && dateTo !== '') {
            let filtered = listInvoice.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate >= dateStart && invoiceDate <= dateTo;
            });
            setRenderInvoices(filtered);
        }

        if (dateStart !== '' && dateTo === '') {
            let filtered = listInvoice.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate >= dateStart;
            });
            setRenderInvoices(filtered);
        }

        if (dateStart === '' && dateTo !== '') {
            let filtered = listInvoice.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate <= dateTo;
            });
            setRenderInvoices(filtered);
        }

        if (dateStart === '' && dateTo === '') {
            setRenderInvoices(listInvoice);
        }
    };

    // useEffect(() => {
    //     axios.get(`http://localhost:8081/sell/list`).then((res) => {
    //         setListInvoice(res.data);
    //         setRenderInvoices(res.data);
    //     });
    // }, [updatedList]);

    const deleteInvoice = (id) => {
        // axios
        //     .delete(`http://localhost:8081/sell/list/delete/${id}`)
        //     .then((res) => {
        //         setShowModalDelete(false);
        //         setUpdatedList(Math.random());
        //     })
        //     .catch((e) => console.log(e));
    };

    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/sell/create`;
        navigate(path);
    };

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Bán hàng</DirectionHeader>
                <h4 className={cx('header-title')}>Danh sách hóa đơn</h4>
                <div className={cx('choose-medicine')}>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Từ ngày</label>
                        <input
                            type="date"
                            className={cx('input-name')}
                            value={dateStart}
                            onChange={handleChooseDateStart}
                        />
                    </div>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Đến ngày</label>
                        <input type="date" className={cx('input-name')} value={dateTo} onChange={handleChooseDateEnd} />
                    </div>
                    <button className={cx('btn-search')} onClick={handleSearch}>
                        <FontAwesomeIcon icon={faSearch} />
                    </button>
                    <div className={cx('btn-action')}>
                        <button className={cx('btn-add')} onClick={routeChange}>
                            Lập hóa đơn
                        </button>
                        <button className={cx('btn-add')}>Xuất excel</button>
                    </div>
                </div>
            </div>
            {showModalDelete && <ModalDelete method={{ toggleModalDelete, deleteInvoice }} idSelected={idSelected} />}
            <div className={cx('main-content')}>
                <InvoiceListTb data={renderInvoices} method={{ toggleModalDelete, toggleModalView }} />
            </div>
        </div>
    );
}

export default InvoiceList;
