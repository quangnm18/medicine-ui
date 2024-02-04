import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '~/utils/toast';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import UnitMedTb from '~/components/Table/UnitMedTb';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function UnitMed() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [dataTb, setDataTb] = useState([]);

    const [idSelected, setIdSelected] = useState('');
    const [listSelected, setListSelected] = useState([]);

    const [showModalSofDel, setShowModalSofDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const [valuesSearch, setValuesSearch] = useState('');
    const [valueInputs, setValueInputs] = useState({
        donvi_lon: '',
        donvi_tb: '',
        donvi_nho: '',
        unit_code: '',
        description_unit: '',
    });

    axios.defaults.withCredentials = true;

    const dataInputs = [
        {
            id: 1,
            label: 'Đơn vị lớn',
            name: 'donvi_lon',
            type: 'text',
            placeholder: 'Hộp,...',
        },
        {
            id: 2,
            label: 'Đơn vị TB',
            name: 'donvi_tb',
            type: 'text',
            placeholder: 'Vỉ,...',
        },
        {
            id: 3,
            label: 'Đơn vị nhỏ',
            name: 'donvi_nho',
            type: 'text',
            placeholder: 'Viên,...',
        },
        {
            id: 5,
            label: 'Mô tả',
            name: 'description_unit',
            type: 'text',
            placeholder: 'Hộp x 5 Vỉ x 10 Viên',
        },
    ];

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onChangeInputs = (e) => {
        setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
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
            donvi_lon: '',
            donvi_tb: '',
            donvi_nho: '',
            unit_code: '',
            description_unit: '',
        });
        setIdSelected(id);
        setShowModalAdd(!showModalAdd);
    };

    //method handle
    const handleSingleSoftDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        // axios
        //     .put(`${baseUrl}category/medicine/unit/softdelete/${id}`)
        //     .then((res) => {
        //         setShowModalSofDel(false);
        //         loadData();
        //     })
        //     .catch((e) => console.log(e));

        axios
            .put(`${baseUrl}category/medicine/unit/softdelete`, {
                userId_del: user.userId,
                id: id,
            })
            .then((res) => {
                setShowModalSofDel(false);
                loadData();
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
            .get(`${baseUrl}category/maxidunit`)
            .then((res) => {
                const unit_code = `UC${res.data[0].max_id + 1}`;
                axios
                    .post(`${baseUrl}category/medicine/unit/add`, {
                        ...valueInputs,
                        unit_code: unit_code,
                    })
                    .then((res1) => {
                        setShowModalAdd(false);
                        loadData();
                        if (res.data === 'fail') {
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
            .put(`${baseUrl}category/medicine/unit/update/${idSelected}`, valueInputs)
            .then((res) => {
                setShowModalView(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Cập nhật thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    //method call api
    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/medicineunit`, {
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

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách đơn vị dược</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên đơn vị..."
                                onChange={onChangeInputSearch}
                                onKeyUp={handleKeyPress}
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
                                onClick={() => routeChange('/category/unitmedicine/deleted')}
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
                    label={'Thông tin chi tiết đơn vị'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodOnchange={onChangeInputs}
                    methodToggle={toggleModalView}
                    methodHandle={handleUpdate}
                />
            )}
            {showModalAdd && (
                <ModalGr
                    label={'Thêm mới đơn vị'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodToggle={toggleModalAdd}
                    methodOnchange={onChangeInputs}
                    methodHandle={handleAdd}
                />
            )}

            <ToastContainer />

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <UnitMedTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView, setListSelected }} />
                </div>
                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default UnitMed;
