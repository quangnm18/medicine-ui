import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import { useState } from 'react';
import Modal from '~/components/Modal';

const cx = classNames.bind(style);

function ModalView({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [error, setError] = useState({});
    console.log(dataValueInputs);
    console.log(dataInputs);
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.ten_ncc === '' && !dataValueInputs.ten_ncc.trim()) {
            validationError.ten_ncc = 'Phải nhập tên nhà cung cấp';
        }

        if (dataValueInputs.PhoneNumber === '' && !dataValueInputs.PhoneNumber.trim()) {
            validationError.PhoneNumber = 'Phải nhập số điện thoại';
        }

        if (dataValueInputs.Email === '' && !dataValueInputs.Email.trim()) {
            validationError.Email = 'Phải nhập Email';
        } else if (!/\S+@\S+\.\S+/.test(dataValueInputs.Email)) {
            validationError.Email = 'Email không hợp lệ';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };
    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>{label}</div>
                <div className={cx('modal-form')}>
                    <div className={cx('modal-if')}>
                        {dataInputs.map((input) => (
                            <div key={input.id} className={cx('if-detail')}>
                                <div className={cx('label')}>{input.label}</div>
                                <input
                                    name={input.name}
                                    value={dataValueInputs[input.name] ? dataValueInputs[input.name] : ''}
                                    placeholder={input.placeholder}
                                    onChange={methodOnchange}
                                />
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('modal-actionAll')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                        Cập nhật
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalView;
