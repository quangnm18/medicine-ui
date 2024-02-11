import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Statistic.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ModalAll from '~/components/ModalPage/ModalAll';
import Modal from '~/components/Modal';
import HisSaleDetailTb from '~/components/Table/HisSaleDetailTb';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function HisSaleDetail() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);
    const [dataBranch, setDataBranch] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);
    const [sort, setSort] = useState({ sort_col: 16, sort_type: 'desc' });

    const [dateStart, setDateStart] = useState(null);
    const [dateTo, setDateTo] = useState(null);
    const [valuesSearch, setValuesSearch] = useState('');
    const [selectBranch, setSelectBranch] = useState(undefined);
    const [selectGrMed, setSelectGrMed] = useState();

    const [idSelected, setIdSelected] = useState('');
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    axios.defaults.withCredentials = true;

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
    const onchangeDateTo = (e) => {
        setDateTo(e.target.value);
    };

    const onchangeSearch = (e) => {
        setValuesSearch(e.target.value);
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

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}sell/ivdetail/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    group_id: selectGrMed,
                    branch_id: user.id_chi_nhanh ? user.id_chi_nhanh : selectBranch,
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
    }, [startRecord, selectBranch, selectGrMed, sort]);

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
                            <button className={cx('btn-add')} onClick={() => routeChange('/sell/create')}>
                                Lập hóa đơn
                            </button>
                            <button
                                className={cx('btn-add')}
                                onClick={() => routeChange('/statistic/historySale/deleted')}
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
                    <HisSaleDetailTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView, setSort }} />
                </div>
                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default HisSaleDetail;
