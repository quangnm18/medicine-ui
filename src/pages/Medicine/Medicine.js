import { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import MedicineTb from '~/components/Table/MedicineTb';
import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Medicine.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(style);

function Medicine() {
    console.log('render');
    const [dataMedicine, setDataMedicine] = useState([]);
    const [dataSupplier, setDataSupplier] = useState([]);

    console.log('render');

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/medicine')
            .then((res) => setDataMedicine(res.data))
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/supplier')
            .then((res) => setDataSupplier(res.data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Danh mục</DirectionHeader>
                <h4 className={cx('header-title')}>Danh sách dược phẩm</h4>

                <div className={cx('choose-medicine')}>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Tìm kiếm</label>
                        <input className={cx('input-name')} />
                        <button className={cx('btn-search', 'btn')}>
                            <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                        </button>
                        <span className={cx('control-action')}>
                            <button className={cx('btn-action', 'btn')}>Thêm mới</button>
                            <button className={cx('btn-action', 'btn')}>Xuất excel</button>
                        </span>
                    </div>

                    <button className={cx('btn-delete', 'btn')}>Xóa dược</button>
                </div>
            </div>

            <div className={cx('main-content')}>
                <MedicineTb data={{ dataMedicine, dataSupplier }} />
            </div>
        </div>
    );
}

export default Medicine;
