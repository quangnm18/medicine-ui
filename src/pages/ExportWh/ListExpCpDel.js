import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './CreateExpCp.module.scss';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import axios from 'axios';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalIvDetail from '~/components/ModalPage/ModalIvDetail';
import Pagination from '~/components/Pagination/Pagination';
import ModalAccept from '~/components/ModalPage/ModalAccept';
import ExpCpListTbDel from '~/components/Table/ExpCpListTbDel';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function ListExpCpDel() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);
    const [dataBranch, setDataBranch] = useState([]);

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [valuesSearch, setValuesSearch] = useState('');

    const [idSelected, setIdSelected] = useState('');
    const [selectBranch, setSelectBranch] = useState(undefined);

    const [showModalRes, setShowModalRes] = useState(false);
    // const [showModalHardDel, setShowModalHardDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    axios.defaults.withCredentials = true;

    //Method Toggle
    const toggleModalView = (item) => {
        setShowModalView(!showModalView);
        setIdSelected(item);
    };

    const toggleModalRes = (invoice_code) => {
        setShowModalRes(!showModalRes);
        setIdSelected(invoice_code);
    };

    // const toggleModalHardDel = (id) => {
    //     setShowModalHardDel(!showModalHardDel);
    //     setIdSelected(id);
    // };

    const onchangeBranch = (e) => {
        setSelectBranch(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    //Method handle
    const handleRes = (invoice_code) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}exportwh/restoreiv`, { ma_hoa_don: idSelected })
            .then((res) => {
                setShowModalRes(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Khôi phục thành công', 'success');
                }
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
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}exportwh/listexport`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    branch_id: user.id_chi_nhanh ? user.id_chi_nhanh : selectBranch,
                    date_start: dateStart,
                    date_to: dateTo,
                    search_value: valuesSearch,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord, selectBranch, sort]);

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
    }, []);

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    if (user.role === 'ADM' || user.role === 'ADMA') {
        return (
            <div className={cx('content')}>
                <div className={cx('header-content')}>
                    <DirectionHeader>Quản lý xuất kho</DirectionHeader>
                    <div>
                        <div className={cx('choose-medicine')}>
                            <div className={cx('wrap-date')}>
                                <div className={cx('medicine-option')}>
                                    <label className={cx('label-option')}>Từ ngày</label>
                                    <input
                                        name="date-start"
                                        type="date"
                                        className={cx('input-name')}
                                        onChange={onchangeDateStart}
                                        value={dateStart}
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
                                    />
                                </div>
                                <button className={cx('btn-search')} onClick={handleSearch}>
                                    <FontAwesomeIcon icon={faSearch} />
                                </button>
                            </div>
                            <div className={cx('btn-action')}>
                                <button
                                    className={cx('btn-add')}
                                    onClick={() => routeChange('/warehouse/exportcreate')}
                                >
                                    Tạo phiếu
                                </button>
                                {(user.role === 'ADM' || user.role === 'ADMA') && (
                                    <button
                                        className={cx('btn-add')}
                                        onClick={() => routeChange('/warehouse/exportlist')}
                                    >
                                        Trở lại
                                    </button>
                                )}
                            </div>
                        </div>
                        <div className={cx('wrap-searchiptiv')}>
                            <div className={cx('medicine-option', 'search-statistic', 'input-statistic')}>
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
                                        <option value={0}>--Chọn chi nhánh--</option>
                                        {dataBranch.length > 0 &&
                                            dataBranch.map((branch) => (
                                                <option key={branch.id} value={branch.id}>
                                                    {branch.name}
                                                </option>
                                            ))}
                                    </select>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer />

                {showModalRes && (
                    <ModalAll
                        label={'Bạn có muốn xóa?'}
                        methodToggle={toggleModalRes}
                        methodHandle={handleRes}
                        data={idSelected}
                    />
                )}
                {showModalView && (
                    <ModalIvDetail
                        label={'Thông tin chi tiết hóa đơn xuất'}
                        methodToggle={toggleModalView}
                        data={idSelected}
                    />
                )}

                <div className={cx('main-content')}>
                    <div className={cx('content-table')}>
                        <ExpCpListTbDel
                            data={dataTb}
                            method={{
                                toggleModalRes,
                                toggleModalView,
                                setSort,
                            }}
                            role={user.role}
                        />
                    </div>
                    <div className={cx('wrap-paginate')}>
                        <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                    </div>
                </div>
            </div>
        );
    } else return <div>Bạn không có quyền thao tác</div>;
}

export default ListExpCpDel;
