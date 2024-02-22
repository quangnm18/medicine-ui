import Modal from '~/components/Modal';

import classNames from 'classnames/bind';
import style from './ModalPage.module.scss';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import download from 'downloadjs';
import { notify } from '~/utils/toast';

const cx = classNames.bind(style);

function ModalAddExcel({ methodToggle, methodLoad }) {
    const [excelFile, setExcelFile] = useState(null);
    const [typeErrorr, setTypeError] = useState(null);

    const [excelData, setExcelData] = useState(null);

    const [optionSheet, setOptionSheet] = useState({ sheetPage: '', header: '' });
    const [stateImport, setStateImport] = useState(0);
    const [validStatus, setValidStatus] = useState(false);

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

    // const handleFilePreview = () => {
    //     if (excelFile !== null) {
    //         const workbook = XLSX.read(excelFile, { type: 'buffer' });
    //         const worksheetName = workbook.SheetNames[0];
    //         const worksheet = workbook.Sheets[worksheetName];
    //         const data = XLSX.utils.sheet_to_json(worksheet);
    //         setExcelData(data.slice(0, 10));
    //     }
    // };

    const onChangeOption = (e) => {
        setOptionSheet({ ...optionSheet, [e.target.name]: e.target.value });
    };

    const getTemplate = () => {
        let url = process.env.REACT_APP_INVOICE_URL + 'import/template?catalog=1';
        window.open(url);
    };

    const test = async () => {
        var fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        let path =
            stateImport === 0
                ? `import/validate?sheetName=${optionSheet.sheetPage}&header=${optionSheet.header - 1}&catalog=1`
                : `import/save?sheetName=${optionSheet.sheetPage}&header=${optionSheet.header - 1}&catalog=1`;
        let url = process.env.REACT_APP_INVOICE_URL + path;
        try {
            const response = await fetch(url, {
                method: 'POST',
                body: formData,
            });
            const result = await response.json();

            if (stateImport === 0) {
                if (!result.valid) {
                    setValidStatus(true);
                    setTypeError(
                        'Có dòng không hợp lệ. Tải file validate về để xem lỗi. Chọn "Nhập khẩu" nếu muốn tiếp tục nhập những dòng hợp lệ.',
                    );
                } else {
                    setValidStatus(false);
                }
                setStateImport(1);
            } else {
                notify(`Nhập khẩu thành công ${result.valid}/${result.total} dòng`, 'success');
                methodToggle();
                methodLoad();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const downloadFileValid = async (e) => {
        e.preventDefault();
        var fileInput = document.getElementById('file-upload');
        const file = fileInput.files[0];
        const formData = new FormData();
        formData.append('file', file);
        let path = `import/download/validate?sheetName=${optionSheet.sheetPage}&header=${
            optionSheet.header - 1
        }&catalog=1`;
        let url = process.env.REACT_APP_INVOICE_URL + path;
        let response = await fetch(url, { method: 'POST', body: formData });
        const result = await response.blob();

        download(result);
    };

    return (
        <Modal>
            <div className={cx('wrapper-excel')}>
                <h4 className={cx('title-excel')}>Nhập khẩu Excel</h4>

                <div className={cx('custom-form')}>
                    <div className={cx('direct-action')}>
                        <label htmlFor="file-upload" className={cx('btn-excel', 'btn-label')}>
                            Tải lên
                        </label>
                        <form encType="multipart/form-data">
                            <input
                                id="file-upload"
                                type="file"
                                accept=".xlsx"
                                className={cx('form-control')}
                                required
                                onChange={handleFile}
                            />
                            <button
                                className={cx('btn-excel', 'btn-import')}
                                type="button"
                                onClick={async () => {
                                    await test();
                                }}
                            >
                                {stateImport === 0 ? 'Kiểm tra' : 'Nhập khẩu'}
                            </button>
                            {validStatus && (
                                <button
                                    className={cx('btn-excel', 'btn-valid')}
                                    onClick={async (e) => {
                                        await downloadFileValid(e);
                                    }}
                                >
                                    Tải File Validate
                                </button>
                            )}
                        </form>

                        <div>
                            <button className={cx('btn-excel', 'btn-preview')} onClick={getTemplate}>
                                <FontAwesomeIcon icon={faDownload} /> Template
                            </button>
                            {/* <button className={cx('btn-excel', 'btn-preview')} onClick={handleFilePreview}>
                                Prevew
                            </button> */}
                        </div>
                    </div>
                </div>
                {typeErrorr && <div className={cx('alert-err')}>{typeErrorr}</div>}

                <div className={cx('wrap-option')}>
                    <div className={cx('wrap-input')}>
                        <label>Trang Excel</label>
                        <input
                            placeholder="Nhập trang Sheet bạn muốn nhập..."
                            name="sheetPage"
                            value={optionSheet.sheetPage}
                            onChange={onChangeOption}
                        />
                    </div>

                    <div className={cx('wrap-input')}>
                        <label>Dòng bắt đầu</label>
                        <input
                            placeholder="Chọn dòng đầu tiên nhập..."
                            name="header"
                            value={optionSheet.header}
                            onChange={onChangeOption}
                        />
                    </div>
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
                        Trở lại
                    </button>
                </div>
            </div>
        </Modal>
    );
}

export default ModalAddExcel;
