import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Branchs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '~/components/Pagination/Pagination';
import ModalAll1 from '~/components/ModalPage/ModalAll1';
import BranchListTb from '~/components/Table/BranchListTb';
import ModalAddBranch from '~/components/ModalPage/ModalUnitGr/ModalBranch';

import * as toast from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(style);

function Branch() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));
    const [sort, setSort] = useState({ sort_col: 16, sort_type: 'desc' });

    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState();
    const [numRecord, setNumRecord] = useState(10);

    const [dataTb, setDataTb] = useState([]);
    const [valuesSearch, setValuesSearch] = useState('');
    const [showModalHardDel, setShowModalHardDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [idSelected, setIdSelected] = useState();

    axios.defaults.withCredentials = true;

    const [values, setValues] = useState({});

    const inputsUser = [
        {
            id: 1,
            label: 'Tên chi nhánh',
            name: 'name',
            type: 'text',
            placeholder: '',
        },
        {
            id: 2,
            label: 'Địa chỉ',
            name: 'address',
            type: 'text',
            placeholder: '',
        },
        {
            id: 3,
            label: 'Mã chi nhánh',
            name: 'branch_code',
            type: 'text',
            placeholder: '',
        },
        {
            id: 4,
            label: 'Người đại diện',
            name: 'Name',
            type: 'text',
            placeholder: '',
        },
        {
            id: 5,
            label: 'SĐT',
            name: 'PhoneNumber',
            type: 'number',
            placeholder: '',
        },
        {
            id: 6,
            label: 'Email',
            name: 'Email',
            type: 'text',
            placeholder: '',
        },
    ];

    const inputsUserAdd = [
        {
            id: 1,
            label: 'Tên chi nhánh',
            name: 'name',
            type: 'text',
            placeholder: 'Cơ sở 1',
        },
        {
            id: 2,
            label: 'Địa chỉ',
            name: 'address',
            type: 'text',
            placeholder: 'Đống Đa, Hà Nội,...',
        },
    ];

    const onChangeInputUser = (e) => {
        if (e.target.name === 'Role') {
            setValues({ ...values, [e.target.name]: Number.parseInt(e.target.value) });
        } else if (e.target.name === 'password') {
            setValues({ ...values, [e.target.name]: e.target.value });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const onChangerNum = (e) => {
        setNumRecord(e.target.value);
    };

    const toggleModalHardDel = (id) => {
        setShowModalHardDel(!showModalHardDel);
        setIdSelected(id);
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
        setValues({
            name: data.name,
            address: data.address,
            branch_code: data.branch_code,
            Name: data.ten_quan_ly,
            PhoneNumber: data.PhoneNumber,
            Email: data.Email,
        });
    };

    const toggleModalAdd = () => {
        setShowModalAdd(!showModalAdd);
        setValues({
            name: '',
            address: '',
            branch_code: '',
        });
    };

    const handleAdd = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch/getmaxid`)
            .then((res1) => {
                const newId = res1.data[0].max_id + 1;
                axios
                    .post(`${baseUrl}branch/create`, { ...values, branch_code: `CS${newId}`, newId: newId })
                    .then((res) => {
                        setShowModalAdd(false);
                        loadData();
                        if (res.data === 'fail') {
                            toast.notify('Bạn không có quyền thao tác', 'error');
                        } else {
                            toast.notify('Thêm thành công', 'success');
                        }
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}branch/update/${idSelected.id}`, values)
            .then((res) => {
                setShowModalView(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Cập nhật thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const handleSoftDelete = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}branch/softdelete/${idSelected}`)
            .then((res) => {
                setShowModalHardDel(false);
                loadData();
                if (res.data === 'fail') {
                    toast.notify('Bạn không có quyền thao tác', 'error');
                } else {
                    toast.notify('Xóa thành công', 'success');
                }
            })
            .catch((e) => console.log(e));
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            loadData();
        }
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch/paginate`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    search_value: valuesSearch,
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
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord, sort, numRecord]);
    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý cơ sở</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách chi nhánh</h4>
                    <div className={cx('header-action', 'header-action-branch')}>
                        <div className={cx('header-search')}>
                            <input
                                placeholder="Tìm kiếm theo tên ..."
                                onChange={onChangeInputSearch}
                                value={valuesSearch}
                                onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Thêm chi nhánh
                        </button>
                    </div>
                </div>
            </div>

            {showModalHardDel && (
                <ModalAll1
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleSoftDelete}
                    data={idSelected}
                />
            )}

            {showModalView && (
                <ModalAddBranch
                    label={'Thông tin chi tiết'}
                    dataInputs={inputsUser}
                    dataValueInputs={values}
                    methodToggle={toggleModalView}
                    methodOnchange={onChangeInputUser}
                    methodHandle={handleUpdate}
                />
            )}

            {showModalAdd && (
                <ModalAddBranch
                    label={'Thêm mới chi nhánh'}
                    dataInputs={inputsUserAdd}
                    dataValueInputs={values}
                    methodToggle={toggleModalAdd}
                    methodOnchange={onChangeInputUser}
                    methodHandle={handleAdd}
                />
            )}
            <ToastContainer />

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <BranchListTb data={dataTb} method={{ toggleModalView, toggleModalHardDel, setSort }} user={user} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <select value={numRecord} onChange={onChangerNum}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                    </select>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Branch;
