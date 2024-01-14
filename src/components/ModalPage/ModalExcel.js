import Modal from '~/components/Modal';

import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';
import { useState } from 'react';
import * as XLSX from 'xlsx';

const cx = classNames.bind(style);

function ModalAddExcel({ methodToggle }) {
    const [excelFile, setExcelFile] = useState(null);
    const [typeErrorr, setTypeError] = useState(null);

    const [excelData, setExcelData] = useState(null);

    const handleFile = (e) => {
        let fileType = [
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-excel',
            'text/csv',
        ];
        let selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && fileType.includes(selectedFile.type)) {
                setTypeError(null);
                let reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = (e) => {
                    setExcelFile(e.target.result);
                };
            } else {
                setTypeError('Hãy chọn đúng định dạng file Excel');
                setExcelFile(null);
            }
        }
    };

    const handleFileSubmit = () => {
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'buffer' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);
            setExcelData(data.slice(0, 10));
        }
    };

    return (
        <Modal>
            <div className={cx('wrapper-excel')}>
                <h4 className={cx('title-excel')}>Nhập khẩu Excel</h4>

                <div className={cx('custom-form')}>
                    <label htmlFor="file-upload" className={cx('btn-excel')}>
                        Upload File
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept=".xlsx"
                        className={cx('form-control')}
                        required
                        hidden
                        onChange={handleFile}
                    />
                    <button className={cx('btn-excel')} onClick={handleFileSubmit}>
                        Prevew
                    </button>
                    {typeErrorr && <div className={cx('alert-err')}>{typeErrorr}</div>}
                </div>

                <div className={cx('viewer')}>
                    {excelData ? (
                        <div className={cx('table-excel')}>
                            <table>
                                <thead>
                                    <tr>
                                        {Object.keys(excelData[0]).map((key) => (
                                            <th key={key}>{key}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody>
                                    {excelData.map((individual, index) => (
                                        <tr key={index}>
                                            {Object.keys(individual).map((key) => (
                                                <td key={key}>{individual[key]}</td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div>Tệp chưa được tải lên!</div>
                    )}
                </div>

                <div className={cx('modalEx-action')}>
                    <button className={cx('btn-modal')} onClick={methodToggle}>
                        Nhập
                    </button>
                    <button className={cx('btn-modal')} onClick={methodToggle}>
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAddExcel;
