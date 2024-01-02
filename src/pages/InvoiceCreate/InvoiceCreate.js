import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InvoiceCreate.module.scss';
import classNames from 'classnames/bind';
import InvoiceCreateTb from '~/components/Table/InvoiceCreateTb';

import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function InvoiceCreate() {
    const [nameSearchInput, setNameSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [units, setUnits] = useState([]);
    const [unitSelected, setUnitSelected] = useState('');
    const [price, setPrice] = useState();

    const handleSelected = (e) => {
        setUnitSelected(e.target.value);
        const filtered = units.filter((unit) => {
            return unit.Name === e.target.value;
        });
        setPrice(filtered[0].Price);
    };

    // useEffect(() => {
    //     axios.get(`http://localhost:8081/category/medicine/search/?name=${nameSearchInput}`).then((res) => {
    //         setSearchResult(res.data);
    //     });
    // }, [nameSearchInput]);

    const handleSelectedMedicine = (medicine) => {
        setNameSearchInput(medicine.Name);
        // axios
        //     .get(`http://localhost:8081/sell/create/medicineunit/${medicine.ID}`)
        //     .then((res) => {
        //         setUnits(res.data);
        //         setPrice(res.data[0].Price);
        //         setUnitSelected(res.data[0].Name);
        //     })
        //     .catch((err) => console.log(err));
    };

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Bán hàng</DirectionHeader>
                <h4 className={cx('header-title')}>Lập hóa đơn</h4>
                <div className={cx('choose-medicine')}>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Tên dược</label>
                        <Tippy
                            interactive
                            visible={nameSearchInput && searchResult.length > 0}
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                        {searchResult.map((medicine) => (
                                            <div
                                                key={medicine.ID}
                                                className={cx('result-item')}
                                                onClick={() => handleSelectedMedicine(medicine)}
                                            >
                                                {medicine.Name}
                                            </div>
                                        ))}
                                    </Popper>
                                </div>
                            )}
                        >
                            <input
                                className={cx('input-name')}
                                value={nameSearchInput}
                                onChange={(e) => setNameSearchInput(e.target.value)}
                            />
                        </Tippy>
                    </div>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Loại</label>
                        <select value={unitSelected} onChange={handleSelected}>
                            {units.map((unit) => (
                                <option value={unit.Name} key={unit.ID}>
                                    {unit.Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Số lượng</label>
                        <input className={cx('input-count')} />
                    </div>

                    <div className={cx('btn-action')}>
                        <button className={cx('btn-add')}>Thêm</button>
                        <button className={cx('btn-add')}>Xuất excel</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <div className={cx('table-content')}>
                    <InvoiceCreateTb />
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

export default InvoiceCreate;
