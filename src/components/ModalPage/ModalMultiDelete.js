import style from './ModalPage.module.scss';
import classNames from 'classnames/bind';
import { memo } from 'react';

import Modal from '../Modal';

const cx = classNames.bind(style);

function ModalMultiDelete({ method, data }) {
    return (
        <Modal>
            <div className={cx('modal-delete')}>
                <div className={cx('modal-notif')}>Bạn có muốn xóa mục đã chọn ?</div>
                <div className={cx('modal-action')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={() => method.softDeleteMed(data)}>
                        Có
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={method.toggleModalMultiDelete}>
                        Không
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default memo(ModalMultiDelete);
