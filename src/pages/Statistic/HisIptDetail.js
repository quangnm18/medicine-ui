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
import Pagination from '~/components/Pagination/Pagination';
import FormatInput from '~/components/format/FormatInput';

const cx = classNames.bind(style);

function HisIptDetail() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);
    const [dataBranch, setDataBranch] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);

    const [dateStart, setDateStart] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [valuesSearch, setValuesSearch] = useState('');
    const [selectBranch, setSelectBranch] = useState(undefined);
    const [selectGrMed, setSelectGrMed] = useState();

    const [infoNum, setInfoNum] = useState({ han_dung: '', so_lo: '' });
    const [giaban, setGiaBan] = useState();

    const [idSelected, setIdSelected] = useState('');
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    axios.defaults.withCredentials = true;

    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const formatDate = (data) => {
        const date = new Date(data);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        const dateFormat = year + '-' + month + '-' + day;
        return dateFormat;
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
        setInfoNum({ han_dung: formatDate(data.han_dung), so_lo: data.so_lo });
        setGiaBan(data.giaban_daqd);
    };

    const onchangeDateStart = (e) => {
        setDateStart(e.target.value);
    };
    const onchangeDateTo = (e) => {
        setDateTo(e.target.value);
    };

    const onchangeSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const changeInfo = (e) => {
        setInfoNum({ ...infoNum, [e.target.name]: e.target.value });
    };

    const onchangePrice = (value, name) => {
        setGiaBan(value);
    };

    const onchangeBranch = (e) => {
        setSelectBranch(e.target.value);
    };

    const onchangeGrMed = (e) => {
        setSelectGrMed(e.target.value);
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

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    //method handle
    const handleSoftDel = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}importlist/detail/softdelete/${idSelected}`)
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}importlist/detail/update`, { ...infoNum, id: idSelected.id, giaban: giaban })
            .then((res) => {
                setShowModalView(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}importlist/detail/`, {
                params: {
                    group_id: selectGrMed,
                    branch_id: user.id_chi_nhanh ? user.id_chi_nhanh : selectBranch,
                    date_start: dateStart,
                    date_to: dateTo,
                    search_value: valuesSearch,
                    isImported: 1,
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

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch`)
            .then((res) => {
                if (res.data === 'fail') {
                    setDataBranch([]);
                } else setDataBranch(res.data);
            })
            .catch((e) => console.log(e));

        axios
            .get(`${baseUrl}category/medicine/group`)
            .then((res) => {
                setDataGrMed(res.data);
            })
            .catch((e) => console.log(e));
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
                            <input type="date" onChange={onchangeDateTo} />
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
                                onClick={() => routeChange('/statistic/historyImport/deleted')}
                            >
                                Đã xóa
                            </button>
                        </div>
                    </div>

                    <div className={cx('wrap-searchBot')}>
                        <div>
                            <div className={cx('medicine-option', 'search-statistic')}>
                                <input
                                    placeholder="Tìm kiếm theo tên, mã hóa đơn..."
                                    value={valuesSearch}
                                    onChange={onchangeSearch}
                                    onKeyUp={handleKeyPress}
                                />
                            </div>
                            {user.role === 'ADMA' && (
                                <div className={cx('medicine-option', 'search-statistic')}>
                                    <select value={selectBranch} onChange={onchangeBranch}>
                                        <option value={0}>--Chọn cơ sở--</option>
                                        {dataBranch.map((branch) => (
                                            <option key={branch.id} value={branch.id}>
                                                {branch.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            )}
                        </div>
                        <div>
                            <div className={cx('medicine-option', 'search-statistic', 'wrap-select')}>
                                <select value={selectGrMed} onChange={onchangeGrMed}>
                                    <option value={0}>--Chọn nhóm thuốc--</option>
                                    {dataGrMed.map((gr) => (
                                        <option key={gr.id} value={gr.id}>
                                            {gr.ten_nhom_thuoc}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
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
                            <label>Giá trị quy đổi(ĐVTB):</label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.soluong_lon} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Giá trị quy đổi(ĐVNN):</label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.soluong_lon} />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lượng tổng (ĐVNN): </label>
                            <input disabled value={typeof idSelected === 'object' && idSelected.sl_tong} />
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
                            <label>Giá nhập đã quy đổi:</label>
                            <input
                                disabled
                                value={typeof idSelected === 'object' && VND.format(idSelected.gianhap_daqd)}
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Giá bán tạm: </label>
                            <FormatInput name={'gia_ban_tam'} value={giaban} methodOnchange={onchangePrice} />
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
                            <input
                                className={cx('infoNum-input')}
                                name="han_dung"
                                value={infoNum.han_dung}
                                onChange={changeInfo}
                                type="date"
                            />
                        </div>
                        <div className={cx('view-detail')}>
                            <label>Số lô: </label>
                            <input
                                className={cx('infoNum-input')}
                                name="so_lo"
                                value={infoNum.so_lo}
                                onChange={changeInfo}
                            />
                        </div>

                        <div className={cx('view-detailbtn')}>
                            <button className={cx('btn-add', 'btn-close')} onClick={handleUpdate}>
                                Cập nhật
                            </button>
                            <button className={cx('btn-add', 'btn-close')} onClick={toggleModalView}>
                                Đóng
                            </button>
                        </div>
                    </div>
                </Modal>
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <HisIptDetailTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default HisIptDetail;
