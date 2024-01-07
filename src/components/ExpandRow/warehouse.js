import classNames from 'classnames/bind';
import style from './ExpandRow.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(style);

function WarehouseExpander({ data }) {
    return (
        <div className={cx('wrapper')}>
            <div>
                <div className={cx('rows')}>Số lượng đơn vị lớn: </div>
                <div className={cx('rows')}>Số lượng đơn vị trung bình: </div>
                <div className={cx('rows')}>Số lượng đơn vị nhỏ nhất: </div>
                <div className={cx('rows')}>Đóng gói: </div>
            </div>
            <div>
                <div className={cx('rows')}>{data.data.sltong_dvln ? data.data.sltong_dvln : 0} </div>
                <div className={cx('rows')}>{data.data.sltong_dvtb} </div>
                <div className={cx('rows')}>{data.data.sltong_dvnn ? data.data.sltong_dvnn : 0}</div>
                <div className={cx('rows')}>{data.data.donggoi ? data.data.donggoi : ''}</div>
            </div>
        </div>
    );
}

export default WarehouseExpander;
