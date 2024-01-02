import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MedicineTb from '~/components/Table/MedicineTb';
import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Medicine.module.scss';
import classNames from 'classnames/bind';
import MedDeletedTb from '~/components/Table/MedDeletedTb';
import SearchInput from '~/components/Search/SearchInput';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalAdd from '~/components/ModalPage/ModalAdd';
import ModalView from '~/components/ModalPage/ModalView';
import ModalAddMed from '~/components/ModalPage/ModalAddMed';
import ModalViewMed from '~/components/ModalPage/ModalViewMed';

const cx = classNames.bind(style);

function Medicine() {
    const [values, setValues] = useState({
        ten: '',
        han_dung: '',
        sdk: '',
        han_sdk: '',
        sqd: '',
        nam_cap: '',
        dot_cap: '',
        hoat_chat: '',
        ham_luong: '',
        dang_bao_che: '',
        dong_goi: '',
        don_vi_duoc: '',
        nhom_thuoc: '',
        cty_dk: '',
        dchi_ctydk: '',
        cty_sx: '',
        dchi_ctysx: '',
    });

    const inputsMedicine = [
        {
            id: 1,
            name: 'ten',
            type: 'text',
            placeholder: 'Tên dược',
        },
        {
            id: 2,
            name: 'han_dung',
            type: 'text',
            placeholder: 'Hạn dùng',
        },
        {
            id: 3,
            name: 'sdk',
            type: 'text',
            placeholder: 'Số đăng ký',
        },
        {
            id: 4,
            name: 'han_sdk',
            type: 'text',
            placeholder: 'Hạn số đăng ký',
        },
        {
            id: 5,
            name: 'sqd',
            type: 'text',
            placeholder: 'Số quyết định',
        },
        {
            id: 6,
            name: 'nam_cap',
            type: 'text',
            placeholder: 'Năm cấp',
        },
        {
            id: 7,
            name: 'hoat_chat',
            type: 'text',
            placeholder: 'Hoạt chất',
        },
        {
            id: 8,
            name: 'ham_luong',
            type: 'text',
            placeholder: 'Hàm lượng',
        },
        {
            id: 9,
            name: 'dang_bao_che',
            type: 'text',
            placeholder: 'Dạng bào chế',
        },
        {
            id: 10,
            name: 'dong_goi',
            type: 'text',
            placeholder: 'Quy cách đóng gói',
        },
        {
            id: 11,
            name: 'cty_dk',
            type: 'text',
            placeholder: 'Công ty đăng ký',
        },
        {
            id: 12,
            name: 'dchi_ctydk',
            type: 'text',
            placeholder: 'Địa chỉ công ty đăng ký',
        },
        {
            id: 13,
            name: 'cty_sx',
            type: 'text',
            placeholder: 'Công ty sản xuất',
        },
        {
            id: 14,
            name: 'dchi_ctysx',
            type: 'text',
            placeholder: 'Địa chỉ công ty sản xuất',
        },
    ];

    const [dataMedicine, setDataMedicine] = useState([]);

    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(nameSearchInput, 500);

    const [medicineCurrent, setMedicineCurrent] = useState([]);
    const [medicineDeleted, setMedicineDeleted] = useState([]);
    const [medDataCur, setMedDataCur] = useState([]);
    const [medDataDel, setMedDataDel] = useState([]);

    const [reload, setReload] = useState();

    const [state, setState] = useState(true);

    const [idSelected, setIdSelected] = useState({});
    const [medSelected, setMedSelected] = useState([]);

    const [showModalSingleDelete, setShowModalSingleDelete] = useState(false);
    const [showModalMultiDelete, setShowModalMultiDelete] = useState(false);

    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDelete, setShowModalHardDelete] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    //search
    const handleSelectedMedicine = useCallback((medicine) => {
        setNameSearchInput(medicine.ten);
    }, []);

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const handleSearch = () => {
        if (state) {
            if (nameSearchInput.length) {
                const arr = medicineCurrent.filter((med) => {
                    return med.ten.toLowerCase().includes(nameSearchInput.toLocaleLowerCase());
                });
                setMedDataCur(arr);
            } else {
                setMedDataCur(medicineCurrent);
            }
        } else {
            if (nameSearchInput.length) {
                const arr = medicineDeleted.filter((med) => {
                    return med.ten.toLocaleLowerCase().includes(nameSearchInput.toLocaleLowerCase());
                });
                setMedDataDel(arr);
            } else {
                setMedDataDel(medicineDeleted);
            }
        }
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

    const toggleModalHardDelete = (id) => {
        setShowModalHardDelete(!showModalHardDelete);
        setIdSelected(id);
    };

    const toggleModalView = (med) => {
        setShowModalView(!showModalView);
        setValues(med);
        setIdSelected(med.id);
    };

    const toggleModalAdd = () => {
        setValues({
            ten: '',
            han_dung: '',
            sdk: '',
            han_sdk: '',
            sqd: '',
            nam_cap: '',
            dot_cap: '',
            hoat_chat: '',
            ham_luong: '',
            dang_bao_che: '',
            dong_goi: '',
            don_vi_duoc: '',
            nhom_thuoc: '',
            cty_dk: '',
            dchi_ctydk: '',
            cty_sx: '',
            dchi_ctysx: '',
        });
        setShowModalAdd(!showModalAdd);
    };

    const toggleModalRes = (id) => {
        setShowModalRes(!showModalRes);
        setIdSelected(id);
    };

    const toggleButtonBin = () => {
        setState(!state);
    };

    //Method Handle

    const addMedicine = () => {
        axios
            .post('http://localhost:8081/category/medicine/add', values)
            .then((res) => {
                console.log(res.data);
                setReload(Math.random());
                setShowModalAdd(false);
            })
            .catch((e) => console.log(e));
    };

    const softDeleteMed = (data) => {
        axios
            .put('http://localhost:8081/category/medicine/update/softdelete', { data })
            .then((res) => {
                setReload(Math.random());
                setShowModalSingleDelete(false);
                setShowModalMultiDelete(false);
            })
            .catch((e) => console.log(e));
    };

    const restoreMed = () => {
        axios
            .put(`http://localhost:8081/category/medicine/update/restore/${idSelected}`)
            .then((res) => {
                setReload(Math.random());
                setShowModalRes(false);
            })
            .catch((e) => console.log(e));
    };

    const deleteMedicine = () => {
        axios
            .delete(`http://localhost:8081/category/medicine/delete/${idSelected}`)
            .then((res) => {
                setReload(Math.random());
                setShowModalHardDelete(false);
            })
            .catch((e) => console.log(e));
    };

    const updateMedicine = () => {
        axios
            .put(`http://localhost:8081/category/medicine/update/${idSelected}`, values)
            .then((res) => {
                setReload(Math.random());
                setShowModalView(false);
            })
            .catch((e) => console.log(e));
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleChooseRow = ({ selectedRows }) => {
        setMedSelected(selectedRows);
    };

    //Call API Render
    useEffect(() => {
        axios
            .get('http://localhost:8081/category/medicine')
            .then((res) => {
                const data = res.data;
                const dataCurr = data.filter((med) => med.isDeleted !== 1);
                const dataDeleted = data.filter((med) => med.isDeleted === 1);
                setMedicineCurrent(dataCurr);
                setMedDataCur(dataCurr);
                setMedicineDeleted(dataDeleted);
                setMedDataDel(dataDeleted);
                setDataMedicine(dataCurr);
            })
            .catch((err) => console.log(err));
    }, [reload]);

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

        // request
        //     .get('category/medicine/search/', {
        //         params: {
        //             name: debounced,
        //         },
        //     })
        //     .then((res) => {
        //         console.log(res.data);
        //         setSearchResult(res.data);
        //     })
        //     .catch((e) => console.log(e));
    }, [debounced]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Danh mục</DirectionHeader>
                <h4 className={cx('header-title')}>{state ? 'Danh sách dược phẩm' : 'Dược phẩm đã xóa'}</h4>

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
                            {state && (
                                <>
                                    <button className={cx('btn-action', 'btn')} onClick={toggleModalAdd}>
                                        Thêm mới
                                    </button>
                                    <button className={cx('btn-action', 'btn')}>Nhập Excel</button>
                                </>
                            )}

                            <button className={cx('btn-action', 'btn')}>Xuất excel</button>
                        </span>
                    </div>

                    <div className={cx('action-bin')}>
                        <button className={cx('btn-delete', 'btn')} onClick={() => toggleModalMultiDelete(medSelected)}>
                            Xóa dược
                        </button>
                        {state ? (
                            <button className={cx('btn-delete', 'btn')} onClick={toggleButtonBin}>
                                Bin
                            </button>
                        ) : (
                            <button className={cx('btn-delete', 'btn')} onClick={toggleButtonBin}>
                                Trở lại
                            </button>
                        )}
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

            {showModalMultiDelete && (
                <ModalAll
                    label={'Xóa các mục đã chọn?'}
                    methodToggle={toggleModalMultiDelete}
                    methodHandle={softDeleteMed}
                    data={medSelected}
                />
            )}

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

            <div className={cx('main-content')}>
                {state ? (
                    <MedicineTb
                        data={medDataCur}
                        method={{ toggleModalSingleDelete, toggleModalView, handleChooseRow }}
                    />
                ) : (
                    <MedDeletedTb
                        data={medDataDel}
                        method={{ toggleModalSingleDelete, toggleModalView, toggleModalRes, toggleModalHardDelete }}
                    />
                )}
            </div>
        </div>
    );
}

export default Medicine;
