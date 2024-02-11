import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Supplier.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import SupDeletedTb from '~/components/Table/SupDeletedTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalView from '~/components/ModalPage/ModalView';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function SupplierDel() {
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

    const [showModalView, setShowModalView] = useState(false);
    const [showModalHardDel, setShowModaHardDel] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);

    const [idSelected, setIdSelected] = useState();

    const onChangeInputSup = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    //toggle method

    const toggleModalView = (id) => {
        setShowModalView(!showModalView);
        setIdSelected(id);
        const item = dataTb.filter((item) => {
            return item.ID === id;
        });
        setValues(item[0]);
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

    //handleClick method

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

    const handleHardDel = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${baseUrl}category/supplier/harddelete/${id}`)
            .then((res) => {
                loadData();
                setShowModaHardDel(false);
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleRes = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/supplier/restore/${id}`)
            .then((res) => {
                loadData();
                setShowModalRes(false);
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Khôi phục thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleSearch = () => {
        loadData();
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/supplier/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    search_value: valuesSearch,
                    isDeleted: 1,
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
                    <h4 className={cx('header-title')}>Danh sách nhà cung cấp đã xóa</h4>
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

                        <button className={cx('btn-addstaff')} onClick={() => routeChange('/category/supplier')}>
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />

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
                <div className={cx('content-table')}>
                    <SupDeletedTb
                        data={dataTb}
                        method={{ toggleModalHardDel, toggleModalView, toggleModalRes, setSort }}
                    />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default SupplierDel;
