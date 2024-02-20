import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InventoryWh.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

import axios from 'axios';
import InventoryWhTb from '~/components/Table/InventoryWhTb';
import Modal from '~/components/Modal';
import Pagination from '~/components/Pagination/Pagination';
import { formatDate } from '~/utils/format';

const cx = classNames.bind(style);

function InventoryWh() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const [dataBranch, setDataBranch] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);
    const [selectBranch, setSelectBranch] = useState(undefined);
    const [selectGrMed, setSelectGrMed] = useState();
    const [sort, setSort] = useState({ sort_col: 24, sort_type: 'asc' });

    // const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [numRecord, setNumRecord] = useState(10);

    const [showModalView, setShowModalView] = useState(false);
    const [idSelected, setIdSelected] = useState();

    const [valuesSearch, setValuesSearch] = useState('');

    const [dataWh, setDataWh] = useState([]);
    const [dataExport, setDataExport] = useState([]);

    axios.defaults.withCredentials = true;

    const VND = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const toggleModalView = (id) => {
        setIdSelected(id);
        setShowModalView(!showModalView);
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onchangeBranch = (e) => {
        setSelectBranch(e.target.value);
    };

    const onchangeGrMed = (e) => {
        setSelectGrMed(e.target.value);
    };

    const onChangerNum = (e) => {
        setNumRecord(e.target.value);
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

    const handleExportData = (e, done) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;

        axios
            .get(`${baseUrl}warehouse/exportall`, {
                params: {
                    group_id: selectGrMed,
                    branch_id: user.id_chi_nhanh ? user.id_chi_nhanh : selectBranch,
                    search_value: valuesSearch,
                },
            })
            .then((res) => {
                let result = [];
                let arr1 = res.data[0].map((item) => {
                    return { ...item, so_luong_con: item.sl_tong - item.so_luong_ban - item.so_luong_xuat };
                });

                if (arr1 && arr1.length > 0) {
                    arr1.map((item, index) => {
                        let obj = {
                            STT: index + 1,
                            'Tên thuốc': item.ten,
                            'SL(ĐVLN)': (item.so_luong_con - (item.so_luong_con % item.soluong_nho)) / item.soluong_nho,
                            'SL(ĐVTB)':
                                (item.so_luong_con * item.soluong_tb -
                                    ((item.so_luong_con * item.soluong_tb) % item.soluong_nho)) /
                                item.soluong_nho,
                            'SL(ĐVNN)': item.so_luong_con,
                            ĐVT: item.dvt,
                            'Đóng gói': item.dong_goi,
                            'Số lô': item.so_lo,
                            'Hạn dùng': formatDate(item.han_dung),
                        };
                        result.push(obj);
                    });

                    setDataExport(result);
                }
                done();
            })
            .catch((e) => console.log(e));
    };

    const convertDate = (data) => {
        let date = new Date(data);
        return date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear();
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}warehouse`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    group_id: selectGrMed,
                    branch_id: user.id_chi_nhanh ? user.id_chi_nhanh : selectBranch,
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
                    return { ...item, so_luong_con: item.sl_tong - item.so_luong_ban - item.so_luong_xuat };
                });
                setDataWh(arr1);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord, selectBranch, selectGrMed, sort, numRecord]);

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
                <DirectionHeader>Kho dược</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <div className={cx('header-action')}>
                        <div className={cx('wrap-searchBot')}>
                            <div>
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
                        <div className={cx('header-right')}>
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
                            <CSVLink
                                data={dataExport}
                                asyncOnClick={true}
                                onClick={handleExportData}
                                className={cx('btn-export')}
                            >
                                <span>Xuất excel</span>
                            </CSVLink>
                            {/* <button className={cx('btn-addstaff')}>Xuất excel</button> */}
                        </div>
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
                                value={
                                    typeof idSelected === 'object' &&
                                    VND.format(idSelected.gianhap_chuaqd * idSelected.soluong_lon)
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
                    <InventoryWhTb data={dataWh} method={{ toggleModalView, setSort }} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <select value={numRecord} onChange={onChangerNum}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                    </select>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default InventoryWh;
