import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalAdd({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [dataUnitMed, setDataUnitMed] = useState([]);

    const [valuesSelect, setValuesSelect] = useState({
        max_unit: '',
        medium_unit: '',
        min_unit: '',
    });

    const onChangeSelectMax = (selectedObj) => {
        setValuesSelect({ ...valuesSelect, max_unit: selectedObj.target.value });
    };

    const onChangeSelectMedium = (selectedObj) => {
        setValuesSelect({ ...valuesSelect, medium_unit: selectedObj.target.value });
    };

    const onChangeSelectMin = (selectedObj) => {
        setValuesSelect({ ...valuesSelect, min_unit: selectedObj.target.value });
    };

    //handle

    const handleAdd = () => {
        axios
            .put('http://localhost:8081/category/medicine/unit/medcreate', valuesSelect)
            .then((res) => {
                methodHandle(res.data.id);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/medicine/unit/all')
            .then((res) => {
                setDataUnitMed(res.data);
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
                                <div className={cx('label')}>{input.placeholder}</div>
                                <input
                                    name={input.name}
                                    value={dataValueInputs[input.name]}
                                    placeholder={input.placeholder}
                                    onChange={methodOnchange}
                                />
                            </div>
                        ))}
                    </div>

                    {label === 'Thêm mới dược phẩm' && (
                        <div className={cx('choose-unit')}>
                            <div>
                                <label>Max Unit</label>
                                <select name="max" onChange={onChangeSelectMax}>
                                    <option value="">Đơn vị</option>
                                    {dataUnitMed.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Medium Unit</label>
                                <select name="medium" onChange={onChangeSelectMedium}>
                                    <option value="">Đơn vị</option>
                                    {dataUnitMed.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label>Min Unit</label>
                                <select name="min" onChange={onChangeSelectMin}>
                                    <option value="">Đơn vị</option>
                                    {dataUnitMed.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                <div className={cx('modal-action')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={handleAdd}>
                        Thêm
                    </button>
                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAdd;
