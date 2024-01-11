import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Statistic.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ModalAll from '~/components/ModalPage/ModalAll';
import Modal from '~/components/Modal';
import HisSaleDetailTb from '~/components/Table/HisSaleDetailTb';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function HisSaleDetail() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

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
        // if (dateStart !== '' && dateEnd !== '' && valuesSearch.length) {
        //     let arr = dataDetailCurr.filter((detail) => {
        //         return detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
        //     });
        //     let filtered = dataDetailCurr.filter((detail) => {
        //         let detailDate = detail.createdDt_at;
        //         return detailDate >= dateStart && detailDate <= dateEnd;
        //     });
        //     let result = new Set(arr.concat(filtered));
        //     setDataTb([...result]);
        //     console.log([...result]);
        //     console.log(123);
        // }
        // if (dateStart !== '' && dateEnd === '') {
        //     let filtered = dataDetailCurr.filter((detail) => {
        //         let detailDate = detail.createdDt_at;
        //         return (
        //             detailDate >= dateStart &&
        //             detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase())
        //         );
        //     });
        //     setDataTb(filtered);
        // }
        // if (dateStart === '' && dateEnd !== '') {
        //     let filtered = dataDetailCurr.filter((detail) => {
        //         let detailDate = detail.createdDt_at;
        //         return (
        //             detailDate <= dateEnd &&
        //             detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase())
        //         );
        //     });
        //     setDataTb(filtered);
        // }
        // if (dateStart === '' && dateEnd === '') {
        //     setDataTb(dataDetailCurr);
        // }
    };

    const handleFilter = () => {
        // if (valuesSearch.length) {
        //     const arr = dataDetailCurr.filter((detail) => {
        //         return detail.ma_hoa_don.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
        //     });
        //     setDataTb(arr);
        // } else {
        //     setDataTb(dataDetailCurr);
        // }
    };

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    //method handle
    // const handleSoftDel = () => {
    //     axios
    //         .put(`http://localhost:8081/importlist/alldetail/imported/softdelete/${idSelected}`)
    //         .then((res) => {
    //             setShowModalSoftDel(false);
    //         })
    //         .catch((e) => console.log(e));
    // };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const loadData = useCallback(() => {
        axios
            .get('http://localhost:8081/sell/ivdetail/', {
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
    }, [startRecord]);

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        loadData();
    }, [loadData]);

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
                            <button
                                className={cx('btn-add', 'btn-list')}
                                onClick={() => routeChange('/statistic/historyImport')}
                            >
                                Danh sách
                            </button>
                            <button className={cx('btn-add')}>Đã xóa</button>
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

            {showModalSoftDel && <ModalAll label={'Bạn có muốn xóa ?'} methodToggle={toggleModalSoftDel} />}
            {showModalView && (
                <Modal>
                    <div className={cx('wrap-modalview')}>
                        <div className={cx('title-modalView')}>Thông tin chi tiết hóa đơn</div>
                        <span>Mã hóa đơn: {typeof idSelected === 'object' && idSelected.ma_hoa_don}</span>

                        <div className={cx('view-detail')}>
                            <label>Tên dược: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.ten_duoc} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lượng bán:</label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.so_luong_ban} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Đơn vị: </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.don_vi_ban} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Đơn giá bán: </label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.don_gia_ban)}
                            />
                        </div>

                        <div className={cx('view-detail')}>
                            <label>Thành tiền</label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.thanh_tien)}
                            />
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
                    <HisSaleDetailTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                </div>
                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default HisSaleDetail;
