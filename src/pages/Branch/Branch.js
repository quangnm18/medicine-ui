import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Branchs.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StaffTb from '~/components/Table/StaffTb';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '~/components/Pagination/Pagination';
import ModalAll1 from '~/components/ModalPage/ModalAll1';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalViewUser from '~/components/ModalPage/ModalViewUser';

const cx = classNames.bind(style);

function Branch() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState();

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
            label: 'Họ và tên',
            name: 'Name',
            type: 'text',
            placeholder: 'Nguyễn Văn C...',
        },
        {
            id: 2,
            label: 'Ngày sinh',
            name: 'DateOfBirth',
            type: 'date',
            placeholder: '',
        },
        {
            id: 3,
            label: 'Địa chỉ',
            name: 'Address',
            type: 'text',
            placeholder: 'Đống Đa, Hà Nội,...',
        },
        {
            id: 4,
            label: 'Số điện thoại',
            name: 'PhoneNumber',
            type: 'number',
            placeholder: '012358745,...',
        },
        {
            id: 5,
            label: 'Email',
            name: 'Email',
            type: 'text',
            placeholder: 'abc@gmail.com,...',
        },
        {
            id: 6,
            label: 'Chi nhánh',
            name: 'branch',
            type: 'text',
            placeholder: '',
        },
    ];

    const inputsUserAdd = [
        {
            id: 1,
            label: 'Họ và tên',
            name: 'Name',
            type: 'text',
            placeholder: 'Nguyễn Văn C...',
        },
        {
            id: 2,
            label: 'Ngày sinh',
            name: 'DateOfBirth',
            type: 'date',
            placeholder: '',
        },
        {
            id: 3,
            label: 'Địa chỉ',
            name: 'Address',
            type: 'text',
            placeholder: 'Đống Đa, Hà Nội,...',
        },
        {
            id: 4,
            label: 'Số điện thoại',
            name: 'PhoneNumber',
            type: 'number',
            placeholder: '012358745,...',
        },
        {
            id: 5,
            label: 'Email',
            name: 'Email',
            type: 'text',
            placeholder: 'abc@gmail.com,...',
        },
        {
            id: 6,
            label: 'Tên đăng nhập',
            name: 'user_name',
            type: 'text',
            placeholder: '',
        },
        {
            id: 7,
            label: 'Mật khẩu',
            name: 'password',
            type: 'password',
            placeholder: '',
        },
    ];

    const getBirth = (data) => {
        const date = new Date(data);
        const year = date.getFullYear();
        const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

        const dateFormat = year + '-' + month + '-' + day;
        return dateFormat;
    };

    const onChangeInputUser = (e) => {
        if (e.target.name === 'Role') {
            setValues({ ...values, [e.target.name]: Number.parseInt(e.target.value) });
        } else if (e.target.name === 'password') {
            setValues({ ...values, [e.target.name]: e.target.value });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const notify = (data, type) => {
        if (type === 'success') {
            toast.success(data, {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: true,
                draggable: true,
            });
        }

        if (type === 'error') {
            toast.error(data, {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
                hideProgressBar: true,
                draggable: true,
            });
        }
    };

    const toggleModalHardDel = (id) => {
        setShowModalHardDel(!showModalHardDel);
        setIdSelected(id);
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
        setValues({
            UserID: data.ID,
            Name: data.Name,
            DateOfBirth: getBirth(data.DateOfBirth),
            Address: data.Address,
            PhoneNumber: data.PhoneNumber,
            Email: data.Email,
            Role: data.role_id,
            branch: data.name,
        });
    };

    const toggleModalAdd = () => {
        setShowModalAdd(!showModalAdd);
        setValues({
            Name: '',
            DateOfBirth: '0000-00-00',
            Address: '',
            PhoneNumber: '',
            Email: '',
            Role: '',
            user_name: '',
            password: '',
            branch_id: JSON.parse(localStorage.getItem('data_user')).id_chi_nhanh,
        });
    };

    const handleAdd = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${baseUrl}category/adduser`, values)
            .then((res) => {
                if (res.data === 'fail') {
                    notify('Bạn không có quyền thao tác', 'error');
                } else {
                    notify('Thêm mới thành công', 'success');
                }
                setShowModalAdd(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}category/updateuser`, values)
            .then((res) => {
                if (res.data === 'fail') {
                    notify('Bạn không có quyền thao tác', 'error');
                } else {
                    notify('Cập nhật thành công', 'success');
                }
                setShowModalView(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleDelete = (id) => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .delete(`${baseUrl}category/users/delete/${idSelected}`)
            .then((res) => {
                setShowModalHardDel(false);
                loadData();
                if (res.data === 'fail') {
                    notify('Bạn không có quyền thao tác', 'error');
                } else {
                    notify('Xóa thành công', 'success');
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
            .get(`${baseUrl}category/users`, {
                params: {
                    branch_code: JSON.parse(localStorage.getItem('data_user')).ma_chi_nhanh,
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
    }, [startRecord]);
    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý cơ sở</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách chi nhánh</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                placeholder="Tìm kiếm theo SĐT, Email, ..."
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
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleDelete}
                    data={idSelected}
                />
            )}

            {showModalView && (
                <ModalViewUser
                    label={'Thông tin người dùng'}
                    dataInputs={inputsUser}
                    dataValueInputs={values}
                    methodToggle={toggleModalView}
                    methodOnchange={onChangeInputUser}
                    methodHandle={handleUpdate}
                />
            )}

            {showModalAdd && (
                <ModalViewUser
                    label={'Nhập thông tin người dùng'}
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
                    <StaffTb data={dataTb} method={{ toggleModalView, toggleModalHardDel }} />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default Branch;
