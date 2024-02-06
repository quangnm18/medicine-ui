import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InvoiceList.module.scss';
import InvoiceListTb from '~/components/Table/InvoiceListTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalViewSaleDetail from '~/components/ModalPage/ModalSaleDetail';
import Pagination from '~/components/Pagination/Pagination';
import InvoiceListTbDel from '~/components/Table/InvoiceListTbDel';

const cx = classNames.bind(style);

function InvoiceListDel() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHardDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');

    const [dataTb, setDataTb] = useState([]);

    const [idSelected, setIdSelected] = useState();

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
    };

    const toggleModalRes = (id) => {
        setShowModalRes(!showModalRes);
        setIdSelected(id);
    };

    const toggleModalHardDel = (id) => {
        setShowModalHardDel(!showModalHardDel);
        setIdSelected(id);
    };

    const handleChooseDateStart = (e) => {
        console.log(e.target.value);
        setDateStart(e.target.value);
    };

    const handleChooseDateEnd = (e) => {
        setDateTo(e.target.value);
    };

    const handleSearch = () => {
        // if (dateStart !== '' && dateTo !== '') {
        //     let filtered = listIvSale.filter((invoice) => {
        //         let invoiceDate = invoice.CreateDate;
        //         return invoiceDate >= dateStart && invoiceDate <= dateTo;
        //     });
        //     setDataTb(filtered);
        // }
        // if (dateStart !== '' && dateTo === '') {
        //     let filtered = listIvSale.filter((invoice) => {
        //         let invoiceDate = invoice.CreateDate;
        //         return invoiceDate >= dateStart;
        //     });
        //     setDataTb(filtered);
        // }
        // if (dateStart === '' && dateTo !== '') {
        //     let filtered = listIvSale.filter((invoice) => {
        //         let invoiceDate = invoice.CreateDate;
        //         return invoiceDate <= dateTo;
        //     });
        //     setDataTb(filtered);
        // }
        // if (dateStart === '' && dateTo === '') {
        //     setDataTb(listIvSale);
        // }
    };

    //method handle
    const handleRes = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}sell/ivlist/restore/${id}`)
            .then((res) => {
                setShowModalRes(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleHardDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${baseUrl}sell/ivlist/harddelete/${id}`)
            .then((res) => {
                setShowModalHardDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const loadData = useCallback(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}sell/ivlist/`, {
                params: {
                    isDeleted: 1,
                    numRecord: numRecord,
                    startRecord: startRecord,
                    totalRecord: 0,
                },
            })
            .then((res) => {
                setDataTb(res.data[0]);
                const totalRecord = res.data[1][0].totalRecord;
                setPageCount(Math.ceil(totalRecord / numRecord));
            })
            .catch((err) => console.log(err));
    }, [startRecord]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const navigate = useNavigate();
    const routeChange = (path) => {
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
                        <button className={cx('btn-add')} onClick={() => routeChange('/sell/create')}>
                            Lập hóa đơn
                        </button>
                        <button className={cx('btn-add')} onClick={() => routeChange('/sell/list')}>
                            Trở về
                        </button>
                    </div>
                </div>
            </div>

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
                    methodToggle={toggleModalRes}
                    methodHandle={handleRes}
                    data={idSelected}
                />
            )}

            {showModalHardDel && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleHardDel}
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
                <div className={cx('content-table')}>
                    <InvoiceListTbDel data={dataTb} method={{ toggleModalRes, toggleModalView, toggleModalHardDel }} />
                </div>

                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default InvoiceListDel;
