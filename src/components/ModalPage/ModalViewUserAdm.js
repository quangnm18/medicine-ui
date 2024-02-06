import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import { useEffect, useState } from 'react';
import Modal from '~/components/Modal';
import axios from 'axios';

const cx = classNames.bind(style);

function ModalViewUserAdm({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
    const [allRole, setAllRole] = useState([]);
    const [allBranch, setAllBranch] = useState([]);

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

        if (dataValueInputs.Role === 0) {
            validationError.Role = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.user_name === '' && !dataValueInputs.user_name.trim()) {
            validationError.user_name = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.password === '' && !dataValueInputs.password.trim()) {
            validationError.password = 'Trường này là bắt buộc';
        }

        if (dataValueInputs.branch_id === 0) {
            validationError.branch_id = 'Trường này là bắt buộc';
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            methodHandle();
        }
    };

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}category/roles`)
            .then((res) => {
                setAllRole(res.data);
            })
            .catch((e) => console.log(e));

        axios
            .get(`${baseUrl}branch`)
            .then((res1) => {
                setAllBranch(res1.data);
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
                            <div key={input.id} className={cx('if-detailAll', 'if-detailAlluser')}>
                                <div
                                    className={cx(
                                        'label',
                                        (input.name === 'Name' ||
                                            input.name === 'PhoneNumber' ||
                                            input.name === 'Email' ||
                                            input.name === 'user_name' ||
                                            input.name === 'password') &&
                                            'required',
                                    )}
                                >
                                    {input.label}
                                </div>
                                <input
                                    name={input.name}
                                    value={dataValueInputs[input.name] ? dataValueInputs[input.name] : ''}
                                    placeholder={input.placeholder}
                                    onChange={methodOnchange}
                                    type={input.type}
                                    disabled={input.name === 'branch' && true}
                                />
                                {error[input.name] && <div className={cx('error-validate')}>{error[input.name]}</div>}
                            </div>
                        ))}
                        <div className={cx('if-detailAll', 'if-detailAlluser')}>
                            <label htmlFor="Role" className={cx('required')}>
                                Vai trò
                            </label>
                            <select
                                className={cx('role-select')}
                                name="Role"
                                value={dataValueInputs.Role}
                                onChange={methodOnchange}
                            >
                                <option>--Chọn vai trò--</option>
                                {allRole.map((role) => (
                                    <option key={role.id} className={cx('role-option')} value={role.id}>
                                        {role.ten_vai_tro}
                                    </option>
                                ))}
                            </select>
                            {error['Role'] && <div className={cx('error-validate')}>{error['Role']}</div>}
                        </div>
                        <div className={cx('if-detailAll', 'if-detailAlluser')}>
                            <label htmlFor="branch_id" className={cx('required')}>
                                Chi nhánh
                            </label>
                            <select
                                className={cx('role-select')}
                                name="branch_id"
                                value={dataValueInputs.branch_id}
                                onChange={methodOnchange}
                            >
                                <option>--Chọn chi nhánh--</option>
                                {allBranch.map((branch) => (
                                    <option key={branch.id} className={cx('role-option')} value={branch.id}>
                                        {branch.name}
                                    </option>
                                ))}
                            </select>
                            {error['branch_id'] && <div className={cx('error-validate')}>{error['branch_id']}</div>}
                        </div>
                    </div>
                </div>

                <div className={cx('modalViewAll-action')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={validator}>
                        {label === 'Thông tin người dùng' ? 'Cập nhật' : 'Thêm'}
                    </button>

                    <button className={cx('btn-modal', 'btn-no')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalViewUserAdm;
