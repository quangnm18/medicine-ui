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

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ExpCpListTb from '~/components/Table/ExpCpListTb';

const cx = classNames.bind(style);

function ListExpCp() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [numRecord, setNumRecord] = useState(10);

    const [dataTb, setDataTb] = useState([]);
    const [dataBranch, setDataBranch] = useState([]);

    const [dateStart, setDateStart] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [valuesSearch, setValuesSearch] = useState('');

    const [idSelected, setIdSelected] = useState('');
    const [selectBranch, setSelectBranch] = useState(undefined);

    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAccept, setShowModalAccept] = useState(false);
    const [showModalReject, setShowModalReject] = useState(false);
    axios.defaults.withCredentials = true;

    //Method Toggle
    const toggleModalSoftDel = (invoice_code) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(invoice_code);
    };

    const toggleModalView = (item) => {
        setShowModalView(!showModalView);
        setIdSelected(item);
    };

    const toggleModalAccept = (invoice_code) => {
        setShowModalAccept(!showModalAccept);
        setIdSelected(invoice_code);
    };

    const toggleModalReject = (invoice_code) => {
        setShowModalReject(!showModalReject);
        setIdSelected(invoice_code);
    };

    const onchangeBranch = (e) => {
        setSelectBranch(e.target.value);
    };

    const onChangerNum = (e) => {
        setNumRecord(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    //Method handle

    const handleSoftDel = (invoice_code) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}exportwh/softdeleteiv`, { ma_hoa_don: idSelected, deleted_by: user.userId })
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleAcceptIv = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}exportwh/acceptcp`, { ma_hoa_don: idSelected })
            .then((res) => {
                setShowModalAccept(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Phê duyệt thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleRejectIv = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}exportwh/rejectcp`, { ma_hoa_don: idSelected })
            .then((res) => {
                setShowModalReject(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Phê duyệt thành công', 'success');
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
    }, [startRecord, selectBranch, sort, numRecord]);

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

    if (user.role === 'ADM' || user.role === 'STFW' || user.role === 'ADMA') {
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
                                        className={cx('btn-add', 'btn-delete')}
                                        onClick={() => routeChange('/warehouse/exportlist/deleted')}
                                    >
                                        Đã xóa
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
                        label={'Thông tin chi tiết hóa đơn xuất'}
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

                {showModalReject && (
                    <ModalAccept
                        label={'Từ chối đơn nhập?'}
                        methodToggle={toggleModalReject}
                        methodHandle={handleRejectIv}
                        data={idSelected}
                    />
                )}

                <div className={cx('main-content')}>
                    <div className={cx('content-table')}>
                        <ExpCpListTb
                            data={dataTb}
                            method={{
                                toggleModalSoftDel,
                                toggleModalView,
                                toggleModalAccept,
                                toggleModalReject,
                                setSort,
                            }}
                        />
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
    } else return <div>Bạn không có quyền thao tác</div>;
}

export default ListExpCp;
