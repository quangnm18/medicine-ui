import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InventoryWh.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import axios from 'axios';
import InventoryWhTb from '~/components/Table/InventoryWhTb';

const cx = classNames.bind(style);

function InventoryWh() {
    const [allData, setAllData] = useState([]);

    const [valuesSearch, setValuesSearch] = useState('');

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/warehouse')
            .then((res) => {
                setAllData(res.data[0]);
            })
            .catch((e) => console.log(e));
    }, []);

    console.log(allData);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Kho dược</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên..."
                                onChange={onChangeInputSearch}
                                // onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')}>Xuất excel</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <InventoryWhTb data={allData} />
            </div>
        </div>
    );
}

export default InventoryWh;
