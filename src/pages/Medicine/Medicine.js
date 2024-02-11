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
import * as format from '~/utils/format';
import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ModalAll from '~/components/ModalPage/ModalAll';
import ModalAddMed from '~/components/ModalPage/ModalAddMed';
import ModalAddExcel from '~/components/ModalPage/ModalExcel';
import Pagination from '~/components/Pagination/Pagination';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(style);

function Medicine() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

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
    });

    const inputsMedicine = [
        {
            id: 1,
            label: 'Tên dược',
            name: 'ten',
            type: 'text',
            placeholder: 'Ampicilin',
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
            placeholder: '893110354923',
        },
        {
            id: 4,
            label: 'Hạn số đăng ký',
            name: 'han_sdk',
            type: 'date',
            placeholder: 'YYYY-MM-DD',
        },
        {
            id: 5,
            label: 'Số quyết định',
            name: 'sqd',
            type: 'text',
            placeholder: '826/QĐ-QLD',
        },
        {
            id: 6,
            label: 'Năm cấp',
            name: 'nam_cap',
            type: 'date',
            placeholder: 'YYYY-MM-DD',
        },
        {
            id: 7,
            label: 'Đợt cấp',
            name: 'dot_cap',
            type: 'text',
            placeholder: '187 BS',
        },
        {
            id: 8,
            label: 'Tiêu chuẩn',
            name: 'tieu_chuan',
            type: 'text',
            placeholder: 'NSX',
        },
        {
            id: 9,
            label: 'Hoạt chất',
            name: 'hoat_chat',
            type: 'text',
            placeholder: 'Natri valproate',
        },
        {
            id: 10,
            label: 'Hàm lượng',
            name: 'ham_luong',
            type: 'text',
            placeholder: '200mg/ml',
        },
        {
            id: 11,
            label: 'Dạng bào chế',
            name: 'dang_bao_che',
            type: 'text',
            placeholder: 'Dung dịch thuốc uống',
        },
        {
            id: 12,
            label: 'Quy cách đóng gói',
            name: 'dong_goi',
            type: 'text',
            placeholder: 'Hộp 1 chai 40ml',
        },
        {
            id: 13,
            label: 'Công ty đăng ký',
            name: 'cty_dk',
            type: 'text',
            placeholder: 'Công ty đăng ký',
        },
        {
            id: 14,
            label: 'Địa chỉ công ty đăng ký',
            name: 'dchi_ctydk',
            type: 'text',
            placeholder: 'Địa chỉ công ty đăng ký',
        },
        {
            id: 15,
            label: 'Công ty sản xuất',
            name: 'cty_sx',
            type: 'text',
            placeholder: 'Công ty sản xuất',
        },
        {
            id: 16,
            label: 'Địa chỉ công ty sản xuất',
            name: 'dchi_ctysx',
            type: 'text',
            placeholder: 'Địa chỉ công ty sản xuất',
        },
    ];

    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(nameSearchInput, 500);

    const [dataGrMed, setDataGrMed] = useState([]);
    const [selectGrMed, setSelectGrMed] = useState();

    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const [idSelected, setIdSelected] = useState({});
    const [medSelected, setMedSelected] = useState([]);
    const [listSelected, setListSelected] = useState([]);

    const [showModalSingleDelete, setShowModalSingleDelete] = useState(false);
    const [showModalMultiDelete, setShowModalMultiDelete] = useState(false);

    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalExcel, setShowModalExcel] = useState(false);

    axios.defaults.withCredentials = true;

    //search
    const handleSelectedMedicine = useCallback((medicine) => {
        setNameSearchInput(medicine.ten);
    }, []);

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const onchangeGrMed = (e) => {
        setSelectGrMed(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    };

    //Method Toggle

    const toggleModalSingleDelete = (med) => {
        setShowModalSingleDelete(!showModalSingleDelete);
        setMedSelected([med]);
    };

    const toggleModalMultiDelete = () => {
        setShowModalMultiDelete(!showModalMultiDelete);
        // setListSelected(arrMed);
    };

    const toggleModalView = (med) => {
        setValues({ ...med, han_sdk: format.formatDate(med.han_sdk), nam_cap: format.formatDate(med.nam_cap) });
        setIdSelected(med.id);
        setShowModalView(!showModalView);
    };

    const toggleModalAdd = () => {
        setValues({
            sdk: '',
            han_sdk: format.formatDate('1970-01-01'),
            ten: '',
            hoat_chat: '',
            ham_luong: '',
            sqd: '',
            nam_cap: format.formatDate('1970-01-01'),
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
        });
        setShowModalAdd(!showModalAdd);
    };

    const toggleModalExcel = () => {
        setShowModalExcel(!showModalExcel);
    };

    //Method Handle

    const addMedicine = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${baseUrl}category/medicine/add`, values)
            .then((res) => {
                if (res.data.errno) {
                    console.log(res.data);
                } else {
                    setShowModalAdd(false);
                    loadData();
                    if (res.data === 'fail') {
                        toast.notify('Bạn không có quyền thao tác', 'error');
                    } else {
                        toast.notify('Thêm thành công', 'success');
                    }
                }
            })
            .catch((e) => console.log(e));
    };

    const softDeleteMed = (data) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/update/softdelete`, { data })
            .then((res) => {
                setShowModalSingleDelete(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const softMultiDeleteMed = (data) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/update/softdelete`, { data })
            .then((res) => {
                setShowModalMultiDelete(false);
                setListSelected([]);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const updateMedicine = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/medicine/update/${idSelected}`, values)
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

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleChooseRow = ({ selectedRows }) => {
        setListSelected(selectedRows);
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //Call API Render
    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/getallmed/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    group_id: selectGrMed,
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
    }, [startRecord, selectGrMed, sort]);

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

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
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
                        <button
                            className={cx('btn-delete', 'btn')}
                            onClick={() => routeChange('/category/medicine/deleted')}
                        >
                            Đã xóa
                        </button>
                        {listSelected.length > 0 && (
                            <button className={cx('btn-delete', 'btn')} onClick={toggleModalMultiDelete}>
                                Xóa dược
                            </button>
                        )}
                    </div>
                </div>
                <div className={cx('medicine-option')}>
                    <label className={cx('label-option')}>Nhóm thuốc</label>
                    <select className={cx('group-select')} value={selectGrMed} onChange={onchangeGrMed}>
                        <option value={0}>--Chọn nhóm thuốc--</option>
                        {dataGrMed.map((gr) => (
                            <option key={gr.id} value={gr.id}>
                                {gr.ten_nhom_thuoc}
                            </option>
                        ))}
                    </select>
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

            {listSelected.length > 0 && showModalMultiDelete && (
                <ModalAll
                    label={'Xóa các mục đã chọn?'}
                    methodToggle={toggleModalMultiDelete}
                    methodHandle={softMultiDeleteMed}
                    data={listSelected}
                />
            )}

            {showModalView && (
                <div>
                    <ModalAddMed
                        label={'Thông tin chi tiết dược phẩm'}
                        dataInputs={inputsMedicine}
                        dataValueInputs={values}
                        methodOnchange={onChange}
                        methodToggle={toggleModalView}
                        methodHandle={updateMedicine}
                        methodValueSelect={setValues}
                    />
                </div>
            )}

            {showModalAdd && (
                <div>
                    <ModalAddMed
                        label={'Thêm mới dược phẩm'}
                        dataInputs={inputsMedicine}
                        dataValueInputs={values}
                        methodOnchange={onChange}
                        methodToggle={toggleModalAdd}
                        methodHandle={addMedicine}
                        methodValueSelect={setValues}
                    />
                </div>
            )}

            {showModalExcel && <ModalAddExcel methodToggle={toggleModalExcel} />}
            <ToastContainer />

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <MedicineTb
                        data={dataTb}
                        method={{ toggleModalSingleDelete, toggleModalView, handleChooseRow, setSort }}
                    />
                </div>

                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Medicine;
