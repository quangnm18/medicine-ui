import style from './ModalPage.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';

import Modal from '../Modal';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalAccept({ methodToggle, methodHandle, label, data }) {
    const [dataDetail, setDataDetail] = useState([]);
    console.log(data);
    useEffect(() => {
        axios('http://localhost:8081/importlist/alldetail/', { params: { q: data } }).then((res) => {
            setDataDetail(res.data);
        });
    }, []);

    return (
        <Modal>
            <div className={cx('modalAll')}>
                <div className={cx('modalAll-notif')}>{label}</div>
                <div className={cx('modalAll-action')}>
                    <button className={cx('btn-modalAll')} onClick={() => methodHandle(dataDetail)}>
                        Có
                    </button>
                    <button className={cx('btn-modalAll')} onClick={() => methodToggle(data)}>
                        Không
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default memo(ModalAccept);
