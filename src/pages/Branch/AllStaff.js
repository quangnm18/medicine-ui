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
import ModalViewUserAdm from '~/components/ModalPage/ModalViewUserAdm';

const cx = classNames.bind(style);

function AllStaff() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState();

    const [dataTb, setDataTb] = useState([]);
    const [valuesSearch, setValuesSearch] = useState('');
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [idSelected, setIdSelected] = useState();

    const [dataBranch, setDataBranch] = useState([]);
    const [selectBranch, setSelectBranch] = useState(undefined);

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
        if (e.target.name === 'Role' || e.target.name === 'branch_id') {
            setValues({ ...values, [e.target.name]: Number.parseInt(e.target.value) });
        } else if (e.target.name === 'password') {
            setValues({ ...values, [e.target.name]: e.target.value });
        } else {
            setValues({ ...values, [e.target.name]: e.target.value });
        }
    };

    const onchangeBranch = (e) => {
        setSelectBranch(e.target.value);
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

    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const toggleModalView = (data) => {
        console.log(data);
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
            branch_id: data.branch_id,
        });
    };

    const toggleModalAdd = () => {
        setShowModalAdd(!showModalAdd);
        setValues({
            Name: '',
            DateOfBirth: getBirth('1970-01-01'),
            Address: '',
            PhoneNumber: '',
            Email: '',
            Role: 0,
            user_name: '',
            password: '',
            branch_id: 0,
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
            .put(`${baseUrl}category/users/softdelete/${idSelected}`)
            .then((res) => {
                setShowModalSoftDel(false);
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
                    branch_id: selectBranch,
                    isDeleted: 0,
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
    }, [startRecord, selectBranch]);

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch`)
            .then((res) => {
                if (res.data === 'fail') {
                    setDataBranch([]);
                } else setDataBranch(res.data);
            })
            .catch((e) => console.log(e));
    }, []);
    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý cơ sở</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách người dùng</h4>
                    <div className={cx('header-wrap')}>
                        <div className={cx('header-action')}>
                            <div className={cx('wrap-search')}>
                                <div className={cx('header-search')}>
                                    <label className={cx('search-label')}>Tìm kiếm</label>
                                    <input
                                        placeholder="Tìm kiếm theo tên, ..."
                                        onChange={onChangeInputSearch}
                                        value={valuesSearch}
                                        onKeyDown={handleKeyPress}
                                    />
                                </div>
                                <button className={cx('search-btn')}>
                                    <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                                </button>
                            </div>

                            <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                                Thêm thành viên
                            </button>
                        </div>
                        <div className={cx('branch-option', 'search-statistic')}>
                            <label className={cx('search-label')}>Chi nhánh</label>

                            <select value={selectBranch} onChange={onchangeBranch}>
                                <option value={0}>--Chọn cơ sở--</option>
                                {dataBranch.map((branch) => (
                                    <option key={branch.id} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {showModalSoftDel && (
                <ModalAll1
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSoftDel}
                    methodHandle={handleDelete}
                    data={idSelected}
                />
            )}

            {showModalView && (
                <ModalViewUserAdm
                    label={'Thông tin người dùng'}
                    dataInputs={inputsUser}
                    dataValueInputs={values}
                    methodToggle={toggleModalView}
                    methodOnchange={onChangeInputUser}
                    methodHandle={handleUpdate}
                />
            )}

            {showModalAdd && (
                <ModalViewUserAdm
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
                    <StaffTb data={dataTb} method={{ toggleModalView, toggleModalSoftDel }} user={user} />
                </div>
                <div className={cx('wrap-pagination')}>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default AllStaff;
