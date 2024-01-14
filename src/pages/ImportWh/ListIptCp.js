import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './ImportWh.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import axios from 'axios';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalIvDetail from '~/components/ModalPage/ModalIvDetail';
import Pagination from '~/components/Pagination/Pagination';
import IptCpListTb from '~/components/Table/IptCpListTb';
import ModalAccept from '~/components/ModalPage/ModalAccept';

const cx = classNames.bind(style);

function ListIptCp() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);

    const [dateStart, setDateStart] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [valuesSearch, setValuesSearch] = useState('');

    const [idSelected, setIdSelected] = useState('');

    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAccept, setShowModalAccept] = useState(false);

    //Method Toggle
    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const toggleModalView = (item) => {
        setShowModalView(!showModalView);
        setIdSelected(item);
    };

    const toggleModalAccept = (invoice_code) => {
        setShowModalAccept(!showModalAccept);
        setIdSelected(invoice_code);
    };

    //Method handle

    const handleSoftDel = (id) => {
        axios
            .put(`http://localhost:8081/importlist/softdelete/${id}`)
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleAcceptIv = (data) => {
        axios
            .put('http://localhost:8081/importlist/acceptiv', { ma_hoa_don: data[0].ma_hoa_don })
            .then((res) => {
                setShowModalAccept(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    //Method OnchangeInput

    const onchangeDateStart = (e) => {
        setDateStart(e.target.value);
    };
    const onchangeDateTo = (e) => {
        setDateTo(e.target.value);
    };

    const onchangeSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    };

    //call api
    const loadData = () => {
        axios
            .get('http://localhost:8081/importlist/alllistpaginate/', {
                params: {
                    date_start: dateStart,
                    date_to: dateTo,
                    search_value: valuesSearch,
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

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord]);

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý nhập kho</DirectionHeader>
                <div>
                    <div className={cx('choose-medicine')}>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Từ ngày</label>
                            <input
                                name="date-start"
                                type="date"
                                className={cx('input-name')}
                                onChange={onchangeDateStart}
                                value={dateStart}
                                // onBlur={onchangeDate}
                            />
                        </div>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Đến ngày</label>
                            <input
                                name="date-end"
                                type="date"
                                className={cx('input-name')}
                                onChange={onchangeDateTo}
                                value={dateTo}
                                // onBlur={onchangeDate}
                            />
                        </div>
                        <button className={cx('btn-search')} onClick={handleSearch}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className={cx('btn-action')}>
                            <button className={cx('btn-add')} onClick={() => routeChange('/warehouse/importcreate')}>
                                Nhập tồn
                            </button>
                            <button
                                className={cx('btn-add')}
                                onClick={() => routeChange('/warehouse/importlist/deleted')}
                            >
                                Đã xóa
                            </button>
                        </div>
                    </div>
                    <div className={cx('medicine-option', 'search-statistic')}>
                        <input
                            placeholder="Tìm kiếm theo tên, mã hóa đơn..."
                            value={valuesSearch}
                            onChange={onchangeSearch}
                        />
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
                <ModalIvDetail
                    label={'Thông tin chi tiết hóa đơn nhập'}
                    methodToggle={toggleModalView}
                    data={idSelected}
                />
            )}

            {showModalAccept && (
                <ModalAccept
                    label={'Xác nhận đơn nhập?'}
                    methodToggle={toggleModalAccept}
                    methodHandle={handleAcceptIv}
                    data={idSelected}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <IptCpListTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView, toggleModalAccept }} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default ListIptCp;
