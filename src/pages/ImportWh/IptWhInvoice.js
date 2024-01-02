import { useState, useEffect } from 'react';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './ImportWh.module.scss';
import classNames from 'classnames/bind';
import useDebounce from '~/hooks/useDebounce';
import SearchInput from '~/components/Search/SearchInput';
import * as searchServices from '~/apiServices/searchServices';
import IptDetailTb from '~/components/Table/IptDetailTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import axios from 'axios';

const cx = classNames.bind(style);

// const initState = {
//     searchInput: '',
//     searchResult: [],

//     medSelected: '',
//     valuesRow: {
//         ten: '',
//         dong_goi: '',
//         so_luong: '',
//         quy_doi1: '',
//         quy_doi2: '',
//         tong_sl: '',
//         dvt: '',
//         gianhap_chuaqd: '',
//         gianhap_daqd: '',
//         giaban_daqd: '',
//         thanh_tien: '',
//         ck: 0,
//         vat: 0,
//         han_dung: '',
//         so_lo: '',
//         sdk: '',
//     },
//     dataTb: [],
// };

//2. Actions
// const SET_SEARCH_VALUE = 'set_search_value';
// const SET_SEARCH_RESULT = 'set_search_result';
// const SET_MED_SELECTED = 'set_med_selected';
// const SET_VALUES_ROW = 'set_values_row';
// const SET_DATA_TB = 'set_data_tb';

// const setSearchValue = (payload) => {
//     return {
//         type: SET_SEARCH_VALUE,
//         payload,
//     };
// };

// const setSearchResult = (payload) => {
//     return {
//         type: SET_SEARCH_RESULT,
//         payload,
//     };
// };

// const setValuesRow = (payload) => {
//     return {
//         type: SET_VALUES_ROW,
//         payload,
//     };
// };

// const setDataTb = (payload) => {
//     return {
//         type: SET_DATA_TB,
//         payload,
//     };
// };

//3. Reducer
// const reducer = (state, action) => {
//     switch (action.type) {
//         case SET_SEARCH_VALUE:
//             return {
//                 ...state,
//                 searchInput: action.payload,
//             };
//         case SET_SEARCH_RESULT:
//             return {
//                 ...state,
//                 searchResult: action.payload,
//             };
//         case SET_VALUES_ROW:
//             return {
//                 ...state,
//                 valuesRow: action.payload,
//             };
//         case SET_DATA_TB:
//             return {
//                 ...state,
//                 dataTb: action.payload,
//             };
//     }
// };

//4 Dispatch

