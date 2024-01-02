import style from './ModalPage.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

import Modal from '../Modal';

const cx = classNames.bind(style);

function ModalAll({ methodToggle, methodHandle, data, label }) {
    return (
        <Modal>
            <div className={cx('modalAll')}>
                <div className={cx('modalAll-notif')}>{label}</div>
                <div className={cx('modalAll-action')}>
                    <button className={cx('btn-modalAll')} onClick={() => methodHandle(data)}>
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

export default memo(ModalAll);
