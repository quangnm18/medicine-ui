import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalAddMed({ dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [dataUnitMed, setDataUnitMed] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);

    const [valueUnit, setValueUnit] = useState('');
    const [valueGroup, setValueGroup] = useState('');
    const [error, setError] = useState({});

    //validate
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.ten === '' && !dataValueInputs.ten.trim()) {
            validationError.ten = 'Phải nhập tên dược phẩm';
        }

        if (dataValueInputs.dang_bao_che === '' && !dataValueInputs.dang_bao_che.trim()) {
            validationError.dang_bao_che = 'Phải nhập dạng bào chế dược phẩm';
        }

        if (dataValueInputs.dong_goi === '' && !dataValueInputs.dong_goi.trim()) {
            validationError.dong_goi = 'Phải nhập quy cách đóng gói';
        }

        if (valueUnit === '' && !valueUnit.trim()) {
            validationError.don_vi_duoc = 'Phải chọn đơn vị dược';
        }

        if (valueGroup === '' && !valueGroup.trim()) {
            validationError.nhom_thuoc = 'Phải chọn nhóm thuốc';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle(valueUnit, valueGroup);
        }
    };

    const onChangeSelectedUnit = (obj) => {
        setValueUnit(obj.target.value);
    };

    const onChangeSelectedGr = (obj) => {
        setValueGroup(obj.target.value);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/medicine/unit')
            .then((res) => {
                setDataUnitMed(res.data);
            })
            .catch((e) => console.log(e));

        axios
            .get('http://localhost:8081/category/medicine/group')
            .then((res) => {
                setDataGrMed(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <Modal>
            <div className={cx('modal-view')}>
                <div className={cx('modal-title')}>Thêm mới dược phẩm</div>
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
                                    />
                                </div>
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx('modal-actionAddMed')}>
                    <div className={cx('select-action')}>
                        <div className={cx('choose-unitDetail')}>
                            <label>Đơn vị dược</label>
                            <select className={cx('unit-select')} onChange={onChangeSelectedUnit}>
                                <option value="">Đơn vị</option>
                                {dataUnitMed.map((unit) => (
                                    <option key={unit.id} value={unit.id}>
                                        {unit.description_unit}
                                    </option>
                                ))}
                            </select>
                            {error.don_vi_duoc && <div className={cx('error-validateSelect')}>{error.don_vi_duoc}</div>}
                        </div>
                        <div className={cx('choose-unitDetail')}>
                            <label>Nhóm thuốc</label>
                            <select className={cx('unit-select')} onChange={onChangeSelectedGr}>
                                <option value=""></option>
                                {dataGrMed.map((gr) => (
                                    <option key={gr.id} value={gr.id}>
                                        {gr.ten_nhom_thuoc}
                                    </option>
                                ))}
                            </select>
                            {error.nhom_thuoc && <div className={cx('error-validateSelect')}>{error.nhom_thuoc}</div>}
                        </div>
                    </div>

                    <div className={cx('modal-actionBtn')}>
                        <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                            Thêm
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
