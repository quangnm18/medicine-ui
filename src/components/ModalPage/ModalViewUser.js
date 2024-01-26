import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import { useEffect, useState } from 'react';
import Modal from '~/components/Modal';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalViewUser({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [allRole, setAllRole] = useState([]);
    const [error, setError] = useState({});
    const validator = () => {
        const validationError = {};
        if (dataValueInputs.Name === '' && !dataValueInputs.Name.trim()) {
            validationError.Name = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.PhoneNumber === '' && !dataValueInputs.PhoneNumber.trim()) {
            validationError.PhoneNumber = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.Email === '' && !dataValueInputs.Email.trim()) {
            validationError.Email = 'Trường này là bắt buộc';
        } else if (!/\S+@\S+\.\S+/.test(dataValueInputs.Email)) {
            validationError.Email = 'Email không hợp lệ';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/category/roles')
            .then((res) => {
                setAllRole(res.data);
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <Modal>
            <div className={cx('modal-viewAll')}>
                <div className={cx('modal-title')}>{label}</div>
                <div className={cx('modal-form')}>
                    <div className={cx('modalAll-if')}>
                        {dataInputs.map((input) => (
                            <div key={input.id} className={cx('if-detailAll')}>
                                <div className={cx('label')}>{input.label}</div>
                                <input
                                    name={input.name}
                                    value={dataValueInputs[input.name] ? dataValueInputs[input.name] : ''}
                                    placeholder={input.placeholder}
                                    onChange={methodOnchange}
                                    type={input.type}
                                />
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                        <div>
                            <label htmlFor="role-select">Vai trò</label>
                            <select
                                className={cx('role-select')}
                                name="role-select"
                                value={dataValueInputs.Role}
                                onChange={(e) => console.log(e.target.value)}
                            >
                                {allRole.map((role) => (
                                    <option key={role.id} className={cx('role-option')} value={role.id}>
                                        {role.ten_vai_tro}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                <div className={cx('modalViewAll-action')}>
                    {JSON.parse(localStorage.getItem('data_user')).role === 'ADM' && (
                        <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                            Cập nhật
                        </button>
                    )}

                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalViewUser;
