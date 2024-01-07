import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Supplier.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SupplierTb from '~/components/Table/SupplierTb';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import * as supplierServices from '~/apiServices/supplierServices';
import SupDeletedTb from '~/components/Table/SupDeletedTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalView from '~/components/ModalPage/ModalView';
import ModalAdd from '~/components/ModalPage/ModalAdd';

const cx = classNames.bind(style);

function Supplier() {
    const [dataSup, setDataSup] = useState([]);
    const [dataSupCurr, setDataSupCurr] = useState([]);
    const [dataSupDel, setDataSupDel] = useState([]);

    const [dataTb, setDataTb] = useState([]);
    const [dataTbDel, setDataTbDel] = useState([]);

    const [stateBin, setStateBin] = useState(false);

    const [values, setValues] = useState({
        Name: '',
        PhoneNumber: '',
        Email: '',
        Address: '',
        personRepresent: '',
        TaxCode: '',
    });

    const inputsSupplier = [
        {
            id: 1,
            label: 'Tên nhà cung cấp',
            name: 'Name',
            type: 'text',
            placeholder: 'Tên nhà cung cấp',
        },
        {
            id: 2,
            label: 'Số điện thoại',
            name: 'PhoneNumber',
            type: 'text',
            placeholder: 'Số điện thoại',
        },
        {
            id: 3,
            label: 'Email',
            name: 'Email',
            type: 'email',
            placeholder: 'Email',
        },
        {
            id: 4,
            label: 'Địa chỉ',
            name: 'Address',
            type: 'text',
            placeholder: 'Địa chỉ',
        },
        {
            id: 5,
            label: 'Người dại diện',
            name: 'personRepresent',
            type: 'text',
            placeholder: 'Người dại diện',
        },
        {
            id: 6,
            label: 'Mã số thuế',
            name: 'TaxCode',
            type: 'text',
            placeholder: 'Mã số thuế',
        },
    ];

    const [valuesSearch, setValuesSearch] = useState('');

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalHardDel, setShowModaHardDel] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);

    const [idSelected, setIdSelected] = useState();
    const [supSelected, setSupSelected] = useState([]);

    const onChangeInputSup = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const loadData = () => {
        const fetchApi = async () => {
            const data = await supplierServices.getAll();
            if (data) {
                const dataCurr = data.filter((item) => item.isDeleted !== 1);
                const dataDeleted = data.filter((item) => item.isDeleted === 1);

                setDataSup(data);
                setDataSupCurr(dataCurr);
                setDataSupDel(dataDeleted);
                setDataTb(dataCurr);
                setDataTbDel(dataDeleted);
            }
        };
        fetchApi();
    };

    //toggle method
    const toggleModalSingleDelete = (id) => {
        setShowModalDelete(!showModalDelete);
        setIdSelected(id);
    };
    const toggleModalView = (id) => {
        setShowModalView(!showModalView);
        setIdSelected(id);
        const item = dataSup.filter((item) => {
            return item.ID === id;
        });
        setValues(item[0]);
    };

    const toggleModalAdd = () => {
        setValues({
            Name: '',
            PhoneNumber: '',
            Email: '',
            Address: '',
            personRepresent: '',
            TaxCode: '',
        });
        setShowModalAdd(!showModalAdd);
    };

    const toggleModalHardDel = useCallback(
        (id) => {
            setShowModaHardDel(!showModalHardDel);
            setIdSelected(id);
        },
        [showModalHardDel],
    );

    const toggleModalRes = useCallback(
        (id) => {
            setShowModalRes(!showModalRes);
            setIdSelected(id);
        },
        [showModalRes],
    );

    const toggleBtnBin = () => {
        setStateBin(!stateBin);
    };

    //handleClick method
    const handleAdd = () => {
        axios
            .post('http://localhost:8081/category/supplier/add', values)
            .then((res) => {
                loadData();
                setShowModalAdd(false);
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = () => {
        axios
            .put(`http://localhost:8081/category/supplier/update/${idSelected}`, values)
            .then((res) => {
                loadData();
                setShowModalView(false);
            })
            .catch((e) => console.log(e));
    };

    const handleSoftDel = (id) => {
        axios
            .put(`http://localhost:8081/category/supplier/softdelete/${id}`)
            .then((res) => {
                loadData();
                setShowModalDelete(false);
            })
            .catch((e) => console.log(e));
    };

    const handleHardDel = (id) => {
        axios
            .delete(`http://localhost:8081/category/supplier/harddelete/${id}`)
            .then((res) => {
                loadData();
                setShowModaHardDel(false);
            })
            .catch((e) => console.log(e));
    };

    const handleRes = (id) => {
        axios
            .put(`http://localhost:8081/category/supplier/restore/${id}`)
            .then((res) => {
                loadData();
                setShowModalRes(false);
            })
            .catch((e) => console.log(e));
    };

    const handleFilter = () => {
        if (stateBin) {
            if (valuesSearch.length) {
                const arr = dataSupDel.filter((sup) => {
                    return sup.ten_ncc.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
                });
                setDataTbDel(arr);
            } else {
                setDataTbDel(dataSupDel);
            }
        } else {
            if (valuesSearch.length) {
                const arr = dataSupCurr.filter((sup) => {
                    return sup.ten_ncc.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
                });
                setDataTb(arr);
            } else {
                setDataTb(dataSupCurr);
            }
        }
    };

    console.log(dataSupCurr);
    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleFilter();
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách nhà cung cấp</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo SĐT, Email, ..."
                                onChange={onChangeInputSearch}
                                onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')} onClick={handleFilter}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button
                            className={cx('btn-addstaff')}
                            onClick={() => {
                                setShowModalAdd(true);
                                setValues({
                                    Name: '',
                                    PhoneNumber: '',
                                    Email: '',
                                    Address: '',
                                    personRepresent: '',
                                    TaxCode: '',
                                });
                            }}
                        >
                            Thêm
                        </button>
                        <button className={cx('btn-addstaff')}>Nhập excel</button>
                        <button className={cx('btn-addstaff')} onClick={toggleBtnBin}>
                            {stateBin ? 'Trở lại' : 'Bin'}
                        </button>
                    </div>
                </div>
            </div>
            {showModalDelete && (
                <ModalAll
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSingleDelete}
                    methodHandle={handleSoftDel}
                    data={idSelected}
                />
            )}

            {showModalHardDel && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleHardDel}
                    data={idSelected}
                />
            )}

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
                    methodToggle={toggleModalRes}
                    methodHandle={handleRes}
                    data={idSelected}
                />
            )}

            {showModalAdd && (
                <ModalAdd
                    label={'Thêm mới nhà cung cấp'}
                    dataInputs={inputsSupplier}
                    dataValueInputs={values}
                    methodOnchange={onChangeInputSup}
                    methodToggle={toggleModalAdd}
                    methodHandle={handleAdd}
                />
            )}

            {showModalView && (
                <ModalView
                    label={'Thông tin chi tiết'}
                    dataInputs={inputsSupplier}
                    dataValueInputs={values}
                    methodOnchange={onChangeInputSup}
                    methodToggle={toggleModalView}
                    methodHandle={handleUpdate}
                />
            )}
            <div className={cx('main-content')}>
                {stateBin ? (
                    <SupDeletedTb data={dataTbDel} method={{ toggleModalHardDel, toggleModalView, toggleModalRes }} />
                ) : (
                    <SupplierTb data={dataTb} method={{ toggleModalSingleDelete, toggleModalView }} />
                )}
            </div>
        </div>
    );
}

export default Supplier;
