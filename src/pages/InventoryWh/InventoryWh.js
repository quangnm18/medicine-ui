import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InventoryWh.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';

import axios from 'axios';
import InventoryWhTb from '~/components/Table/InventoryWhTb';
import ModalViewDetailWh from '~/components/ModalPage/ModalViewDetailWh';

const cx = classNames.bind(style);

function InventoryWh() {
    const [allDataImport, setAllDataImport] = useState([]);
    const [allDataImportDel, setAllDataImportDel] = useState([]);

    const [allDataSale, setAllDataSale] = useState([]);
    const [showModalView, setShowModalView] = useState(false);
    const [idSelected, setIdSelected] = useState();

    const [valuesSearch, setValuesSearch] = useState('');

    const [dataWh, setDataWh] = useState([]);

    const toggleModalView = (id) => {
        setIdSelected(id);
        setShowModalView(!showModalView);
    };

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const updateWh = () => {
        if (allDataImport && allDataSale) {
            const arrImport = allDataImport.map((item) => {
                const arrImportDel = allDataImportDel.filter((item1) => item1.id === item.id);

                const arrSale = allDataSale.filter((item2) => item2.med_id === item.id);

                if (arrImportDel.length > 0 && arrSale.length > 0) {
                    if (
                        arrSale[0].so_luong_ban > arrImportDel[0].sl_tong ||
                        arrSale[0].so_luong_ban === arrImportDel[0].sl_tong
                    ) {
                        return { ...item, sl_tong: item.sl_tong + arrImportDel[0].sl_tong - arrSale[0].so_luong_ban };
                    }
                }

                if (arrSale.length > 0 && arrImportDel.length === 0) {
                    return { ...item, sl_tong: item.sl_tong - arrSale[0].so_luong_ban };
                }
                return { ...item };
            });

            setDataWh(arrImport);
        }
    };

    useEffect(() => {
        axios
            //full chi tiet nhap chua xoa
            .get('http://localhost:8081/category/warehouse', { params: { isDeleted: 0 } })
            .then((res) => {
                setAllDataImport(res.data[0]);
            })
            .catch((e) => console.log(e));

        axios
            //full chi tiet nhap da xoa
            .get('http://localhost:8081/category/warehouse', { params: { isDeleted: 1 } })
            .then((res) => {
                setAllDataImportDel(res.data[0]);
            })
            .catch((e) => console.log(e));

        axios
            //full chi tiet ban
            .get('http://localhost:8081/sell/allivdetail/synthetic')
            .then((res1) => {
                setAllDataSale(res1.data[0]);
            })
            .catch((e) => console.log(e));
    }, []);

    useEffect(() => {
        updateWh();
    }, [allDataSale, allDataImport, allDataImportDel]);

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
            {showModalView && (
                <ModalViewDetailWh label={'Thông tin lịch sử nhập'} methodToggle={toggleModalView} data={idSelected} />
            )}

            <div className={cx('main-content')}>
                <InventoryWhTb data={dataWh} method={toggleModalView} />
            </div>
        </div>
    );
}

export default InventoryWh;
