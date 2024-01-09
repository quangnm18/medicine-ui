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
    const [allDataImport, setAllDataImport] = useState([]);
    const [allDataSale, setAllDataSale] = useState([]);

    const [valuesSearch, setValuesSearch] = useState('');

    const [dataWh, setDataWh] = useState([]);

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const updateWh = () => {
        let arrImport = [...allDataImport];
        let newA = arrImport.map((item) => {
            let newB = allDataSale.filter((item2) => item2.id === item.id);
            return { ...item, sl_tong: item.sl_tong - newB[0].so_luong_ban };
        });
        setDataWh(newA);
    };

    useEffect(() => {
        axios
            //full chi tiet nhap
            .get('http://localhost:8081/category/warehouse')
            .then((res) => {
                setAllDataImport(res.data[0]);

                axios
                    //full chi tiet ban
                    .get('http://localhost:8081/sell/ivdetail/synthetic')
                    .then((res1) => {
                        setAllDataSale(res1.data[0]);
                    })
                    .catch((e) => console.log(e));
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {}, []);

    useEffect(() => {
        updateWh();
    }, [allDataSale]);

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
                        <button className={cx('btn-addstaff')} onClick={updateWh}>
                            Xuất excel
                        </button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <InventoryWhTb data={dataWh} />
            </div>
        </div>
    );
}

export default InventoryWh;
