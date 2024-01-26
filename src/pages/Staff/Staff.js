import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Staff.module.scss';
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

function Staff() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState();

    const [dataTb, setDataTb] = useState([]);
    const [valuesSearch, setValuesSearch] = useState('');
    const [showModalHardDel, setShowModalHardDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
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
        // {
        //     id: 6,
        //     label: 'Vai trò',
        //     name: 'Role',
        //     type: 'text',
        //     placeholder: 'Nhân viên bán hàng,...',
        // },
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
        setValues({ ...values, [e.target.name]: e.target.value });
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
        });
    };

    const handleUpdate = () => {
        axios
            .put('http://localhost:8081/category/updateuser', values)
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
        axios
            .delete(`http://localhost:8081/category/users/delete/${idSelected}`)
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
        axios
            .get('http://localhost:8081/category/users', {
                params: {
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
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách nhân viên</h4>
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
                        <button className={cx('btn-addstaff')}>Thêm thành viên</button>
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

export default Staff;
