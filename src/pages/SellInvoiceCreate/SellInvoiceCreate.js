import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './SellInvoiceCreate.module.scss';
import classNames from 'classnames/bind';
import SellInvoiceCreateTb from '~/components/Table/SellInvoiceCreateTb';

import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import SearchInput from '~/components/Search/SearchInput';
import useDebounce from '~/hooks/useDebounce';
import * as searchServices from '~/apiServices/searchServices';

const cx = classNames.bind(style);

function SellInvoiceCreate() {
    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);

    const [units, setUnits] = useState([]);
    const [unitSelected, setUnitSelected] = useState('');
    const [price, setPrice] = useState();

    const debounced = useDebounce(nameSearchInput, 500);

    const handleSelected = (e) => {
        setUnitSelected(e.target.value);
        const filtered = units.filter((unit) => {
            return unit.Name === e.target.value;
        });
        setPrice(filtered[0].Price);
    };

    const handleOnchangeInput = useCallback((value) => {
        setNameSearchInput(value);
    }, []);

    const handleSelectedMedicine = useCallback((medicine) => {
        setNameSearchInput(medicine.ten);
    }, []);
    console.log(searchResult);

    useEffect(() => {
        if (!debounced.trim()) {
            setSearchResult([]);
            return;
        }

        const fetchApi = async () => {
            const result = await searchServices.searchWh(debounced);
            setSearchResult(result);
        };
        fetchApi();
    }, [debounced]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Bán hàng</DirectionHeader>
                <h4 className={cx('header-title')}>Lập hóa đơn</h4>
                <div className={cx('choose-sell')}>
                    <div className={cx('choose-detail')}>
                        <div className={cx('sell-option', 'sell-optionSearch')}>
                            <label>Tên thuốc</label>
                            <SearchInput
                                dataInputValue={nameSearchInput}
                                dataSearchResult={searchResult}
                                methodOnchangeInput={handleOnchangeInput}
                                methodSelectedResult={handleSelectedMedicine}
                                classWidth={'search-sellWh'}
                            />
                        </div>
                        <div className={cx('sell-option')}>
                            <label className={cx('label-option')}>Loại</label>
                            <select value={unitSelected} onChange={handleSelected}>
                                {units.map((unit) => (
                                    <option value={unit.Name} key={unit.ID}>
                                        {unit.Name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={cx('sell-option')}>
                            <label className={cx('label-option')}>Số lượng</label>
                            <input className={cx('input-count')} />
                        </div>
                    </div>

                    <div className={cx('btn-action')}>
                        <button className={cx('btn-add')}>Thêm</button>
                        <button className={cx('btn-add')}>Xuất excel</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <div className={cx('table-content')}>
                    <SellInvoiceCreateTb />
                </div>

                <div className={cx('invoice-sale')}>
                    <div className={cx('invoice-title')}>Hóa đơn</div>
                    <div className={cx('invoice-code')}>
                        <span>Mã HĐ: </span>
                        <span>HDA10284567</span>
                    </div>
                    <div className={cx('invoice-info')}>
                        <div className={cx('invoice-detail')}>
                            <span>Ngày bán</span>
                            <span>12/10/2023</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Nhân viên</span>
                            <span>Kim Anh</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tổng tiền</span>
                            <span>0</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Chiết khấu</span>
                            <span>0</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tổng phải trả</span>
                            <span>0</span>
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Khách trả</span>
                            <input placeholder="00.00" />
                        </div>
                        <div className={cx('invoice-detail')}>
                            <span>Tiền dư</span>
                            <span>0</span>
                        </div>
                    </div>

                    <div className={cx('invoice-action')}>
                        <button className={cx('invoice-btn')}>Lưu hóa đơn</button>
                        <button className={cx('invoice-btn')}>Xuất hóa đơn</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SellInvoiceCreate;
