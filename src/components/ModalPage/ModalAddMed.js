import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalAddMed({
    label,
    dataInputs,
    dataValueInputs,
    methodOnchange,
    methodToggle,
    methodHandle,
    methodValueSelect,
}) {
    const [dataUnitMed, setDataUnitMed] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);
    const [error, setError] = useState({});

    //validate
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.ten === '' && !dataValueInputs.ten.trim()) {
            validationError.ten = 'Phải nhập tên dược phẩm';
        }

        if (dataValueInputs.don_vi_duoc === '' || dataValueInputs.don_vi_duoc === '0') {
            validationError.don_vi_duoc = 'Phải chọn đơn vị dược';
        }

        if (dataValueInputs.nhom_thuoc === '' || dataValueInputs.nhom_thuoc === '0') {
            validationError.nhom_thuoc = 'Phải chọn nhóm thuốc';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };

    const onChangeSelected = (e) => {
        console.log(typeof e.target.value);
        methodValueSelect({ ...dataValueInputs, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/medicineunitall`)
            .then((res) => {
                setDataUnitMed(res.data);
            })
            .catch((e) => console.log(e));

        axios
            .get(`${baseUrl}category/medicine/group`)
            .then((res) => {
                setDataGrMed(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>{label}</div>
                <div className={cx('modal-form')}>
                    <div className={cx('modal-if')}>
                        {dataInputs.map((input) => (
                            <div key={input.id} className={cx('if-detail')}>
                                <div>
                                    <div className={cx('label')}>{input.label}</div>
                                    <input
                                        name={input.name}
                                        value={dataValueInputs[input.name]}
                                        placeholder={input.placeholder}
                                        onChange={methodOnchange}
                                        type={input.type}
                                    />
                                </div>
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                        <div className={cx('select-action')}>
                            <div className={cx('choose-unitDetail')}>
                                <label>Đơn vị dược</label>
                                <select
                                    className={cx('unit-select')}
                                    name="don_vi_duoc"
                                    onChange={onChangeSelected}
                                    value={dataValueInputs.don_vi_duoc}
                                >
                                    <option value={0}></option>
                                    {dataUnitMed.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.description_unit}
                                        </option>
                                    ))}
                                </select>
                                {error.don_vi_duoc && (
                                    <div className={cx('error-validateSelect')}>{error.don_vi_duoc}</div>
                                )}
                            </div>
                            <div className={cx('choose-unitDetail')}>
                                <label>Nhóm thuốc</label>
                                <select
                                    className={cx('unit-select')}
                                    name="nhom_thuoc"
                                    onChange={onChangeSelected}
                                    value={dataValueInputs.nhom_thuoc}
                                >
                                    <option value={0}></option>
                                    {dataGrMed.map((gr) => (
                                        <option key={gr.id} value={gr.id}>
                                            {gr.ten_nhom_thuoc}
                                        </option>
                                    ))}
                                </select>
                                {error.nhom_thuoc && (
                                    <div className={cx('error-validateSelect')}>{error.nhom_thuoc}</div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx('modal-actionBtn')}>
                    <div>
                        <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                            {label === 'Thêm mới dược phẩm' ? 'Thêm' : 'Cập nhật'}
                        </button>
                        <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAddMed;
