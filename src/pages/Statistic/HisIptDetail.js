import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Statistic.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import HisIptDetailTb from '~/components/Table/HisIptDetailTb';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalAll from '~/components/ModalPage/ModalAll';
import Modal from '~/components/Modal';

const cx = classNames.bind(style);

function HisIptDetail() {
    const [dataDetailCurr, setDataDetailCurr] = useState([]);
    const [dataTb, setDataTb] = useState([]);

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [valuesSearch, setValuesSearch] = useState('');

    const [idSelected, setIdSelected] = useState('');
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
    };

    const onchangeDateStart = (e) => {
        setDateStart(e.target.value);
    };
    const onchangeDateEnd = (e) => {
        setDateEnd(e.target.value);
    };

    const onchangeSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const fillInvoiceDetail = () => {
        if (dateStart !== '' && dateEnd !== '' && valuesSearch.length) {
            let arr = dataDetailCurr.filter((detail) => {
                return detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
            });

            let filtered = dataDetailCurr.filter((detail) => {
                let detailDate = detail.createdDt_at;
                return detailDate >= dateStart && detailDate <= dateEnd;
            });
            let result = new Set(arr.concat(filtered));
            setDataTb([...result]);
            console.log([...result]);
            console.log(123);
        }

        if (dateStart !== '' && dateEnd === '') {
            let filtered = dataDetailCurr.filter((detail) => {
                let detailDate = detail.createdDt_at;
                return (
                    detailDate >= dateStart &&
                    detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase())
                );
            });
            setDataTb(filtered);
        }

        if (dateStart === '' && dateEnd !== '') {
            let filtered = dataDetailCurr.filter((detail) => {
                let detailDate = detail.createdDt_at;
                return (
                    detailDate <= dateEnd &&
                    detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase())
                );
            });
            setDataTb(filtered);
        }

        if (dateStart === '' && dateEnd === '') {
            setDataTb(dataDetailCurr);
        }
    };

    const handleFilter = () => {
        if (valuesSearch.length) {
            const arr = dataDetailCurr.filter((detail) => {
                return detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
            });
            setDataTb(arr);
        } else {
            setDataTb(dataDetailCurr);
        }
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    //method handle
    const handleSoftDel = () => {
        axios
            .put(`http://localhost:8081/importlist/alldetail/imported/softdelete/${idSelected}`)
            .then((res) => {
                setShowModalSoftDel(false);
            })
            .catch((e) => console.log(e));
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/importlist/alldetail/imported')
            .then((res) => {
                setDataDetailCurr(res.data);
                setDataTb(res.data);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Thống kê dược nhập kho</DirectionHeader>
                <div>
                    <div className={cx('choose-medicine')}>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Từ ngày</label>
                            <input type="date" onChange={onchangeDateStart} />
                        </div>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Đến ngày</label>
                            <input type="date" onChange={onchangeDateEnd} />
                        </div>
                        <button className={cx('btn-search')} onClick={fillInvoiceDetail}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className={cx('btn-action')}>
                            <button className={cx('btn-add')}>Nhập tồn</button>
                            <button className={cx('btn-add')}>Xuất excel</button>
                        </div>
                    </div>

                    <div className={cx('medicine-option', 'search-statistic')}>
                        <input
                            placeholder="Tìm kiếm theo mã hóa đơn..."
                            value={valuesSearch}
                            onChange={onchangeSearch}
                        />
                    </div>
                </div>
            </div>

            {showModalSoftDel && (
                <ModalAll label={'Bạn có muốn xóa ?'} methodToggle={toggleModalSoftDel} methodHandle={handleSoftDel} />
            )}
            {showModalView && (
                <Modal>
                    <div className={cx('wrap-modalview')}>
                        <div className={cx('title-modalView')}>Thông tin dược nhập</div>
                        <span>Mã hóa đơn: {typeof idSelected === 'object' && idSelected.ma_hoa_don}</span>

                        <div className={cx('view-detail')}>
                            <label>Tên dược: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.med} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lượng nhập(ĐVL):</label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.soluong_lon} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lượng tổng (ĐVNN): </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.sl_tong} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Giá nhập đơn: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.gianhap_chuaqd)}
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
                            <label>Giá bán tạm: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.giaban_daqd)}
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
                            <label>Hạn dùng: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.han_dung} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lô: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.so_lo} />
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
                <HisIptDetailTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
            </div>
        </div>
    );
}

export default HisIptDetail;
