import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './CreateExpCp.module.scss';
import classNames from 'classnames/bind';
import useDebounce from '~/hooks/useDebounce';
import SearchInput from '~/components/Search/SearchInput';
import * as searchServices from '~/apiServices/searchServices';
import ModalAll from '~/components/ModalPage/ModalAll';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import FormatInput from '~/components/format/FormatInput';
import * as format from '~/utils/format';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function CreateExpCp() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const debounced = useDebounce(searchInput, 500);

    const [dataDetails, setDataDetails] = useState([]);
    const [dataSup, setDataSup] = useState([]);
    const [chooseSup, setChooseSup] = useState('');

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
            dataDetails[i].sendTo = e.target.value;
        }
    };

    const onchangeSearch = (value) => {
        setSearchInput(value);
    };

    const handleSelectedResult = (data) => {
        if (data.sl_tong - data.so_luong_ban - data.so_luong_xuat > 0) {
            setDataDetails([
                ...dataDetails,
                {
                    ten: data.ten,
                    sl_dvl: '',
                    quydoi_dvn: data.soluong_nho,
                    sl_tongxuat: '',
                    dvt: data.donvi_nho,
                    dong_goi: data.dong_goi,
                    don_gia_nhap: data.gianhap_chuaqd,
                    tong_gia_tri: '',
                    han_dung: format.formatDate(data.han_dung),
                    so_lo: data.so_lo,
                    sendTo: chooseSup,
                    importDetailId: data.id,
                },
            ]);
            setSearchInput('');
        } else {
            toast.notify('Không còn thuốc trong kho', 'error');
        }
    };

    const onchangeInputs = (e, index, prop) => {
        let temp = [...dataDetails];
        temp[index][prop] = e.target.value;
        if (temp[index].sl_dvl && temp[index].quydoi_dvn) {
            temp[index].sl_tongxuat = temp[index].quydoi_dvn * temp[index].sl_dvl;
        }

        if (temp[index].gianhap_chuaqd && temp[index].quydoi_dvn) {
            temp[index].gianhap_daqd = temp[index].gianhap_chuaqd / temp[index].quydoi_dvn;
        }

        if (temp[index].sl_dvl && temp[index].gianhap_chuaqd) {
            temp[index].thanh_tien = temp[index].gianhap_chuaqd * temp[index].sl_dvl;
        }
        setDataDetails([...temp]);
    };

    const onchangeFormatInput = (e, index, prop) => {
        let temp = [...dataDetails];

        temp[index][prop] = e;

        if (temp[index].sl_dvl && temp[index].quydoi_dvn) {
            temp[index].sl_tongxuat = temp[index].quydoi_dvn * temp[index].sl_dvl;
        }

        if (temp[index].sl_dvl && temp[index].don_gia_nhap) {
            temp[index].tong_gia_tri = temp[index].don_gia_nhap * temp[index].sl_dvl;
        }
        setDataDetails([...temp]);
    };

    // const tong_vat = useMemo(() => {
    //     const result = dataDetails.reduce((result, item) => {
    //         if (item.vat) {
    //             let a = (item.thanh_tien * item.vat) / 100;
    //             return result + a;
    //         } else return result;
    //     }, 0);
    //     return result;
    // }, [dataDetails]);

    // const tong_ck = useMemo(() => {
    //     const result = dataDetails.reduce((result, item) => {
    //         if (item.ck) {
    //             let a = (item.thanh_tien * item.ck) / 100;
    //             return result + a;
    //         } else return result;
    //     }, 0);
    //     return result;
    // }, [dataDetails]);

    const total = useMemo(() => {
        const total = dataDetails.reduce((result, item) => {
            return result + item.tong_gia_tri;
        }, 0);

        return total;
    }, [dataDetails]);

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
            if (!dataDetails[i].sl_dvl) {
                validationError.sl_dvl = 'Is Required';
            }
            if (!dataDetails[i].quydoi_dvn) {
                validationError.quydoi_dvn = 'Is Required';
            }

            if (!dataDetails[i].han_dung) {
                validationError.han_dung = 'Is Required';
            }

            if (!dataDetails[i].sendTo) {
                validationError.sendTo = 'Is Required';
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
            .get(`${baseUrl}exportwh/getmaxid`)
            .then((res) => {
                let newId = 1;
                if (res.data[0].max_id) {
                    newId = res.data[0].max_id + 1;
                }
                const userId = user.userId;
                axios
                    .post(`${baseUrl}exportwh/createcp`, { dataDetails, total, newId, userId, chooseSup })
                    .then((res1) => {
                        const invoice_code = newId;
                        axios
                            .post(`${baseUrl}exportwh/createdetail`, {
                                dataDetails: dataDetails,
                                invoice_code: invoice_code,
                                branch_id: user.id_chi_nhanh,
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
            const result = await searchServices.searchWh(user.id_chi_nhanh, debounced);
            setSearchResult(result ? result[0] : []);
        };
        fetchApi();
    }, [debounced, user.id_chi_nhanh]);

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch/`)
            .then((res) => setDataSup(res.data))
            .catch((e) => console.log(e));
    }, []);

    if (user.role === 'ADM' || user.role === 'STFW') {
        return (
            <div className={cx('content')}>
                <div className={cx('header-content')}>
                    <DirectionHeader>Lập hóa đơn xuất kho</DirectionHeader>
                    <div className={cx('search-cpn')}>
                        <SearchInput
                            dataInputValue={searchInput}
                            dataSearchResult={searchResult}
                            methodOnchangeInput={onchangeSearch}
                            methodSelectedResult={handleSelectedResult}
                            classWidth={'search-sellWh'}
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
                                        <th className={cx('th-sl')}>Số lượng(ĐVL)</th>
                                        <th className={cx('th-sl')}>Quy đổi(ĐVNN)</th>
                                        <th className={cx('th-sl')}>Tổng xuất</th>
                                        <th className={cx('th-dvt')}>ĐVT</th>
                                        <th className={cx('th-donggoi')}>Đóng gói</th>
                                        <th className={cx('th-gia')}>Giá nhập(1ĐVL)</th>
                                        <th className={cx('th-gia')}>Thành tiền</th>
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
                                                    dataField !== 'sendTo' &&
                                                    dataField !== 'importDetailId'
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
                                                                        dataField === 'sl_dvl' ||
                                                                        dataField === 'quydoi_dvn' ||
                                                                        dataField === 'sl_tongxuat'
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
                        <option>Chọn điểm đến</option>
                        {dataSup.map((sup) => (
                            <option key={sup.id} value={sup.id}>
                                {sup.name}
                            </option>
                        ))}
                    </select>

                    <button className={cx('btn', 'btn-confirm')} onClick={handleValidate}>
                        Lưu lại
                    </button>

                    <button className={cx('btn', 'btn-confirm')} onClick={() => routeChange('/warehouse/exportlist')}>
                        Danh sách
                    </button>
                </div>
            </div>
        );
    } else return <div>Bạn không có quyền thao tác!!</div>;
}

export default CreateExpCp;