function CreateInvoiceIpt() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(searchInput, 500);

    const [dataSup, setDataSup] = useState([]);

    const [dataTb, setDataTb] = useState([]);
    const [valuesRow, setValuesRow] = useState({
        med_id: '',
        ten: '',
        dong_goi: '',
        count_max: '',
        count_medium: '',
        count_min: '',
        sl_tong: '',
        dvt: '',
        gianhap_chuaqd: '',
        gianhap_daqd: '',
        giaban_daqd: '',
        thanh_tien: '',
        ck: '',
        vat: '',
        han_dung: '',
        so_lo: '',
    });

    const [inputsDetail, setInputsDetail] = useState([
        {
            id: 1,
            name: 'ten',
            type: 'text',
            placeholder: 'Tên',
        },
        {
            id: 2,
            name: 'count_max',
            type: 'text',
            placeholder: 'Số lượng',
        },
        {
            id: 3,
            name: 'count_medium',
            type: 'text',
            placeholder: 'Quy đổi 2',
        },
        {
            id: 4,
            name: 'count_min',
            type: 'text',
            placeholder: 'Quy đổi 1',
        },
        {
            id: 5,
            name: 'sl_tong',
            type: 'text',
            placeholder: 'SL(ĐV-Min)',
        },
        {
            id: 6,
            name: 'dvt',
            type: 'text',
            placeholder: 'Đơn vị tính',
        },
        {
            id: 12,
            name: 'ck',
            type: 'text',
            placeholder: 'CK(%)',
        },
        {
            id: 13,
            name: 'vat',
            type: 'text',
            placeholder: 'VAT(%)',
        },

        {
            id: 10,
            name: 'dong_goi',
            type: 'text',
            placeholder: 'Quy cách đóng gói',
        },
        {
            id: 7,
            name: 'gianhap_chuaqd',
            type: 'text',
            placeholder: 'Giá nhập chưa Q.đổi',
        },
        {
            id: 8,
            name: 'gianhap_daqd',
            type: 'text',
            placeholder: 'Giá nhập đã Q.đổi',
        },
        {
            id: 9,
            name: 'giaban_daqd',
            type: 'text',
            placeholder: 'Giá bán đã Q.đổi',
        },

        {
            id: 11,
            name: 'thanh_tien',
            type: 'text',
            placeholder: 'Thành tiền',
        },
        {
            id: 14,
            name: 'han_dung',
            type: 'text',
            placeholder: 'Hạn dùng',
        },
        {
            id: 15,
            name: 'so_lo',
            type: 'text',
            placeholder: 'Số lô',
        },
    ]);

    const [errors, setErrors] = useState({});

    const [modalSave, setModalSave] = useState(false);

    //Method OnchangeInput
    const handleSelected = (item) => {
        setSearchInput(item.ten);
        setValuesRow({
            ...valuesRow,
            med_id: item.id,
            ten: item.ten,
            dong_goi: item.dong_goi,
            dvt: item.min_unit,
            sdk: item.sdk,
        });
    };

    const handleOnchangeInput = (value) => {
        setSearchInput(value);
    };

    const onChangeInputs = (e) => {
        setValuesRow({
            ...valuesRow,
            [e.target.name]: e.target.value,
            sl_tong: valuesRow.count_max * valuesRow.count_min,
            gianhap_daqd: valuesRow.sl_tong ? valuesRow.gianhap_chuaqd / valuesRow.sl_tong : 0,
            thanh_tien: valuesRow.count_max * valuesRow.gianhap_chuaqd,
        });
    };

    //method toggle
    const toggleModalSave = () => {
        setModalSave(!modalSave);
    };

    //method handle
    const handleAddDataTb = () => {
        const validationError = {};
        if (valuesRow.ten === '') {
            validationError.ten = 'Is Required!';
        }

        if (valuesRow.count_max === 0 || valuesRow.count_max === '') {
            validationError.count_max = 'Is Required!';
        }

        if (valuesRow.count_min === 0 || valuesRow.count_min === '') {
            validationError.count_min = 'Is Required!';
        }
        if (valuesRow.dvt === '') {
            validationError.dvt = 'Is Required!';
        }
        if (valuesRow.sl_tong === 0 || valuesRow.sl_tong === '') {
            validationError.sl_tong = 'Is Required!';
        }
        if (valuesRow.gianhap_chuaqd === 0 || valuesRow.gianhap_chuaqd === '') {
            validationError.gianhap_chuaqd = 'Is Required!';
        }
        if (valuesRow.gianhap_daqd === 0 || valuesRow.gianhap_daqd === '') {
            validationError.gianhap_daqd = 'Is Required!';
        }
        if (valuesRow.giaban_daqd === 0 || valuesRow.giaban_daqd === '') {
            validationError.giaban_daqd = 'Is Required!';
        }
        if (valuesRow.thanh_tien === 0 || valuesRow.thanh_tien === '') {
            validationError.thanh_tien = 'Is Required!';
        }

        setErrors(validationError);

        if (Object.keys(validationError).length === 0) {
            setDataTb([...dataTb, valuesRow]);
            setSearchInput('');
            setValuesRow({
                med_id: '',
                ten: '',
                dong_goi: '',
                count_max: '',
                count_medium: '',
                count_min: '',
                sl_tong: '',
                dvt: '',
                gianhap_chuaqd: '',
                gianhap_daqd: '',
                giaban_daqd: '',
                thanh_tien: '',
                ck: '',
                vat: '',
                han_dung: '',
                so_lo: '',
            });
        }
    };

    const handleRemoveDataTb = (ten) => {
        const updateDataTb = dataTb.filter((med) => med.ten !== ten);
        setDataTb(updateDataTb);
    };

    const handleSaveDetails = () => {
        axios
            .post('http://localhost:8081/warehouse/import/details/create', dataTb)
            .then((res) => {
                setModalSave(false);
            })
            .catch((e) => console.log(e));
    };

    const handleCreateIptCp = () => {
        if (dataTb.length > 0) {
            axios
                .post('http://localhost:8081/warehouse/import/list/create', dataTb)
                .then((res) => {
                    handleSaveDetails();
                    setModalSave(false);
                })
                .catch((e) => console.log(e));
        } else setModalSave(false);
    };

    //call API
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
        axios
            .get('http://localhost:8081/category/supplier')
            .then((res) => setDataSup(res.data))
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Lập hóa đơn nhập kho</DirectionHeader>
                <div className={cx('search-cpn')}>
                    <SearchInput
                        dataInputValue={searchInput}
                        dataSearchResult={searchResult}
                        methodOnchangeInput={handleOnchangeInput}
                        methodSelectedResult={handleSelected}
                        classWidth={'search-resultIpt'}
                    />
                </div>
            </div>
            <div className={cx('import-if')}>
                {inputsDetail.map((input) => (
                    <div key={input.id} className={cx('if-details')}>
                        <label>{input.placeholder}</label>
                        <input
                            className={cx('import-input')}
                            name={input.name}
                            type={input.type}
                            value={valuesRow[input.name]}
                            onChange={onChangeInputs}
                        />
                        {errors[input.name] && <span className={cx('error-mess')}>{errors[input.name]}</span>}
                    </div>
                ))}
                <button className={cx('btn', 'import-addBtn')} onClick={handleAddDataTb}>
                    Thêm
                </button>
            </div>

            {modalSave && (
                <ModalAll
                    methodToggle={toggleModalSave}
                    methodHandle={handleCreateIptCp}
                    data={dataTb}
                    label={'Lưu lại hóa đơn?'}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('table-content')}>
                    <IptDetailTb data={dataTb} method={handleRemoveDataTb} />
                </div>
                <div className={cx('btn-desc')}>
                    <select className={cx('btn-select')}>
                        {dataSup.map((sup) => (
                            <option key={sup.ID}>{sup.Name}</option>
                        ))}
                    </select>
                    <button className={cx('btn', 'btn-confirm')} onClick={toggleModalSave}>
                        Lưu lại
                    </button>
                    <button className={cx('btn', 'btn-confirm')}>Danh sách</button>
                </div>
            </div>
        </div>
    );
}

export default CreateInvoiceIpt;
