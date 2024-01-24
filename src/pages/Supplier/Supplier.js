import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Supplier.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import SupplierTb from '~/components/Table/SupplierTb';
import { useEffect, useState } from 'react';

import axios from 'axios';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalView from '~/components/ModalPage/ModalView';
import ModalAdd from '~/components/ModalPage/ModalAdd';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Supplier() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const [dataTb, setDataTb] = useState([]);

    const [values, setValues] = useState({
        ten_ncc: '',
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
            name: 'ten_ncc',
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

    const [idSelected, setIdSelected] = useState();

    const onChangeInputSup = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //toggle method
    const toggleModalSingleDelete = (id) => {
        setShowModalDelete(!showModalDelete);
        setIdSelected(id);
    };
    const toggleModalView = (id) => {
        setShowModalView(!showModalView);
        setIdSelected(id);
        const item = dataTb.filter((item) => {
            return item.ID === id;
        });
        setValues({ ...item[0] });
    };

    const toggleModalAdd = () => {
        setValues({
            ten_ncc: '',
            PhoneNumber: '',
            Email: '',
            Address: '',
            personRepresent: '',
            TaxCode: '',
        });
        setShowModalAdd(!showModalAdd);
    };

    const notify = () => {
        toast.success('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
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
                notify();
                setShowModalDelete(false);
            })
            .catch((e) => console.log(e));
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const loadData = () => {
        axios
            .get('http://localhost:8081/category/supplier/', {
                params: {
                    search_value: valuesSearch,
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
    }, [startRecord]);

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
                            <button className={cx('search-btn')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button
                            className={cx('btn-addstaff')}
                            onClick={() => {
                                setShowModalAdd(true);
                                setValues({
                                    ten_ncc: '',
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
                        <button
                            className={cx('btn-addstaff')}
                            onClick={() => routeChange('/category/supplier/deleted')}
                        >
                            Đã xóa
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
                <div className={cx('modal-viewclose')}>
                    <ModalView
                        label={'Thông tin chi tiết'}
                        dataInputs={inputsSupplier}
                        dataValueInputs={values}
                        methodOnchange={onChangeInputSup}
                        methodToggle={toggleModalView}
                        methodHandle={handleUpdate}
                    />
                </div>
            )}

            <ToastContainer />
            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <SupplierTb data={dataTb} method={{ toggleModalSingleDelete, toggleModalView }} />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Supplier;
