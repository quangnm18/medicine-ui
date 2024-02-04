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
import GroupMedTb from '~/components/Table/GroupMedTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import Pagination from '~/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function GroupMed() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState();

    const [dataTb, setDataTb] = useState([]);

    const [idSelected, setIdSelected] = useState('');
    const [listSelected, setListSelected] = useState([]);

    const [valuesSearch, setValuesSearch] = useState('');

    const [showModalSofDel, setShowModalSofDel] = useState(false);

    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const [valueInputs, setValueInputs] = useState({
        ten_nhom_thuoc: '',
        group_code: '',
        description: '',
    });

    axios.defaults.withCredentials = true;

    const dataInputs = [
        {
            id: 1,
            label: 'Tên nhóm thuốc',
            name: 'ten_nhom_thuoc',
            type: 'text',
            placeholder: 'Thuốc dạ dày,...',
        },
    ];

    //method toggle

    const toggleModalSoftDel = (id) => {
        setIdSelected(id);
        setShowModalSofDel(!showModalSofDel);
    };

    const toggleModalView = (gr) => {
        setIdSelected(gr.id);
        setShowModalView(!showModalView);

        setValueInputs(gr);
    };

    const toggleModalAdd = (id) => {
        setValueInputs({
            ten_nhom_thuoc: '',
            group_code: '',
            description: '',
        });
        setIdSelected(id);
        setShowModalAdd(!showModalAdd);
    };

    //method handle
    const handleSingleSoftDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/group/softdelete/${id}`)
            .then((res) => {
                setShowModalSofDel(false);
                loadDataTb();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleAdd = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/maxidgr`)
            .then((res) => {
                const group_code = `N${res.data[0].max_id + 1}`;
                axios
                    .post(`${baseUrl}category/medicine/group/add`, {
                        ...valueInputs,
                        group_code: group_code,
                    })
                    .then((res1) => {
                        setShowModalAdd(false);
                        loadDataTb();
                        if (res1.data === 'fail') {
                            toast.notify('Bạn không có quyền thao tác', 'error');
                        } else {
                            toast.notify('Thêm mới thành công', 'success');
                        }
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/group/update/${idSelected}`, valueInputs)
            .then((res) => {
                setShowModalView(false);
                loadDataTb();
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
        loadDataTb();
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

    const loadDataTb = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/medicinegroup/`, {
                params: {
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
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadDataTb();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord]);

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
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Thêm
                        </button>

                        {(user.role === 'ADM' || user.role === 'ADMA') && (
                            <button
                                className={cx('btn-addstaff')}
                                onClick={() => routeChange('/category/grmedicine/deleted')}
                            >
                                Đã xóa
                            </button>
                        )}

                        {listSelected.length > 0 && (
                            <button className={cx('btn-addstaff', 'btn-delMulti')}>Xóa mục đã chọn</button>
                        )}
                    </div>
                </div>
            </div>

            {showModalSofDel && (
                <ModalAll
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSoftDel}
                    methodHandle={handleSingleSoftDel}
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
            {showModalAdd && (
                <ModalGr
                    label={'Thêm mới nhóm dược'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodToggle={toggleModalAdd}
                    methodOnchange={onChangeInputGrMed}
                    methodHandle={handleAdd}
                />
            )}

            <ToastContainer />

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <GroupMedTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView, setListSelected }} />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default GroupMed;
