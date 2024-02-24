import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './SellInvoiceCreate.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import { useCallback, useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import SearchInput from '~/components/Search/SearchInput';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/apiServices/searchServices';
import FormatInput from '~/components/format/FormatInput';
import ModalAll from '~/components/ModalPage/ModalAll';
import { useNavigate } from 'react-router-dom';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function SellInvoiceCreate() {
    const dateCurr = new Date();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [valueInvoice, setValueInvoice] = useState({ ck: 0, khach_tra: 0 });

    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [dataInvoice, setDataInvoice] = useState([]);

    const debounced = useDebounce(nameSearchInput, 500);

    const [modalSave, setModalSave] = useState(false);
    const [modalSaveExport, setModalSaveExport] = useState(false);

    axios.defaults.withCredentials = true;

    //method toggle
    const toggleModalSave = () => {
        setModalSave(!modalSave);
    };

    const toggleModalSaveExport = () => {
        setModalSaveExport(!modalSaveExport);
    };

    //method onchange and select

    const onchangInvoice = (value, name) => {
        setValueInvoice({
            ...valueInvoice,
            [name]: value,
        });
    };

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const handleSelectedMedicine = (medicine) => {
        console.log(medicine);
        if (medicine.sl_tong - medicine.so_luong_ban - medicine.so_luong_xuat > 0) {
            setDataInvoice([
                ...dataInvoice,
                {
                    med_id: medicine.med_id,
                    ten_duoc: medicine.ten,
                    sl_dvl: '',
                    sl_dvn: '',
                    dvl: medicine.dong_goi,
                    dvqd_nn: medicine.soluong_nho,
                    sl_tong: '',
                    gia_ban: medicine.giaban_daqd,
                    thanh_tien: '',
                    donvinho: medicine.dvt,
                    so_lo_hang: medicine.so_lo,
                    ipt_detail_id: medicine.id,
                },
            ]);
            setNameSearchInput('');
        } else {
            toast.notify('Không còn thuốc trong kho', 'error');
        }
    };

    const onchangeFormatInput = (e, index, prop) => {
        let temp = [...dataInvoice];

        temp[index][prop] = e;
        if (temp[index].sl_dvl && temp[index].sl_dvn) {
            temp[index].sl_tong = temp[index].sl_dvl * temp[index].dvqd_nn + parseInt(temp[index].sl_dvn);
        } else if (temp[index].sl_dvl && !temp[index].sl_dvn) {
            temp[index].sl_tong = temp[index].sl_dvl * temp[index].dvqd_nn;
        } else if (!temp[index].sl_dvl && temp[index].sl_dvn) {
            temp[index].sl_tong = temp[index].sl_dvn;
        } else temp[index].sl_tong = 0;

        temp[index].thanh_tien = temp[index].sl_tong * temp[index].gia_ban;

        setDataInvoice([...temp]);
    };

    //method handle
    const handleRemoveData = (index) => {
        let temp = [...dataInvoice];
        let arr = temp.filter((item, index1) => index1 !== index);
        setDataInvoice([...arr]);
    };

    const handleSaveIv = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        if (dataInvoice.length > 0) {
            axios
                .get(`${baseUrl}sell/getmaxid`)
                .then((res) => {
                    let newId = 1;
                    if (res.data[0].max_id) {
                        newId = res.data[0].max_id + 1;
                    }

                    axios
                        .post(`${baseUrl}sell/ivcreate`, {
                            user_id: user.userId,
                            tong_tien_hang: tong_giatri,
                            ck: valueInvoice.ck,
                            tong_ck: tong_ck,
                            tong_phai_tra: valueInvoice.tong_phai_tra,
                            khach_tra: valueInvoice.khach_tra,
                            tien_du: tien_du,
                            newId: newId,
                        })
                        .then((res1) => {
                            const ma_hoa_don = newId;
                            axios
                                .post(`${baseUrl}sell/ivdetail/create`, {
                                    dataInvoice: dataInvoice,
                                    ma_hoa_don: ma_hoa_don,
                                    branch_id: user.id_chi_nhanh,
                                })
                                .then((res) => {
                                    setModalSave(false);

                                    if (res.data === 'fail') {
                                        toast.notify('Bạn không có quyền thao tác', 'error');
                                    } else {
                                        toast.notify('Tạo thành công', 'success');
                                        setDataInvoice([]);
                                    }
                                })
                                .catch((e) => console.log(e));
                        })
                        .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
        }
    };

    const handleSaveIvExport = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        let invoiceUrl = process.env.REACT_APP_INVOICE_URL;
        axios
            .get(`${baseUrl}sell/getmaxid`)
            .then((res) => {
                const newId = res.data[0].max_id + 1;
                axios
                    .post(`${baseUrl}sell/ivcreate`, {
                        user_id: user.userId,
                        tong_tien_hang: tong_giatri,
                        ck: valueInvoice.ck,
                        tong_ck: tong_ck,
                        tong_phai_tra: tong_phai_tra,
                        khach_tra: valueInvoice.khach_tra,
                        tien_du: tien_du,
                        newId: newId,
                    })
                    .then((res1) => {
                        const ma_hoa_don = newId;
                        axios
                            .post(`${baseUrl}sell/ivdetail/create`, {
                                dataInvoice: dataInvoice,
                                ma_hoa_don: ma_hoa_don,
                                branch_id: user.id_chi_nhanh,
                            })
                            .then((res) => {
                                if (res.data === 'fail') {
                                    toast.notify('Bạn không có quyền thao tác', 'error');
                                } else {
                                    toast.notify('Tạo thành công', 'success');
                                }
                                setModalSaveExport(false);
                                setDataInvoice([]);
                                window.open(`${invoiceUrl}invoice?id=${ma_hoa_don}`);
                            })
                            .catch((e) => console.log(e));
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    };

    //method caculate
    let tong_giatri = useMemo(() => {
        let total = dataInvoice.reduce((result, item) => {
            return result + parseInt(item.thanh_tien);
        }, 0);

        if (total) return total;
    }, [dataInvoice]);

    let tong_phai_tra = useMemo(() => {
        if (valueInvoice.ck) {
            let tong = tong_giatri - (tong_giatri * valueInvoice.ck) / 100;
            return tong;
        } else return tong_giatri;
    }, [valueInvoice.ck, tong_giatri]);

    let tong_ck = useMemo(() => {
        if (valueInvoice.ck) {
            let result = (tong_giatri * valueInvoice.ck) / 100;
            return result;
        } else return 0;
    }, [valueInvoice.ck, tong_giatri]);

    let tien_du = useMemo(() => {
        if (valueInvoice.khach_tra && tong_phai_tra) {
            return valueInvoice.khach_tra - tong_phai_tra;
        } else return 0;
    }, [valueInvoice, tong_phai_tra]);

    const navigate = useNavigate();
    const routeChange = () => {
        let path = `/sell/list`;
        navigate(path);
    };

    //call api

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

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Bán hàng</DirectionHeader>
                <h4 className={cx('header-title')}>Lập hóa đơn</h4>
                <div className={cx('choose-sell')}>
                    <div className={cx('choose-detail')}>
                        <div className={cx('sell-option', 'sell-optionSearch')}>
                            <SearchInput
                                dataInputValue={nameSearchInput}
                                dataSearchResult={searchResult}
                                methodOnchangeInput={handleOnchangeInput}
                                methodSelectedResult={handleSelectedMedicine}
                                classWidth={'search-sellWh'}
                                placeholder="Nhập tên thuốc..."
                            />
                        </div>
                    </div>

                    <div className={cx('btn-action', 'wrap-btnselllist')}>
                        <button className={cx('btn-add', 'btn-selllist')} onClick={routeChange}>
                            Danh sách hóa đơn
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <div className={cx('table-content')}>
                    <table className={cx('table-details')}>
                        <thead>
                            <tr>
                                <th className={cx('th-ten')}>Tên</th>
                                <th className={cx('th-sldvl')}>Số lượng(ĐVL)</th>
                                <th className={cx('th-sldvn')}>Số lượng(ĐVN)</th>
                                <th className={cx('th-dvl')}>Loại</th>
                                <th className={cx('th-tong')}>Tổng</th>
                                <th className={cx('th-giaban')}> Giá bán</th>
                                <th className={cx('th-thanhtien')}> Thành tiền</th>

                                <th className={cx('th-btn')}></th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataInvoice.map((item, index1) => (
                                <tr key={index1}>
                                    {Object.keys(item).map((dataField, index2) => {
                                        if (
                                            dataField !== 'dvqd_nn' &&
                                            dataField !== 'med_id' &&
                                            dataField !== 'donvinho' &&
                                            dataField !== 'so_lo_hang' &&
                                            dataField !== 'ipt_detail_id'
                                        ) {
                                            if (dataField === 'ten_duoc' || dataField === 'dvl') {
                                                return (
                                                    <td key={index2}>
                                                        <input
                                                            className={cx('table-input')}
                                                            name={dataField}
                                                            value={item[dataField]}
                                                            disabled
                                                            type="text"
                                                        />
                                                    </td>
                                                );
                                            } else {
                                                return (
                                                    <td key={index2}>
                                                        <FormatInput
                                                            className={
                                                                dataField === 'sl_dvl' ||
                                                                dataField === 'sl_dvn' ||
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
                                            }
                                        }
                                        return '';
                                    })}
                                    <td>
                                        <button onClick={(e) => handleRemoveData(index1)} className={cx('table-btn')}>
                                            <FontAwesomeIcon icon={faXmark} className={cx('table-icon')} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot className="foot-table">
                            <tr className={cx('foot-tr')}>
                                <td colSpan={8} className={cx('')}>
                                    Tổng tiền: {tong_giatri ? Intl.NumberFormat().format(tong_giatri) : 0}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <ToastContainer />

                {modalSave && (
                    <ModalAll label={'Lưu lại hóa đơn ?'} methodToggle={toggleModalSave} methodHandle={handleSaveIv} />
                )}

                {modalSaveExport && (
                    <ModalAll
                        label={'Lưu lại và xuất hóa đơn ?'}
                        methodToggle={toggleModalSaveExport}
                        methodHandle={handleSaveIvExport}
                    />
                )}

                <div className={cx('invoice-sale')}>
                    <div className={cx('invoice-title')}>Hóa đơn</div>

                    <div className={cx('invoice-info')}>
                        <div className={cx('invoice-detail')}>
                            <span>Ngày bán</span>
                            <span>{dateCurr.toLocaleDateString()}</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Nhân viên</span>
                            <span>{user.name}</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tổng tiền</span>
                            <span>{tong_giatri ? Intl.NumberFormat().format(tong_giatri) : 0}</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Chiết khấu(%)</span>
                            <FormatInput
                                className={'invoice-input'}
                                name={'ck'}
                                value={valueInvoice.ck ? valueInvoice.ck : 0}
                                methodOnchange={onchangInvoice}
                            />
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tổng CK</span>
                            <span>{tong_ck ? Intl.NumberFormat().format(tong_ck) : 0}</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tổng phải trả</span>
                            <span>{tong_phai_tra ? Intl.NumberFormat().format(tong_phai_tra) : 0}</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Khách trả</span>
                            <FormatInput
                                className={'invoice-input'}
                                name={'khach_tra'}
                                value={valueInvoice.khach_tra}
                                methodOnchange={onchangInvoice}
                                target={1}
                            />
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tiền dư</span>
                            <span>{Intl.NumberFormat().format(tien_du)}</span>
                        </div>
                    </div>

                    <div className={cx('invoice-action')}>
                        <button className={cx('invoice-btn')} onClick={toggleModalSave}>
                            Lưu hóa đơn
                        </button>
                        <button className={cx('invoice-btn')} onClick={toggleModalSaveExport}>
                            Xuất hóa đơn
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellInvoiceCreate;
