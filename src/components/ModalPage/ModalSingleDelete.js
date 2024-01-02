import style from './ModalPage.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

import Modal from '../Modal';

const cx = classNames.bind(style);

function ModalSingleDelete({ methodToggle, methodHandle, data }) {
    return (
        <Modal>
            <div className={cx('modal-delete')}>
                <div className={cx('modal-notif')}>Bạn có muốn xóa ?</div>
                <div className={cx('modal-action')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={() => methodHandle(data)}>
                        Có
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={() => methodToggle(data)}>
                        Không
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default memo(ModalSingleDelete);
