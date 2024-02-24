import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './ImportWh.module.scss';
import classNames from 'classnames/bind';
import useDebounce from '~/hooks/useDebounce';
import SearchInput from '~/components/Search/SearchInput';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import FormatInput from '~/components/format/FormatInput';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function CreateInvoiceIpt() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(searchInput, 500);

    const [dataDetails, setDataDetails] = useState([]);
    const [dataSup, setDataSup] = useState([]);
    const [chooseSup, setChooseSup] = useState('');

    // const [valuesRow, setValuesRow] = useState({
    //     med_id: '',
    //     ten: '',
    //     soluong_lon: '',
    //     soluong_tb: '',
    //     soluong_nho: '',
    //     sl_tong: '',
    //     dvt: '',
    //     dong_goi: '',
    //     gianhap_chuaqd: '',
    //     gianhap_daqd: '',
    //     giaban_daqd: '',
    //     thanh_tien: '',
    //     ck: '',
    //     vat: '',
    //     tong_ck: '',
    //     han_dung: '',
    //     so_lo: '',
    //     ma_ncc: '',
    // });

    const [errors, setErrors] = useState([]);

    const [modalSave, setModalSave] = useState(false);

    axios.defaults.withCredentials = true;

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
        setDataDetails([
            ...dataDetails,
            {
                med_id: data.id,
                ten: data.ten,
                soluong_lon: '',
                soluong_tb: '',
                soluong_nho: '',
                sl_tong: '',
                dvt: data.donvi_nho,
                dvtb: data.donvi_tb,
                dvl: data.donvi_lon,
                dong_goi: data.description_unit,
                gianhap_chuaqd: '',
                gianhap_daqd: '',
                giaban_daqd: '',
                thanh_tien: '',
                ck: '',
                vat: '',
                tong_ck: '',
                han_dung: '',
                so_lo: '',
                ma_ncc: chooseSup,
            },
        ]);
    };

    const handleAddDetail = (e) => {
        if (e.code === 'Enter' && searchInput.trim()) {
            setSearchInput('');
            setDataDetails([
                ...dataDetails,
                {
                    med_id: null,
                    ten: searchInput,
                    soluong_lon: '',
                    soluong_tb: '',
                    soluong_nho: '',
                    sl_tong: '',
                    dvt: '',
                    dvtb: '',
                    dvl: '',
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
                    ma_ncc: chooseSup,
                },
            ]);
        }
    };

    const onchangeInputs = (e, index, prop) => {
        let temp = [...dataDetails];
        temp[index][prop] = e.target.value;
        if (temp[index].soluong_lon && temp[index].soluong_nho) {
            temp[index].sl_tong = temp[index].soluong_nho * temp[index].soluong_lon;
        }

        if (temp[index].gianhap_chuaqd && temp[index].soluong_nho) {
            temp[index].gianhap_daqd = temp[index].gianhap_chuaqd / temp[index].soluong_nho;
        }

        if (temp[index].soluong_lon && temp[index].gianhap_chuaqd) {
            temp[index].thanh_tien = temp[index].gianhap_chuaqd * temp[index].soluong_lon;
        }

        setDataDetails([...temp]);
    };

    const onchangeFormatInput = (e, index, prop) => {
        let temp = [...dataDetails];

        temp[index][prop] = e;

        if (temp[index].soluong_lon && temp[index].soluong_nho) {
            temp[index].sl_tong = temp[index].soluong_nho * temp[index].soluong_lon;

            // temp[index].dong_goi = `${temp[index].dvl ? temp[index].dvl + ' x ' : ''}${
            //     temp[index].dvtb && temp[index].soluong_tb && temp[index].soluong_tb !== '0'
            //         ? `${temp[index].soluong_tb} ${temp[index].dvtb} x ${
            //               temp[index].soluong_nho / temp[index].soluong_tb
            //           } ${temp[index].dvt}`
            //         : `${temp[index].dvl && temp[index].soluong_nho + ' '}${temp[index].dvt}`
            // }`;
        }

        if (temp[index].gianhap_chuaqd && temp[index].soluong_nho) {
            temp[index].gianhap_daqd = temp[index].gianhap_chuaqd / temp[index].soluong_nho;
        }

        if (temp[index].soluong_lon && temp[index].gianhap_chuaqd) {
            temp[index].thanh_tien = temp[index].gianhap_chuaqd * temp[index].soluong_lon;
        }

        setDataDetails([...temp]);
    };

    const tong_vat = useMemo(() => {
        const result = dataDetails.reduce((result, item) => {
            if (item.vat) {
                let a = (item.thanh_tien * item.vat) / 100;
                return result + a;
            } else return result;
        }, 0);
        return result;
    }, [dataDetails]);

    const tong_ck = useMemo(() => {
        const result = dataDetails.reduce((result, item) => {
            if (item.ck) {
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

        return total - tong_ck + tong_vat;
    }, [dataDetails, tong_ck, tong_vat]);

    const handleRemoveData = (data, index) => {
        let temp = [...dataDetails];
        let arr = temp.filter((item, index1) => index1 !== index);
        setDataDetails([...arr]);
    };

    //method handle

    const handleValidate = () => {
        let arr = [];
        for (let i = 0; i < dataDetails.length; i++) {
            const validationError = {};
            // if (!dataDetails[i].soluong_lon) {
            //     validationError.soluong_lon = 'Is Required';
            // }
            if (
                dataDetails[i].sl_tong === '' ||
                dataDetails[i].sl_tong === '0' ||
                dataDetails[i].sl_tong === 0 ||
                dataDetails[i].sl_tong === undefined
            ) {
                validationError.sl_tong = 'Is Required';
            }

            if (!dataDetails[i].soluong_nho) {
                validationError.soluong_nho = 'Is Required';
            }

            if (!dataDetails[i].gianhap_chuaqd) {
                validationError.gianhap_chuaqd = 'Is Required';
            }

            if (!dataDetails[i].han_dung) {
                validationError.han_dung = 'Is Required';
            }

            if (!dataDetails[i].ma_ncc) {
                validationError.ma_ncc = 'Is Required';
            }

            arr.push(validationError);
        }
        setErrors(arr);

        let valid = arr.every((item) => {
            return Object.keys(item).length === 0;
        });

        if (valid) {
            toggleModalSave();
        }
    };

    const handleCreatedCp = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}importlist/getmaxid`)
            .then((res) => {
                let newId;
                if (res.data[0].max_id) {
                    newId = res.data[0].max_id + 1;
                } else newId = 1;
                const userId = user.userId;
                axios
                    .post(`${baseUrl}importlist/create`, { dataDetails, total, tong_ck, tong_vat, newId, userId })
                    .then((res1) => {
                        const invoice_code = newId;
                        axios
                            .post(`${baseUrl}importlist/createdetail`, {
                                dataDetails: dataDetails,
                                invoice_code: invoice_code,
                                branch_id: JSON.parse(localStorage.getItem('data_user')).id_chi_nhanh,
                            })
                            .then((res) => {
                                setModalSave(false);
                                setDataDetails([]);
                                if (res.data === 'fail') {
                                    toast.notify('Bạn không có quyền thao tác', 'error');
                                } else {
                                    toast.notify('Tạo phiếu thành công', 'success');
                                }
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
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/supplierall`)
            .then((res) => setDataSup(res.data))
            .catch((e) => console.log(e));
    }, []);

    if (user.role === 'ADM' || user.role === 'STFW') {
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
                            methodHandleSearch={handleAddDetail}
                            classWidth={'search-resultIpt'}
                        />
                    </div>
                </div>
                <ToastContainer />

                {modalSave && dataDetails.length > 0 && (
                    <ModalAll
                        methodToggle={toggleModalSave}
                        methodHandle={handleCreatedCp}
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
                                        <th className={cx('th-sl')}>Số lượng nhập(1ĐV)</th>
                                        <th className={cx('th-sltb')}>Quy đổi 1(/1ĐV)</th>
                                        <th className={cx('th-slnn')}>Quy đổi 2(/1ĐV)</th>
                                        <th className={cx('th-tn')}>Tổng nhập</th>
                                        <th className={cx('th-dvt')}>Đơn vị tính</th>
                                        <th className={cx('th-donggoi')}>Đóng gói</th>
                                        <th className={cx('th-gia')}>Giá nhập(chưa Qđ)</th>
                                        <th className={cx('th-gia')}>Giá nhập(đã Qđ)</th>
                                        <th className={cx('th-gia')}>Giá bán(đã Qđ)</th>
                                        <th className={cx('th-gia')}>Thành tiền</th>
                                        <th className={cx('th-ckvat')}>CK(%)</th>
                                        <th className={cx('th-ckvat')}>VAT(%)</th>
                                        <th className={cx('th-handung')}>Hạn dùng</th>
                                        <th className={cx('th-solo')}>Số lô</th>
                                        <th className={cx('th-btn')}></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dataDetails.map((item, index1) => (
                                        <tr key={index1}>
                                            {Object.keys(item).map((dataField, index2) => {
                                                if (dataField === 'han_dung') {
                                                    return (
                                                        <td key={index2}>
                                                            <input
                                                                className={cx('table-input')}
                                                                name={dataField}
                                                                onChange={(e) => onchangeInputs(e, index1, dataField)}
                                                                onBlur={(e) => onchangeInputs(e, index1, dataField)}
                                                                value={item[dataField]}
                                                                type="date"
                                                            />
                                                        </td>
                                                    );
                                                }
                                                if (
                                                    dataField !== 'med_id' &&
                                                    dataField !== 'tong_ck' &&
                                                    dataField !== 'ma_ncc' &&
                                                    dataField !== 'dvtb' &&
                                                    dataField !== 'dvl'
                                                ) {
                                                    if (
                                                        dataField !== 'ten' &&
                                                        dataField !== 'dvt' &&
                                                        dataField !== 'dong_goi' &&
                                                        dataField !== 'han_dung' &&
                                                        dataField !== 'so_lo'
                                                    ) {
                                                        return (
                                                            <td key={index2}>
                                                                <FormatInput
                                                                    className={
                                                                        dataField === 'soluong_lon' ||
                                                                        dataField === 'soluong_tb' ||
                                                                        dataField === 'soluong_nho' ||
                                                                        dataField === 'sl_tong'
                                                                            ? 'format-sl'
                                                                            : 'format-price'
                                                                    }
                                                                    name={dataField}
                                                                    value={item[dataField]}
                                                                    methodOnchange={(e) =>
                                                                        onchangeFormatInput(e, index1, dataField)
                                                                    }
                                                                />
                                                            </td>
                                                        );
                                                    } else {
                                                        return (
                                                            <td key={index2}>
                                                                <input
                                                                    className={cx('table-input')}
                                                                    name={dataField}
                                                                    onChange={(e) =>
                                                                        onchangeInputs(e, index1, dataField)
                                                                    }
                                                                    onBlur={(e) => onchangeInputs(e, index1, dataField)}
                                                                    value={item[dataField]}
                                                                    type="text"
                                                                />
                                                            </td>
                                                        );
                                                    }
                                                }
                                                return '';
                                            })}
                                            <td>
                                                <button
                                                    onClick={(e) => handleRemoveData(item, index1)}
                                                    className={cx('table-btn')}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} className={cx('table-icon')} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="foot-table">
                                    <tr className={cx('foot-tr')}>
                                        <td colSpan={13} className={cx('')}>
                                            Tổng giá trị:{' '}
                                            {Intl.NumberFormat().format(total + tong_ck - tong_vat)
                                                ? Intl.NumberFormat().format(total + tong_ck - tong_vat)
                                                : 0}
                                        </td>
                                    </tr>
                                    <tr className={cx('foot-tr')}>
                                        <td colSpan={13} className={cx('foot-ck')}>
                                            Tổng CK:{' '}
                                            {Intl.NumberFormat().format(tong_ck)
                                                ? Intl.NumberFormat().format(tong_ck)
                                                : 0}
                                        </td>
                                    </tr>
                                    <tr className={cx('foot-tr')}>
                                        <td colSpan={13} className={cx('')}>
                                            Tổng VAT:{' '}
                                            {Intl.NumberFormat().format(tong_vat)
                                                ? Intl.NumberFormat().format(tong_vat)
                                                : 0}
                                        </td>
                                    </tr>
                                    <tr className={cx('foot-tr')}>
                                        <td className={cx('foot-total')}>
                                            Tổng tiền:{' '}
                                            {Intl.NumberFormat().format(total) ? Intl.NumberFormat().format(total) : 0}
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
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

                    <button className={cx('btn', 'btn-confirm')} onClick={handleValidate}>
                        Lưu lại
                    </button>

                    <button className={cx('btn', 'btn-confirm')} onClick={() => routeChange('/warehouse/importlist')}>
                        Danh sách
                    </button>
                </div>
            </div>
        );
    } else return <div>Bạn không có quyền thao tác!!</div>;
}

export default CreateInvoiceIpt;
