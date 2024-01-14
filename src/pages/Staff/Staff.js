import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Staff.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import StaffTb from '~/components/Table/StaffTb';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function Staff() {
    const [dataTb, setDataTb] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/staff')
            .then((res) => {
                setDataTb(res.data);
            })
            .then((e) => console.log(e));
    }, []);
    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách nhân viên</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input placeholder="Tìm kiếm theo SĐT, Email, ..." />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')}>Thêm thành viên</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <StaffTb data={dataTb} />
            </div>
        </div>
    );
}

export default Staff;
