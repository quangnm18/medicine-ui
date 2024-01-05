import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';
import style from './SearchInput.module.scss';
import classNames from 'classnames/bind';
import { useState, memo } from 'react';

const cx = classNames.bind(style);

function SearchInput({ dataInputValue, dataSearchResult = [], methodOnchangeInput, methodSelectedResult, classWidth }) {
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
                            {dataSearchResult.map((item) => (
                                <div
                                    key={item.id}
                                    className={cx('result-item')}
                                    onClick={() => handleSelectedResult(item)}
                                >
                                    <div>{item.ten}</div>
                                    <span className={cx('result-itemmore')}>
                                        {item.ten} - {item.hoat_chat} - {item.ham_luong}
                                    </span>
                                </div>
                            ))}
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
            />
        </Tippy>
    );
}

export default memo(SearchInput);
