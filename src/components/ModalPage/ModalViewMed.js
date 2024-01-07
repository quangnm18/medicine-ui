import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';
import { useState } from 'react';

import Modal from '~/components/Modal';

const cx = classNames.bind(style);

function ModalViewMed({ dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    console.log(dataValueInputs);
    const [error, setError] = useState({});

    const validator = () => {
        const validationError = {};
        if (dataValueInputs.ten === '' && !dataValueInputs.ten.trim()) {
            validationError.ten = 'Phải nhập tên dược phẩm';
        }

        if (dataValueInputs.don_gia === '' && !dataValueInputs.don_gia.trim()) {
            validationError.dong_gia = 'Phải nhập đơn giá bán';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>Thông tin chi tiết dược phẩm</div>
                <div className={cx('modal-form')}>
                    <div className={cx('modal-if')}>
                        {dataInputs.map((input) => (
                            <div key={input.id} className={cx('if-detail')}>
                                <div className={cx('label')}>{input.label}</div>
                                <input
                                    name={input.name}
                                    value={dataValueInputs[input.name]}
                                    placeholder={input.placeholder}
                                    onChange={methodOnchange}
                                />
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                        <div className={cx('if-detail')}>
                            <div className={cx('label')}>Đơn vị dược</div>
                            <input disabled value={dataValueInputs.description_unit} />
                        </div>
                        <div className={cx('if-detail')}>
                            <div className={cx('label')}>Nhóm thuốc</div>
                            <input disabled value={dataValueInputs.ten_nhom_thuoc} />
                        </div>
                        <div className={cx('modal-actionView')}>
                            <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                                Cập nhật
                            </button>
                            <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                                Trở lại
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalViewMed;
