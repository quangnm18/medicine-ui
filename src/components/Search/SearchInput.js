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

    return (
        <Tippy
            interactive
            visible={showResult && dataSearchResult.length > 0}
            onClickOutside={handleHideResult}
            placement="bottom"
            render={(attrs) => (
                <div className={cx(classWidth)} tabIndex="-1" {...attrs}>
                    <Popper>
                        <div className={cx('result-list')}>
                            {dataSearchResult.map((item) => {
                                if (classWidth === 'search-sellWh') {
                                    return (
                                        <div
                                            key={item.id}
                                            className={cx('result-item')}
                                            onClick={() => handleSelectedResult(item)}
                                        >
                                            <div>{item.ten}</div>
                                            <span className={cx('result-itemmore')}>
                                                {item.ten_nhom_thuoc} || {'   '} Đóng gói: {item.description_unit} ||
                                                Tồn kho: {item.soluong_lon ? item.soluong_lon : 0} {item.donvi_lon} --
                                                {item.soluong_lon * item.soluong_tb
                                                    ? item.soluong_lon * item.soluong_tb
                                                    : ''}{' '}
                                                {item.soluong_lon * item.soluong_tb ? item.donvi_tb : ''} --{' '}
                                                {item.sl_tong ? item.sl_tong : 0} {item.donvi_nho}
                                            </span>
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
                                            <span className={cx('result-itemmore')}>
                                                {item.ten} -- {item.description_unit} --
                                            </span>
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
            />
        </Tippy>
    );
}

export default memo(SearchInput);
