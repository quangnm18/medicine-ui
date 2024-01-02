import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';

import Modal from '~/components/Modal';

const cx = classNames.bind(style);

function ModalView({ label, dataInputs, dataValueInputs, methodOnchange, methodToggle, methodHandle }) {
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
                </div>

                <div className={cx('modal-action')}>
                    <button className={cx('btn-modal', 'btn-yes')} onClick={methodHandle}>
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
