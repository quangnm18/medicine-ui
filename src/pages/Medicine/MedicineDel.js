import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Medicine.module.scss';
import classNames from 'classnames/bind';
import MedDeletedTb from '~/components/Table/MedDeletedTb';
import SearchInput from '~/components/Search/SearchInput';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalViewMed from '~/components/ModalPage/ModalViewMed';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function MedicineDel() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

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
            type: 'date',
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
            type: 'date',
            placeholder: 'YYYY-MM-DD',
        },
        {
            id: 7,
            label: 'Đợt cấp',
            name: 'dot_cap',
            type: 'text',
            placeholder: '',
        },
        {
            id: 8,
            label: 'Tiêu chuẩn',
            name: 'tieu_chuan',
            type: 'text',
            placeholder: '',
        },
        {
            id: 9,
            label: 'Hoạt chất',
            name: 'hoat_chat',
            type: 'text',
            placeholder: 'Hoạt chất',
        },
        {
            id: 10,
            label: 'Hàm lượng',
            name: 'ham_luong',
            type: 'text',
            placeholder: 'Hàm lượng',
        },
        {
            id: 11,
            label: 'Dạng bào chế',
            name: 'dang_bao_che',
            type: 'text',
            placeholder: 'Dạng bào chế',
        },
        {
            id: 12,
            label: 'Quy cách đóng gói',
            name: 'dong_goi',
            type: 'text',
            placeholder: 'Quy cách đóng gói',
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

    const [dataTbDel, setDataTbDel] = useState([]);
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'desc' });

    const [idSelected, setIdSelected] = useState({});
    const [medSelected, setMedSelected] = useState([]);

    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDelete, setShowModalHardDelete] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    //search
    const handleSelectedMedicine = useCallback((medicine) => {
        setNameSearchInput(medicine.ten);
    }, []);

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const handleSearch = () => {
        loadDataTbDel();
    };

    //Method Toggle

    const toggleModalHardDelete = (id) => {
        setShowModalHardDelete(!showModalHardDelete);
        setIdSelected(id);
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

    const toggleModalRes = (id) => {
        setShowModalRes(!showModalRes);
        setIdSelected(id);
    };

    //Method Handle

    const restoreMed = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;

        axios
            .put(`${baseUrl}category/medicine/update/restore/${idSelected}`)
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

    const deleteMedicine = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${baseUrl}category/medicine/delete/${idSelected}`)
            .then((res) => {
                setShowModalHardDelete(false);
                loadDataTbDel();
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
                loadDataTbDel();
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
        setMedSelected(selectedRows);
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //Call API Render
    const loadDataTbDel = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/getallmed/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    search_value: nameSearchInput,
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
    }, [startRecord, sort]);

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

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
                    </div>

                    <div className={cx('action-bin')}>
                        <button className={cx('btn-delete', 'btn')} onClick={() => routeChange('/category/medicine')}>
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>

            {showModalHardDelete && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDelete}
                    methodHandle={deleteMedicine}
                    data={idSelected}
                />
            )}

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
                    methodHandle={restoreMed}
                    methodToggle={toggleModalRes}
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
            <ToastContainer />

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <MedDeletedTb
                        data={dataTbDel}
                        method={{ toggleModalView, toggleModalRes, toggleModalHardDelete, setSort }}
                    />
                </div>

                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default MedicineDel;
