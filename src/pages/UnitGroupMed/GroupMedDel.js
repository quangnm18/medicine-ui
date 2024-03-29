import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '~/utils/toast';

import axios from 'axios';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import GrMedTbDeleted from '~/components/Table/GrMedTbDeleted';
import Pagination from '~/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function GroupMedDel() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [numRecord, setNumRecord] = useState(10);

    const [dataTbDel, setDataTbDel] = useState([]);
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const [idSelected, setIdSelected] = useState('');

    const [valuesSearch, setValuesSearch] = useState('');

    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHarDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [valueInputs, setValueInputs] = useState({
        ten_nhom_thuoc: '',
        group_code: '',
        description: '',
    });

    const dataInputs = [
        {
            id: 1,
            label: 'Tên nhóm thuốc',
            name: 'ten_nhom_thuoc',
            type: 'text',
            placeholder: 'Thuốc dạ dày,...',
        },
        {
            id: 2,
            label: 'Người xóa',
            name: 'Name',
            type: 'text',
            placeholder: '',
        },
        {
            id: 3,
            label: 'Mã nhân viên',
            name: 'userId_del',
            type: 'text',
            placeholder: '',
        },
    ];

    //method toggle

    const toggleModalRes = (id) => {
        setIdSelected(id);
        setShowModalRes(!showModalRes);
    };

    const toggleModalHardDel = (id) => {
        setIdSelected(id);
        setShowModalHarDel(!showModalHardDel);
    };

    const toggleModalView = (gr) => {
        setIdSelected(gr.id);
        setShowModalView(!showModalView);

        setValueInputs(gr);
    };

    const onChangerNum = (e) => {
        setNumRecord(e.target.value);
    };

    //method handle

    const handleRes = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/group/restore/${id}`)
            .then((res) => {
                setShowModalRes(false);
                loadDataTbDel();
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
            .delete(`${baseUrl}category/medicine/group/harddelete/${id}`)
            .then((res) => {
                setShowModalHarDel(false);
                loadDataTbDel();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/group/update/${idSelected}`, valueInputs)
            .then((res) => {
                setShowModalView(false);
                loadDataTbDel();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Cập nhật thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    //method #

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onChangeInputGrMed = (e) => {
        setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    };

    const handleSearch = () => {
        loadDataTbDel();
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //call API

    const loadDataTbDel = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/medicinegroup/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    search_value: valuesSearch,
                    isDeleted: 1,
                    numRecord: numRecord,
                    startRecord: startRecord,
                    totalRecord: 0,
                },
            })
            .then((res) => {
                setDataTbDel(res.data[0]);
                const totalRecord = res.data[1][0].totalRecord;
                setPageCount(Math.ceil(totalRecord / numRecord));
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadDataTbDel();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord, sort, numRecord]);

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách nhóm dược phẩm</h4>
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
                        <button className={cx('btn-addstaff')} onClick={() => routeChange('/category/grmedicine')}>
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>

            <ToastContainer />

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
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

            {showModalView && (
                <ModalGr
                    label={'Thông tin chi tiết nhóm dược'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodOnchange={onChangeInputGrMed}
                    methodToggle={toggleModalView}
                    methodHandle={handleUpdate}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <GrMedTbDeleted
                        data={dataTbDel}
                        method={{ toggleModalRes, toggleModalView, toggleModalHardDel, setSort }}
                        role={user.role}
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
}

export default GroupMedDel;
