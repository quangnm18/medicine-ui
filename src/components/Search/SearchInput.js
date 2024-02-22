import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';
import style from './SearchInput.module.scss';
import classNames from 'classnames/bind';
import { useState, memo } from 'react';

const cx = classNames.bind(style);

function SearchInput({
    dataInputValue,
    dataSearchResult = [],
    methodOnchangeInput,
    methodSelectedResult,
    classWidth,
    placeholder = '',
    methodHandleSearch = null,
}) {
    const [showResult, setShowResult] = useState(false);
    const handleShowResult = (e) => {
        setShowResult(true);
        methodOnchangeInput(e.target.value);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    const handleSelectedResult = (data) => {
        methodSelectedResult(data);
        setShowResult(false);
    };

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toLocaleDateString();
    };

    return (
        <Tippy
            interactive
            visible={showResult && dataSearchResult.length > 0}
            onClickOutside={handleHideResult}
            placement="bottom-start"
            render={(attrs) => (
                <div className={cx(classWidth)} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('result-list')}>
                            {dataSearchResult.map((item, index) => {
                                if (classWidth === 'search-sellWh') {
                                    return (
                                        <div
                                            key={index}
                                            className={cx('result-item')}
                                            onClick={() => handleSelectedResult(item)}
                                        >
                                            <div>{item.ten}</div>
                                            <div className={cx('result-span')}>
                                                <span className={cx('result-itemmore')}>
                                                    Hàm lượng: {item.ham_luong + ' - ' + item.hoat_chat} || {'   '} Đóng
                                                    gói: {item.dong_goi} || Tồn kho:{' '}
                                                    {item.so_luong_xuat
                                                        ? item.so_luong_ban
                                                            ? (item.sl_tong -
                                                                  item.so_luong_ban -
                                                                  item.so_luong_xuat -
                                                                  ((item.sl_tong -
                                                                      item.so_luong_ban -
                                                                      item.so_luong_xuat) %
                                                                      item.soluong_nho)) /
                                                              item.soluong_nho
                                                            : item.soluong_lon - item.soluonglon_xuat
                                                        : item.so_luong_ban
                                                        ? (item.sl_tong -
                                                              item.so_luong_ban -
                                                              ((item.sl_tong - item.so_luong_ban) % item.soluong_nho)) /
                                                          item.soluong_nho
                                                        : item.soluong_lon}{' '}
                                                    {item.donvi_lon},{' '}
                                                    {item.so_luong_xuat
                                                        ? (item.so_luong_ban
                                                              ? item.sl_tong - item.so_luong_ban - item.so_luong_xuat
                                                              : item.sl_tong - item.so_luong_xuat) % item.soluong_nho
                                                        : (item.so_luong_ban
                                                              ? item.sl_tong - item.so_luong_ban
                                                              : item.sl_tong) % item.soluong_nho}{' '}
                                                    {item.donvi_nho} --{' '}
                                                    {item.so_luong_xuat
                                                        ? item.so_luong_ban
                                                            ? item.sl_tong - item.so_luong_ban - item.so_luong_xuat
                                                            : item.sl_tong - item.so_luong_xuat
                                                        : item.so_luong_ban
                                                        ? item.sl_tong - item.so_luong_ban
                                                        : item.sl_tong}{' '}
                                                    {item.donvi_nho}
                                                </span>
                                                <span className={cx('result-itemmore')}>
                                                    Số lô: {item.so_lo} || Hạn dùng: {formatDate(item.han_dung)}
                                                </span>
                                            </div>
                                        </div>
                                    );
                                } else
                                    return (
                                        <div
                                            key={item.id}
                                            className={cx('result-item')}
                                            onClick={() => handleSelectedResult(item)}
                                        >
                                            <div>{item.ten}</div>
                                            <div className={cx('result-detail')}>
                                                <span className={cx('result-itemmore')}>
                                                    {item.ten_nhom_thuoc} || Hàm lượng:
                                                    {item.ham_luong ? ` ${item.ham_luong}` : ''}
                                                    {item.hoat_chat ? ` -- ${item.hoat_chat}` : ''}
                                                </span>
                                                <span className={cx('result-itemmore')}>
                                                    Đóng gói: {item.description_unit}
                                                </span>
                                            </div>
                                        </div>
                                    );
                            })}
                        </div>
                    </Popper>
                </div>
            )}
        >
            <input
                className={cx('input-name')}
                value={dataInputValue}
                onChange={(e) => handleShowResult(e)}
                onFocus={() => setShowResult(true)}
                placeholder={placeholder}
                onKeyUp={methodHandleSearch}
            />
        </Tippy>
    );
}

export default memo(SearchInput);
