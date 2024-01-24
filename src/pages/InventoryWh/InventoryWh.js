import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InventoryWh.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import axios from 'axios';
import InventoryWhTb from '~/components/Table/InventoryWhTb';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function InventoryWh() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [showModalView, setShowModalView] = useState(false);
    const [idSelected, setIdSelected] = useState();

    const [valuesSearch, setValuesSearch] = useState('');

    const [dataWh, setDataWh] = useState([]);

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const toggleModalView = (id) => {
        setIdSelected(id);
        console.log(id);
        setShowModalView(!showModalView);
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const convertDate = (data) => {
        let date = new Date(data);
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/warehouse', {
                params: {
                    search_value: valuesSearch,
                    numRecord: numRecord,
                    startRecord: startRecord,
                    totalRecord: 0,
                },
            })
            .then((res) => {
                const totalRecord = res.data[1][0].totalRecord;
                setPageCount(Math.ceil(totalRecord / numRecord));

                let arr1 = res.data[0].map((item) => {
                    return { ...item, so_luong_con: item.sl_tong - item.so_luong_ban };
                });
                setDataWh(arr1);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Kho dược</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên..."
                                onChange={onChangeInputSearch}
                                onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')}>Xuất excel</button>
                    </div>
                </div>
            </div>
            {showModalView && (
                <Modal>
                    <div className={cx('wrap-modalview')}>
                        <div className={cx('title-modalView')}>Thông tin chi tiết</div>

                        <div className={cx('view-detail')}>
                            <label>Tên dược: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.ten} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lượng nhập(ĐVLN):</label>
                            <input
                                disabled
                                value={
                                    typeof idSelected === 'object' &&
                                    idSelected.soluong_lon + ' ' + idSelected.donvi_lon
                                }
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Quy đổi(ĐVNN):</label>
                            <input
                                disabled
                                value={
                                    typeof idSelected === 'object' && idSelected.sl_tong + ' ' + idSelected.donvi_nho
                                }
                            />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>Đóng gói: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.dong_goi} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Giá nhập đơn: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.gianhap_chuaqd)}
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Tổng giá trị: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.thanh_tien)}
                            />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>CK: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.ck} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>VAT: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.vat} />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>Thành tiền: </label>
                            <input
                                disabled
                                value={
                                    typeof idSelected === 'object' &&
                                    VND.format(
                                        idSelected.thanh_tien +
                                            (idSelected.thanh_tien * idSelected.vat) / 100 -
                                            (idSelected.thanh_tien * idSelected.ck) / 100,
                                    )
                                }
                            />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>Giá nhập đã quy đổi:</label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.gianhap_daqd)}
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Giá bán lẻ: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.giaban_daqd)}
                            />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>Hạn dùng: </label>
                            <input
                                className={cx('infoNum-input')}
                                name="han_dung"
                                value={convertDate(idSelected.han_dung)}
                                disabled
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lô: </label>
                            <input className={cx('infoNum-input')} name="so_lo" value={idSelected.so_lo} disabled />
                        </div>

                        <div className={cx('view-detailbtn')}>
                            <button className={cx('btn-add', 'btn-close')} onClick={toggleModalView}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <InventoryWhTb data={dataWh} method={toggleModalView} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default InventoryWh;
