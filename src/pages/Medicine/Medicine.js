import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import MedicineTb from '~/components/Table/MedicineTb';
import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Medicine.module.scss';
import classNames from 'classnames/bind';
import SearchInput from '~/components/Search/SearchInput';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalAddMed from '~/components/ModalPage/ModalAddMed';
import ModalViewMed from '~/components/ModalPage/ModalViewMed';
import ModalAddExcel from '~/components/ModalPage/ModalExcel';
import Pagination from '~/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Medicine() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);
    const [values, setValues] = useState({
        sdk: '',
        han_sdk: '',
        ten: '',
        hoat_chat: '',
        ham_luong: '',
        sqd: '',
        nam_cap: '',
        dot_cap: '',
        dang_bao_che: '',
        dong_goi: '',
        tieu_chuan: '',
        han_dung: '',
        cty_dk: '',
        dchi_ctydk: '',
        cty_sx: '',
        dchi_ctysx: '',
        don_vi_duoc: '',
        nhom_thuoc: '',
        don_gia: '',
    });

    const inputsMedicine = [
        {
            id: 1,
            label: 'Tên dược',
            name: 'ten',
            type: 'text',
            placeholder: 'Tên dược',
        },
        {
            id: 2,
            label: 'Hạn dùng (tháng)',
            name: 'han_dung',
            type: 'text',
            placeholder: '12',
        },
        {
            id: 3,
            label: 'Số đăng ký',
            name: 'sdk',
            type: 'text',
            placeholder: 'Số đăng ký',
        },
        {
            id: 4,
            label: 'Hạn số đăng ký',
            name: 'han_sdk',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
        },
        {
            id: 5,
            label: 'Số quyết định',
            name: 'sqd',
            type: 'text',
            placeholder: 'Số quyết định',
        },
        {
            id: 6,
            label: 'Năm cấp',
            name: 'nam_cap',
            type: 'text',
            placeholder: 'YYYY-MM-DD',
        },
        {
            id: 7,
            label: 'Hoạt chất',
            name: 'hoat_chat',
            type: 'text',
            placeholder: 'Hoạt chất',
        },
        {
            id: 8,
            label: 'Hàm lượng',
            name: 'ham_luong',
            type: 'text',
            placeholder: 'Hàm lượng',
        },
        {
            id: 9,
            label: 'Dạng bào chế',
            name: 'dang_bao_che',
            type: 'text',
            placeholder: 'Dạng bào chế',
        },
        {
            id: 10,
            label: 'Quy cách đóng gói',
            name: 'dong_goi',
            type: 'text',
            placeholder: 'Quy cách đóng gói',
        },
        {
            id: 11,
            label: 'Công ty đăng ký',
            name: 'cty_dk',
            type: 'text',
            placeholder: 'Công ty đăng ký',
        },
        {
            id: 12,
            label: 'Địa chỉ công ty đăng ký',
            name: 'dchi_ctydk',
            type: 'text',
            placeholder: 'Địa chỉ công ty đăng ký',
        },
        {
            id: 13,
            label: 'Công ty sản xuất',
            name: 'cty_sx',
            type: 'text',
            placeholder: 'Công ty sản xuất',
        },
        {
            id: 14,
            label: 'Địa chỉ công ty sản xuất',
            name: 'dchi_ctysx',
            type: 'text',
            placeholder: 'Địa chỉ công ty sản xuất',
        },
        {
            id: 15,
            label: 'Đơn giá bán',
            name: 'don_gia',
            type: 'number',
            placeholder: 'Đơn giá bán',
        },
    ];

    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(nameSearchInput, 500);

    const [idSelected, setIdSelected] = useState({});
    const [medSelected, setMedSelected] = useState([]);

    const [showModalSingleDelete, setShowModalSingleDelete] = useState(false);
    const [showModalMultiDelete, setShowModalMultiDelete] = useState(false);

    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalExcel, setShowModalExcel] = useState(false);

    //search
    const handleSelectedMedicine = useCallback((medicine) => {
        setNameSearchInput(medicine.ten);
    }, []);

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const handleSearch = () => {
        loadData();
    };

    //Method Toggle

    const toggleModalSingleDelete = (med) => {
        setShowModalSingleDelete(!showModalSingleDelete);
        setMedSelected([med]);
    };

    const toggleModalMultiDelete = (arrMed) => {
        setShowModalMultiDelete(!showModalMultiDelete);
        setMedSelected(arrMed);
    };

    const toggleModalView = (med) => {
        const date_sdk = new Date(med.han_sdk);
        const date_namcap = new Date(med.nam_cap);

        let datetimeSdk = date_sdk.getFullYear() + '-' + (date_sdk.getMonth() + 1) + '-' + date_sdk.getDate();
        let datetimeNamCap =
            date_namcap.getFullYear() + '-' + (date_namcap.getMonth() + 1) + '-' + date_namcap.getDate();

        setValues({ ...med, han_sdk: datetimeSdk, nam_cap: datetimeNamCap });
        setIdSelected(med.id);
        setShowModalView(!showModalView);
    };

    const toggleModalAdd = () => {
        setValues({
            sdk: '',
            han_sdk: '0000-00-00',
            ten: '',
            hoat_chat: '',
            ham_luong: '',
            sqd: '',
            nam_cap: '0000-00-00',
            dot_cap: '',
            dang_bao_che: '',
            dong_goi: '',
            tieu_chuan: '',
            han_dung: '',
            cty_dk: '',
            dchi_ctydk: '',
            cty_sx: '',
            dchi_ctysx: '',
            don_vi_duoc: '',
            nhom_thuoc: '',
            don_gia: '',
        });
        setShowModalAdd(!showModalAdd);
    };

    const toggleModalExcel = () => {
        setShowModalExcel(!showModalExcel);
    };

    //Method Handle

    const addMedicine = (valueUnit, valueGroup) => {
        axios
            .post('http://localhost:8081/category/medicine/add', {
                ...values,
                don_vi_duoc: valueUnit,
                nhom_thuoc: valueGroup,
            })
            .then((res) => {
                if (res.data.errno) {
                    console.log(res.data);
                } else {
                    setShowModalAdd(false);
                    loadData();
                }
            })
            .catch((e) => console.log(e));
    };

    const softDeleteMed = (data) => {
        axios
            .put('http://localhost:8081/category/medicine/update/softdelete', { data })
            .then((res) => {
                setShowModalSingleDelete(false);
                setShowModalMultiDelete(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const updateMedicine = () => {
        axios
            .put(`http://localhost:8081/category/medicine/update/${idSelected}`, values)
            .then((res) => {
                setShowModalView(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleChooseRow = ({ selectedRows }) => {
        setMedSelected(selectedRows);
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //Call API Render
    const loadData = () => {
        axios
            .get('http://localhost:8081/category/getallmed/', {
                params: {
                    search_value: nameSearchInput,
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

    //search
    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const result = await searchServices.search(debounced);
            setSearchResult(result);
        };
        fetchApi();
    }, [debounced]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quang lý danh mục</DirectionHeader>
                <h4 className={cx('header-title')}>Danh sách dược phẩm</h4>

                <div className={cx('choose-medicine')}>
                    <div className={cx('medicine-option')}>
                        <div className={cx('medicine-search')}>
                            <label className={cx('label-option')}>Tìm kiếm</label>
                            <div className={cx('search-component')}>
                                <SearchInput
                                    dataInputValue={nameSearchInput}
                                    dataSearchResult={searchResult}
                                    methodOnchangeInput={handleOnchangeInput}
                                    methodSelectedResult={handleSelectedMedicine}
                                    classWidth={'search-resultMed'}
                                />
                            </div>

                            <button className={cx('btn-search', 'btn')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <span className={cx('control-action')}>
                            <button className={cx('btn-action', 'btn')} onClick={toggleModalAdd}>
                                Thêm mới
                            </button>
                            <button className={cx('btn-action', 'btn')} onClick={toggleModalExcel}>
                                Nhập Excel
                            </button>

                            <button className={cx('btn-action', 'btn')}>Xuất excel</button>
                        </span>
                    </div>

                    <div className={cx('action-bin')}>
                        <button className={cx('btn-delete', 'btn')} onClick={() => toggleModalMultiDelete(medSelected)}>
                            Xóa dược
                        </button>
                        <button
                            className={cx('btn-delete', 'btn')}
                            onClick={() => routeChange('/category/medicine/deleted')}
                        >
                            Đã xóa
                        </button>
                    </div>
                </div>
            </div>

            {showModalSingleDelete && (
                <ModalAll
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSingleDelete}
                    methodHandle={softDeleteMed}
                    data={medSelected}
                />
            )}

            {medSelected.length > 0 && showModalMultiDelete && (
                <ModalAll
                    label={'Xóa các mục đã chọn?'}
                    methodToggle={toggleModalMultiDelete}
                    methodHandle={softDeleteMed}
                    data={medSelected}
                />
            )}

            {showModalView && (
                <div>
                    <ModalViewMed
                        dataInputs={inputsMedicine}
                        dataValueInputs={values}
                        methodOnchange={onChange}
                        methodToggle={toggleModalView}
                        methodHandle={updateMedicine}
                    />
                </div>
            )}

            {showModalAdd && (
                <div>
                    <ModalAddMed
                        dataInputs={inputsMedicine}
                        dataValueInputs={values}
                        methodOnchange={onChange}
                        methodToggle={toggleModalAdd}
                        methodHandle={addMedicine}
                    />
                </div>
            )}

            {showModalExcel && <ModalAddExcel methodToggle={toggleModalExcel} />}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <MedicineTb data={dataTb} method={{ toggleModalSingleDelete, toggleModalView, handleChooseRow }} />
                </div>

                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Medicine;
