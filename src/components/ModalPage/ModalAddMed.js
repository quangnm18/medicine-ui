import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalAddMed({ dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [dataUnitMed, setDataUnitMed] = useState([]);

    const [valueUnit, setValueUnit] = useState('');

    // const handleUpdateValuesSelect = (selectedId) => {
    //     const arr = dataUnitMed.filter((unit) => unit.id === selectedId);
    //     setValuesSelect({ ...valuesSelect, donvi_lon: arr[0].name });
    // };

    // const onChangeSelectMax = (selectedObj) => {
    //     setValuesSelect({ ...valuesSelect, donvi_lon: selectedObj.target.value });
    // };

    // const onChangeSelectMedium = (selectedObj) => {
    //     setValuesSelect({ ...valuesSelect, donvi_tb: selectedObj.target.value });
    // };

    // const onChangeSelectMin = (selectedObj) => {
    //     setValuesSelect({ ...valuesSelect, donvi_nho: selectedObj.target.value });
    // };

    //handle

    const handleAdd = () => {
        axios
            .put('http://localhost:8081/category/medicine/unit/medcreate')
            .then((res) => {
                console.log(res);
                // methodHandle(res.data.id);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/medicine/unit/med')
            .then((res) => {
                setDataUnitMed(res.data);
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
                </div>
                <div className={cx('modal-action')}>
                    <div className={cx('choose-unitDetail')}>
                        <label>Đơn vị dược</label>
                        <select name="max" className={cx('unit-select')}>
                            <option value="">Đơn vị</option>
                            {dataUnitMed.map((unit) => (
                                <option key={unit.id} value={unit.id}>
                                    {unit.mo_ta}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={cx('modal-actionBtn')}>
                        <button className={cx('btn-modal', 'btn-yes')} onClick={handleAdd}>
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
