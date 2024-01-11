import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InvoiceList.module.scss';
import InvoiceListTb from '~/components/Table/InvoiceListTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalViewSaleDetail from '~/components/ModalPage/ModalSaleDetail';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function InvoiceList() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');

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
    const handleSoftDel = (id) => {
        axios
            .put(`http://localhost:8081/sell/ivlist/softdelete/${id}`)
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/sell/ivlist/', {
                params: {
                    isDeleted: 0,
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
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord]);

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
                        <button className={cx('btn-add')} onClick={() => routeChange('/sell/list/deleted')}>
                            Đã xóa
                        </button>
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
                <div className={cx('content-table')}>
                    <InvoiceListTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                </div>

                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default InvoiceList;
