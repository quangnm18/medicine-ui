import classNames from 'classnames/bind';
import style from './ModalUnitGr.module.scss';

import Modal from '~/components/Modal';
import { useState } from 'react';

const cx = classNames.bind(style);

function ModalGr({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    console.log(dataValueInputs);
    const [error, setError] = useState({});
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.donvi_lon === '' && !dataValueInputs.donvi_lon.trim()) {
            validationError.donvi_lon = 'Phải nhập đơn vị lớn nhất';
        }

        if (dataValueInputs.donvi_nho === '' && !dataValueInputs.donvi_nho.trim()) {
            validationError.donvi_nho = 'Phải nhập đơn vị nhỏ nhất';
        }

        if (dataValueInputs.ten_nhom_thuoc === '' && !dataValueInputs.ten_nhom_thuoc.trim()) {
            validationError.ten_nhom_thuoc = 'Phải nhập tên nhóm thuốc';
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
                                            (input.name === 'Name' ||
                                                input.name === 'donvi_lon' ||
                                                input.name === 'donvi_nho' ||
                                                input.name === 'ten_nhom_thuoc') &&
                                                'required',
                                        )}
                                    >
                                        {input.label}:
                                    </div>

                                    <input
                                        name={input.name}
                                        value={dataValueInputs[input.name] ? dataValueInputs[input.name] : ''}
                                        placeholder={input.placeholder}
                                        onChange={methodOnchange}
                                        disabled={input.name === 'userId_del' || input.name === 'Name'}
                                    />
                                </div>
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                        {label === 'Thông tin chi tiết nhóm dược' && (
                            <div>
                                <div className={cx('if-detailGr')}>
                                    <div className={cx('label-gr')}>Mã nhóm thuốc:</div>
                                    <input name="group_code" value={dataValueInputs.group_code} disabled />
                                </div>
                                <div className={cx('if-detailGr', 'wrap_area')}>
                                    <div className={cx('label-gr')}>Mô tả:</div>
                                    <textarea
                                        name="description"
                                        value={dataValueInputs.description ? dataValueInputs.description : ''}
                                        placeholder="Mô tả thông tin nhóm dược"
                                        onChange={methodOnchange}
                                        cols={40}
                                        rows={5}
                                    />
                                </div>
                            </div>
                        )}

                        {label === 'Thêm mới nhóm dược' && (
                            <div className={cx('if-detailGr')}>
                                <div className={cx('label-gr')}>Mô tả:</div>
                                <textarea
                                    name="description"
                                    value={dataValueInputs.description}
                                    placeholder="Mô tả thông tin nhóm dược"
                                    onChange={methodOnchange}
                                    cols={40}
                                    rows={5}
                                />
                            </div>
                        )}

                        {label === 'Thông tin chi tiết đơn vị' && (
                            <div className={cx('if-detailGr')}>
                                <div className={cx('label-gr')}>Mã đơn vị:</div>
                                <input name="unit_code" value={dataValueInputs.unit_code} disabled />
                            </div>
                        )}
                    </div>
                </div>

                <div className={cx('modal-actionGr')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                        {label === 'Thêm mới nhóm dược' ? 'Thêm' : 'Cập nhật'}
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalGr;
