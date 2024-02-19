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

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as toast from '~/utils/toast';

const cx = classNames.bind(style);

function Supplier() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

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

    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'asc' });

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalMultiSofDel, setShowModalMultiSofDel] = useState(false);

    const [idSelected, setIdSelected] = useState();
    const [listSelected, setListSelected] = useState([]);

    axios.defaults.withCredentials = true;

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

    const toggleModalMultiSoftDel = () => {
        setShowModalMultiSofDel(!showModalMultiSofDel);
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

    //handleClick method
    const handleAdd = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${baseUrl}category/supplier/add`, values)
            .then((res) => {
                loadData();
                setShowModalAdd(false);
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Thêm thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/supplier/update/${idSelected}`, values)
            .then((res) => {
                loadData();
                setShowModalView(false);
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Cập nhật thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleSoftDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/supplier/softdelete`, { id: id, user_id: user.userId })
            .then((res) => {
                loadData();
                setShowModalDelete(false);
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleMultiSoftDel = (data) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/supplier/multisoftdelete`, {
                listSelected: listSelected,
                user_id: user.userId,
            })
            .then((res) => {
                setShowModalMultiSofDel(false);
                setListSelected([]);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/supplier/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
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
    }, [startRecord, sort]);

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
                        {(user.role === 'ADM' || user.role === 'STFW' || user.role === 'ADMA') && (
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
                        )}

                        {(user.role === 'ADM' || user.role === 'ADMA') && (
                            <button
                                className={cx('btn-addstaff', 'btn-delete')}
                                onClick={() => routeChange('/category/supplier/deleted')}
                            >
                                Đã xóa
                            </button>
                        )}
                        {listSelected.length > 0 && (
                            <button className={cx('btn-addstaff', 'btn-delMulti')} onClick={toggleModalMultiSoftDel}>
                                Xóa mục đã chọn
                            </button>
                        )}
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

            {showModalMultiSofDel && (
                <ModalAll
                    label={'Xóa các mục đã chọn?'}
                    methodToggle={toggleModalMultiSoftDel}
                    methodHandle={handleMultiSoftDel}
                    data={listSelected}
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
                    role={user.role}
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
                        role={user.role}
                    />
                </div>
            )}

            <ToastContainer />
            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <SupplierTb
                        data={dataTb}
                        method={{ toggleModalSingleDelete, toggleModalView, setSort, setListSelected }}
                        role={user.role}
                    />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Supplier;
