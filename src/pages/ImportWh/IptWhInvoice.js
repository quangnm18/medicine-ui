import { useState, useEffect, Fragment, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './ImportWh.module.scss';
import classNames from 'classnames/bind';
import useDebounce from '~/hooks/useDebounce';
import SearchInput from '~/components/Search/SearchInput';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import axios from 'axios';

const cx = classNames.bind(style);

function CreateInvoiceIpt() {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(searchInput, 500);

    const [dataDetails, setDataDetails] = useState([]);
    const [dataSup, setDataSup] = useState([]);
    const [chooseSup, setChooseSup] = useState(-1);

    const [valuesRow, setValuesRow] = useState({
        ten: '',
        soluong_lon: '',
        soluong_tb: '',
        soluong_nho: '',
        sl_tong: '',
        dvt: '',
        dong_goi: '',
        gianhap_chuaqd: '',
        gianhap_daqd: '',
        giaban_daqd: '',
        thanh_tien: '',
        ck: '',
        vat: '',
        tong_ck: '',
        han_dung: '',
        so_lo: '',
        ma_ncc: '',
    });

    const [errors, setErrors] = useState([]);

    const [modalSave, setModalSave] = useState(false);

    //method toggle
    const toggleModalSave = () => {
        setModalSave(!modalSave);
    };

    //method set data
    const onchangeSelect = (e) => {
        setChooseSup(e.target.value);
        for (let i = 0; i < dataDetails.length; i++) {
            dataDetails[i].ma_ncc = e.target.value;
        }
    };

    const onchangeSearch = (value) => {
        setSearchInput(value);
    };

    const handleSelectedResult = (data) => {
        setSearchInput('');
        setValuesRow({
            ...valuesRow,
            dong_goi: data.description_unit,
            dvt: data.donvi_nho,
            ten: data.ten,
        });

        setDataDetails([
            ...dataDetails,
            {
                ...valuesRow,
                dong_goi: data.description_unit,
                dvt: data.donvi_nho,
                ten: data.ten,
            },
        ]);
    };

    const onchangeInputs = (e, index, prop) => {
        let temp = [...dataDetails];
        temp[index][prop] = e.target.value;
        temp[index].sl_tong = temp[index].soluong_lon * temp[index].soluong_nho;
        temp[index].gianhap_daqd = temp[index].gianhap_chuaqd / temp[index].soluong_nho;
        temp[index].thanh_tien = temp[index].soluong_lon * temp[index].gianhap_chuaqd;
        setDataDetails([...temp]);
    };

    const tong_ck = useMemo(() => {
        const result = dataDetails.reduce((result, item) => {
            if (item.ck && item.vat) {
                let a = (item.thanh_tien * item.ck) / 100;
                let b = (item.thanh_tien * item.vat) / 100;
                return result + a + b;
            } else if (!item.ck && item.vat) {
                let a = (item.thanh_tien * item.vat) / 100;
                return result + a;
            } else if (item.ck && !item.vat) {
                let a = (item.thanh_tien * item.ck) / 100;
                return result + a;
            } else return result;
        }, 0);
        return result;
    }, [dataDetails]);

    const total = useMemo(() => {
        const total = dataDetails.reduce((result, item) => {
            return result + item.thanh_tien;
        }, 0);

        return total + tong_ck;
    }, [dataDetails]);

    const handleRemoveData = (e, data, index) => {
        let temp = [...dataDetails];
        let arr = temp.filter((item, index1) => index1 !== index);
        setDataDetails([...arr]);
    };

    //method handle

    const handleValidate = () => {
        let arr = [];
        for (let i = 0; i < dataDetails.length; i++) {
            const validationError = {};
            if (!dataDetails[i].soluong_lon) {
                validationError.soluong_lon = 'Is Required';
            }
            if (!dataDetails[i].soluong_nho) {
                validationError.soluong_nho = 'Is Required';
            }

            arr.push(validationError);
        }
        setErrors(arr);

        let valid = arr.every((item) => {
            return Object.keys(item).length === 0;
        });

        if (valid) {
            handleCreatedCp();
        }
    };

    const handleCreatedCp = () => {
        axios
            .get('http://localhost:8081/importlist/all')
            .then((res) => {
                const newId = res.data[0].id + 1;
                axios
                    .post('http://localhost:8081/importlist/create', { dataDetails, total, tong_ck, newId })
                    .then((res1) => {
                        const invoice_code = res1.data.id;
                        axios
                            .post('http://localhost:8081/importlist/createdetail', { dataDetails, invoice_code })
                            .then((res) => {
                                setModalSave(false);
                                setDataDetails([]);
                            })
                            .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    };

    //method #
    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
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
                        methodOnchangeInput={onchangeSearch}
                        methodSelectedResult={handleSelectedResult}
                        classWidth={'search-resultIpt'}
                    />
                </div>
            </div>

            {modalSave && (
                <ModalAll
                    methodToggle={toggleModalSave}
                    methodHandle={handleValidate}
                    data={dataDetails}
                    label={'Lưu lại hóa đơn?'}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('main-table')}>
                    <div className={cx('table-content')}>
                        <table className={cx('table-details')}>
                            <thead>
                                <tr>
                                    <th className={cx('th-ten')}>Tên</th>
                                    <th className={cx('th-slqdtn')}>Số lượng</th>
                                    <th className={cx('th-slqdtn')}>Quy đổi(ĐVTB)</th>
                                    <th className={cx('th-slqdtn')}>Quy đổi(ĐVNN)</th>
                                    <th className={cx('th-slqdtn')}>Tổng nhập</th>
                                    <th className={cx('th-dvt')}>Đơn vị tính</th>
                                    <th className={cx('th-donggoi')}>Đóng gói</th>
                                    <th className={cx('th-gia')}>Giá nhập(chưa Qđ)</th>
                                    <th className={cx('th-gia')}>Giá nhập(đã Qđ)</th>
                                    <th className={cx('th-gia')}>Giá bán(đã Qđ)</th>
                                    <th className={cx('th-gia')}>Thành tiền</th>
                                    <th className={cx('th-ckvat')}>CK(%)</th>
                                    <th className={cx('th-ckvat')}>VAT(%)</th>
                                    <th className={cx('th-handunglo')}>Hạn dùng</th>
                                    <th className={cx('th-handunglo')}>Số lô</th>
                                    <th className={cx('th-btn')}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataDetails.map((item, index1) => (
                                    <tr key={index1}>
                                        {Object.keys(item).map((dataField, index2) => (
                                            <td key={index2}>
                                                <input
                                                    className={cx('table-input')}
                                                    name={dataField}
                                                    onChange={(e) => onchangeInputs(e, index1, dataField)}
                                                    onBlur={(e) => onchangeInputs(e, index1, dataField)}
                                                    value={item[dataField]}
                                                />
                                            </td>
                                        ))}
                                        <td>
                                            <button
                                                className={cx('table-btn', 'btn-search')}
                                                onClick={(e) => handleRemoveData(e, item, index1)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot className="foot-table">
                                <tr className={cx('foot-tr')}>
                                    <td colSpan={13} className={cx('')}>
                                        Tổng CK: {tong_ck}
                                    </td>
                                </tr>
                                <tr className={cx('foot-tr')}>
                                    <td className={cx('')}>Tổng tiền: {total}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>

                <div className={cx('btn-desc')}>
                    <select className={cx('btn-select')} onChange={onchangeSelect}>
                        <option>Chọn nhà cung cấp</option>
                        {dataSup.map((sup) => (
                            <option key={sup.ID} value={sup.ID}>
                                {sup.ten_ncc}
                            </option>
                        ))}
                    </select>
                    <button className={cx('btn', 'btn-confirm')} onClick={toggleModalSave}>
                        Lưu lại
                    </button>
                    <button className={cx('btn', 'btn-confirm')} onClick={() => routeChange('/importlist')}>
                        Danh sách
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateInvoiceIpt;
