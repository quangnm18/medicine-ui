import classNames from 'classnames/bind';
import style from './ExpandRow.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function WarehouseExpander({ data }) {
    console.log(data);
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('rows')}>Số lượng nhập(ĐVNN): </div>
                <div className={cx('rows')}>Tổng giá nhập(ĐVNN): </div>
                <div className={cx('rows')}>Số lượng đã bán: </div>
                <div className={cx('rows')}>Đơn giá bán: </div>
            </div>
            <div>
                <div className={cx('rows')}>{data.data.sl_tong ? data.data.sl_tong : 0} </div>
                <div className={cx('rows')}>
                    {Intl.NumberFormat().format(data.data.sl_tong * data.data.gianhap_daqd)}{' '}
                </div>
                <div className={cx('rows')}>{data.data.so_luong_ban ? data.data.so_luong_ban : 0}</div>
                <div className={cx('rows')}>
                    {data.data.giaban_daqd ? Intl.NumberFormat().format(data.data.giaban_daqd) : 0}
                </div>
            </div>
        </div>
    );
}

export default WarehouseExpander;
