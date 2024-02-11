import { useState, useCallback, useEffect } from 'react';
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
import IptCpListTbDel from '~/components/Table/IptCpListTbDel';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function ListIptCpDel() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const [dateStart, setDateStart] = useState('');
    const [dateEnd, setDateEnd] = useState('');

    const [idSelected, setIdSelected] = useState('');
    const [showModalView, setShowModalView] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHardDel] = useState(false);
    axios.defaults.withCredentials = true;

    //Method Toggle

    const toggleModalView = (item) => {
        setShowModalView(!showModalView);
        setIdSelected(item);
    };

    const toggleModalRes = (item) => {
        setShowModalRes(!showModalRes);
        setIdSelected(item);
    };

    const toggleModalHardDel = (item) => {
        setShowModalHardDel(!showModalHardDel);
        setIdSelected(item);
    };

    //Method handle
    const handleRes = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}importlist/restorecp/${id}`)
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

    const handleHardDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${baseUrl}importlist/harddelete/${id}`)
            .then((res) => {
                setShowModalHardDel(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    //Method OnchangeInput

    const onchangeDateStart = (e) => {
        setDateStart(e.target.value);
    };
    const onchangeDateEnd = (e) => {
        setDateEnd(e.target.value);
    };

    //call api
    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}importlist/alllistpaginate/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    branch_id: JSON.parse(localStorage.getItem('data_user')).id_chi_nhanh,
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
    }, [startRecord, sort]);

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
                                onChange={onchangeDateEnd}
                                value={dateEnd}
                                // onBlur={onchangeDate}
                            />
                        </div>
                        <button className={cx('btn-search')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className={cx('btn-action')}>
                            <button className={cx('btn-add')} onClick={() => routeChange('/warehouse/importcreate')}>
                                Nhập tồn
                            </button>
                            <button className={cx('btn-add')} onClick={() => routeChange('/warehouse/importlist')}>
                                Trở lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer />

            {showModalView && (
                <ModalIvDetail
                    label={'Thông tin chi tiết hóa đơn nhập'}
                    methodToggle={toggleModalView}
                    data={idSelected}
                />
            )}

            {showModalRes && (
                <ModalAll
                    label={'Bạn muốn khôi phục hóa đơn?'}
                    methodToggle={toggleModalRes}
                    methodHandle={handleRes}
                    data={idSelected}
                />
            )}

            {showModalHardDel && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleHardDel}
                    data={idSelected}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <IptCpListTbDel
                        data={dataTb}
                        method={{ toggleModalView, toggleModalRes, toggleModalHardDel, setSort }}
                    />
                </div>
                <div className={cx('wrap-paginate')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default ListIptCpDel;
