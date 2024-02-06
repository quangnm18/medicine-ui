import classNames from 'classnames/bind';
import style from './ModalUnitGr.module.scss';

import Modal from '~/components/Modal';
import { useState } from 'react';

const cx = classNames.bind(style);

function ModalAddBranch({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [error, setError] = useState({});
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.name === '' && !dataValueInputs.name.trim()) {
            validationError.name = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.address === '' && !dataValueInputs.address.trim()) {
            validationError.address = 'Trường này là bắt buộc';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };

    return (
        <Modal>
            <div className={cx('modal-viewGr')}>
                <div className={cx('modal-titleGr')}>{label}</div>
                <div className={cx('modal-formGr')}>
                    <div className={cx('modal-ifGr')}>
                        {dataInputs.map((input) => (
                            <div key={input.id} className={cx('modal-ifGr-wrap')}>
                                <div className={cx('if-detailGr')}>
                                    <div
                                        className={cx(
                                            'label-gr',
                                            (input.name === 'name' || input.name === 'address') && 'required',
                                        )}
                                    >
                                        {input.label}:
                                    </div>

                                    <input
                                        name={input.name}
                                        value={dataValueInputs[input.name] ? dataValueInputs[input.name] : ''}
                                        placeholder={input.placeholder}
                                        onChange={methodOnchange}
                                        disabled={
                                            input.name === 'branch_code' ||
                                            input.name === 'Name' ||
                                            input.name === 'PhoneNumber' ||
                                            input.name === 'Email'
                                        }
                                    />
                                </div>
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={cx('modal-actionGr')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                        {label === 'Thêm mới chi nhánh' ? 'Thêm' : 'Cập nhật'}
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAddBranch;
