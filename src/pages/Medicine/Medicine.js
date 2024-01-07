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
import ModalAddMed from '~/components/ModalPage/ModalAddMed';
import ModalViewMed from '~/components/ModalPage/ModalViewMed';
import ModalAddExcel from '~/components/ModalPage/ModalExcel';

const cx = classNames.bind(style);

function Medicine() {
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
    const [showModalExcel, setShowModalExcel] = useState(false);

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

    const toggleModalRes = (id) => {
        setShowModalRes(!showModalRes);
        setIdSelected(id);
    };

    const toggleModalExcel = () => {
        setShowModalExcel(!showModalExcel);
    };

    const toggleButtonBin = () => {
        setState(!state);
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
                    setReload(Math.random());
                    setShowModalAdd(false);
                }
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
                setDataMedicine(data);
                const dataCurr = data.filter((med) => med.isDeleted !== 1);
                const dataDeleted = data.filter((med) => med.isDeleted === 1);
                setMedicineCurrent(dataCurr);
                setMedDataCur(dataCurr);
                setMedicineDeleted(dataDeleted);
                setMedDataDel(dataDeleted);
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
    }, [debounced]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quang lý danh mục</DirectionHeader>
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
                                    <button className={cx('btn-action', 'btn')} onClick={toggleModalExcel}>
                                        Nhập Excel
                                    </button>
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

            {medSelected.length > 0 && showModalMultiDelete && (
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

            {showModalExcel && <ModalAddExcel methodToggle={toggleModalExcel} />}

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
