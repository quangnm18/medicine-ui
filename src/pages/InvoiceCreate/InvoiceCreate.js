import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './InvoiceCreate.module.scss';
import classNames from 'classnames/bind';
import InvoiceCreateTb from '~/components/Table/InvoiceCreateTb';

import Tippy from '@tippyjs/react/headless';
import Popper from '~/components/Popper/Popper';

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

function InvoiceCreate() {
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
                            visible
                            placement="bottom"
                            render={(attrs) => (
                                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                                    <Popper>
                                        <div className={cx('result-item')}>Ampecilin</div>
                                        <div className={cx('result-item')}>Ampecilin</div>
                                        <div className={cx('result-item')}>Ampecilin</div>
                                        <div className={cx('result-item')}>Ampecilin</div>
                                    </Popper>
                                </div>
                            )}
                        >
                            <input className={cx('input-name')} />
                        </Tippy>
                    </div>
                    <div className={cx('medicine-option')}>
                        <label className={cx('label-option')}>Loại</label>
                        <select>
                            <option>Hộp</option>
                            <option>Viên</option>
                            <option>Vỉ</option>
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
                <InvoiceCreateTb data={Data} />
            </div>
        </div>
    );
}

export default InvoiceCreate;
