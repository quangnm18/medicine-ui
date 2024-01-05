import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InventoryWh.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import * as supplierServices from '~/apiServices/supplierServices';
import InventoryWhTb from '~/components/Table/InventoryWhTb';

const cx = classNames.bind(style);

function InventoryWh() {
    // const [dataSup, setDataSup] = useState([]);
    // const [dataSupCurr, setDataSupCurr] = useState([]);
    // const [dataSupDel, setDataSupDel] = useState([]);

    // const [dataTb, setDataTb] = useState([]);
    // const [dataTbDel, setDataTbDel] = useState([]);

    // const [stateBin, setStateBin] = useState(false);

    // const [values, setValues] = useState({
    //     Name: '',
    //     PhoneNumber: '',
    //     Email: '',
    //     Address: '',
    //     personRepresent: '',
    //     TaxCode: '',
    // });

    const [valuesSearch, setValuesSearch] = useState('');

    // const [showModalAdd, setShowModalAdd] = useState(false);
    // const [showModalView, setShowModalView] = useState(false);
    // const [showModalDelete, setShowModalDelete] = useState(false);
    // const [showModalHardDel, setShowModaHardDel] = useState(false);
    // const [showModalRes, setShowModalRes] = useState(false);

    // const [idSelected, setIdSelected] = useState();

    // const onChangeInputSup = (e) => {
    //     setValues({ ...values, [e.target.name]: e.target.value });
    // };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    // const handleFilter = () => {
    //     if (stateBin) {
    //         if (valuesSearch.length) {
    //             const arr = dataSupDel.filter((sup) => {
    //                 return sup.Name.toLowerCase().includes(valuesSearch.toLocaleLowerCase());
    //             });
    //             setDataTbDel(arr);
    //         } else {
    //             setDataTbDel(dataSupDel);
    //         }
    //     } else {
    //         if (valuesSearch.length) {
    //             const arr = dataSupCurr.filter((sup) => {
    //                 return sup.Name.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
    //             });
    //             setDataTb(arr);
    //         } else {
    //             setDataTb(dataSupCurr);
    //         }
    //     }
    // };

    // const handleKeyPress = (e) => {
    //     if (e.code === 'Enter') {
    //         handleFilter();
    //     }
    // };

    // useEffect(() => {
    //     loadData();
    // }, []);

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
                        <button className={cx('btn-addstaff')}>Thêm</button>
                        <button className={cx('btn-addstaff')}>Nhập excel</button>
                        <button className={cx('btn-addstaff')}>Bin</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <InventoryWhTb />
            </div>
        </div>
    );
}

export default InventoryWh;
