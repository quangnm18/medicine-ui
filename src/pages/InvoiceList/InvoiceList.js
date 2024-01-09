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
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalViewSaleDetail from '~/components/ModalPage/ModalSaleDetail';

const cx = classNames.bind(style);

function InvoiceList() {
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [listIvSale, setListIvSale] = useState([]);
    const [dataTb, setDataTb] = useState([]);

    const [idSelected, setIdSelected] = useState();

    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
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
            let filtered = listIvSale.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate >= dateStart && invoiceDate <= dateTo;
            });
            setDataTb(filtered);
        }

        if (dateStart !== '' && dateTo === '') {
            let filtered = listIvSale.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate >= dateStart;
            });
            setDataTb(filtered);
        }

        if (dateStart === '' && dateTo !== '') {
            let filtered = listIvSale.filter((invoice) => {
                let invoiceDate = invoice.CreateDate;
                return invoiceDate <= dateTo;
            });
            setDataTb(filtered);
        }

        if (dateStart === '' && dateTo === '') {
            setDataTb(listIvSale);
        }
    };

    //method handle
    const handleSoftDel = (id) => {
        axios
            .put(`http://localhost:8081/sell/ivlist/softdelete/${id}`)
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/sell/ivlist')
            .then((res) => {
                setDataTb(res.data);
                setListIvSale(res.data);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
    }, []);

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
            {showModalSoftDel && (
                <ModalAll
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSoftDel}
                    methodHandle={handleSoftDel}
                    data={idSelected}
                />
            )}

            {showModalView && (
                <ModalViewSaleDetail
                    label={'Thông tin chi tiết hóa đơn'}
                    data={idSelected}
                    methodToggle={toggleModalView}
                />
            )}
            <div className={cx('main-content')}>
                <InvoiceListTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
            </div>
        </div>
    );
}

export default InvoiceList;
