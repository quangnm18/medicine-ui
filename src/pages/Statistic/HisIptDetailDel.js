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
import { useNavigate } from 'react-router-dom';
import HisIptDetailTbDel from '~/components/Table/HisIptDetailTbDel';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function HisIptDetailDel() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');
    const [valuesSearch, setValuesSearch] = useState('');

    const [idSelected, setIdSelected] = useState('');
    const [showModalView, setShowModalView] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHardDel] = useState(false);

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

    const onchangeDateStart = (e) => {
        setDateStart(e.target.value);
    };
    const onchangeDateEnd = (e) => {
        setDateEnd(e.target.value);
    };

    const onchangeSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
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

    const handleRes = (id) => {
        axios
            .put(`http://localhost:8081/importlist/detail/restore/${id}`)
            .then((res) => {
                setShowModalRes(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleHardDel = (id) => {
        axios
            .delete(`http://localhost:8081/importlist/detail/harddelete/${id}`)
            .then((res) => {
                setShowModalHardDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/importlist/detail/', {
                params: {
                    isImported: 1,
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
    };

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        loadData();
    }, [startRecord]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Thống kê nhập kho đã xóa</DirectionHeader>
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
                            <button className={cx('btn-add')} onClick={() => routeChange('/warehouse/importcreate')}>
                                Nhập tồn
                            </button>
                            <button className={cx('btn-add')} onClick={() => routeChange('/statistic/historyImport')}>
                                Trở lại
                            </button>
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

            {showModalHardDel && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn ?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleHardDel}
                    data={idSelected}
                />
            )}

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
                    methodToggle={toggleModalRes}
                    methodHandle={handleRes}
                    data={idSelected}
                />
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
                <div className={cx('content-table')}>
                    <HisIptDetailTbDel data={dataTb} method={{ toggleModalRes, toggleModalHardDel, toggleModalView }} />
                </div>

                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default HisIptDetailDel;
