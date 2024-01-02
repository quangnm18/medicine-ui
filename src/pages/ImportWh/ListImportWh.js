import { useState, useCallback, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import style from './ImportWh.module.scss';
import classNames from 'classnames/bind';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import axios from 'axios';
import ImportCpListTb from '~/components/Table/ImportCpListTb';

const cx = classNames.bind(style);
const Data = [
    {
        id: 1,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 2,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 3,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 4,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
];

function ImportWh() {
    const [dataListCp, setDataListCp] = useState([]);
    //Method Toggle

    //Method OnchangeInput

    //call api
    useEffect(() => {
        axios
            .get('http://localhost:8081/warehouse/import/list')
            .then((res) => {
                setDataListCp(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý nhập kho</DirectionHeader>
                <div>
                    <div className={cx('choose-medicine')}>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Từ ngày</label>
                            <input type="date" className={cx('input-name')} />
                        </div>
                        <div className={cx('medicine-option')}>
                            <label className={cx('label-option')}>Đến ngày</label>
                            <input type="date" className={cx('input-name')} />
                        </div>
                        <button className={cx('btn-search')}>
                            <FontAwesomeIcon icon={faSearch} />
                        </button>
                        <div className={cx('btn-action')}>
                            <button className={cx('btn-add')}>Nhập tồn</button>
                            <button className={cx('btn-add')}>Xuất excel</button>
                        </div>
                    </div>
                    <div className={cx('search-filter')}>
                        <label className={cx('label-option')}>Tìm kiếm</label>
                        <input className={cx('input-name')} placeholder="Tìm kiếm theo mã phiếu..." />
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <ImportCpListTb data={dataListCp} />
            </div>
        </div>
    );
}

export default ImportWh;
