import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Report.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReportTb from '~/components/Table/ReportTb';
import { useEffect, useState } from 'react';
import Modal from '~/components/Modal';
import axios from 'axios';
import { notify } from '~/utils/toast';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalAll from '~/components/ModalPage/ModalAll';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function ReportAdm() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalSoftDel, setShowModalSoftDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [dataTb, setDataTb] = useState([]);
    const [idSelected, setIdSelected] = useState();

    const [numRecord, setNumRecord] = useState(10);
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [sort, setSort] = useState({ sort_col: 1, sort_type: 'asc' });

    const [valuesSearch, setValuesSearch] = useState('');
    const [formRp, setFormRp] = useState({ title: '', content: '', updateNote: '' });

    const [selectBranch, setSelectBranch] = useState(undefined);

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onchangeForm = (e) => {
        setFormRp({ ...formRp, [e.target.name]: e.target.value });
    };

    const onChangerNum = (e) => {
        setNumRecord(e.target.value);
    };

    const handleSearch = () => {
        loadData();
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleSearch();
        }
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //toggle

    const toggleModalAdd = () => {
        setShowModalAdd(!showModalAdd);
    };

    const toggleModalView = (data) => {
        setShowModalView(!showModalView);
        setIdSelected(data);
        setFormRp({ ...formRp, updateNote: data.updateNote ? data.updateNote : '' });
    };

    const toggleModalSoftDel = (id) => {
        setShowModalSoftDel(!showModalSoftDel);
        setIdSelected(id);
    };

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };
    // const validator = () => {
    //     const validationError = {};
    //     if (dataValueInputs.donvi_lon === '' && !dataValueInputs.donvi_lon.trim()) {
    //         validationError.donvi_lon = 'Phải nhập đơn vị lớn nhất';
    //     }

    //     if (dataValueInputs.donvi_nho === '' && !dataValueInputs.donvi_nho.trim()) {
    //         validationError.donvi_nho = 'Phải nhập đơn vị nhỏ nhất';
    //     }

    //     setError(validationError);

    //     if (Object.keys(validationError).length === 0) {
    //         methodHandle();
    //     }
    // };

    //method handle

    const handleAddRp = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .post(`${baseUrl}report/create`, {
                creator_id: user.userId,
                title: formRp.title,
                content: formRp.content,
            })
            .then((res) => {
                setShowModalAdd(false);
                loadData();
                notify('Tạo báo cáo thành công', 'success');
            })
            .catch((e) => console.log(e));
    };

    const handleSoftDel = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .put(`${baseUrl}report/softdel/${idSelected}`)
            .then((res) => {
                setShowModalSoftDel(false);
                loadData();
                notify('Xóa thành công', 'success');
            })
            .catch((e) => console.log(e));
    };

    const loadData = () => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}report/`, {
                params: {
                    sort_col: sort.sort_col,
                    sort_type: sort.sort_type,
                    search_value: valuesSearch,
                    user_id: user.userId,
                    branch_id: user.id_chi_nhanh,
                    myself: 1,
                    isDeleted: 0,
                    numRecord: numRecord,
                    startRecord: startRecord,
                    totalRecord: 0,
                },
            })
            .then((res) => {
                const totalRecord = res.data[1][0].totalRecord;
                setPageCount(Math.ceil(totalRecord / numRecord));
                setDataTb(res.data[0]);
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord, selectBranch, sort, numRecord]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Báo cáo</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Báo cáo đã tạo</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                placeholder="Tìm kiếm theo SĐT, Email, ..."
                                onChange={onChangeInputSearch}
                                value={valuesSearch}
                                onKeyUp={handleKeyPress}
                            />
                            <button className={cx('search-btn')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Tạo báo cáo
                        </button>

                        <button className={cx('btn-addstaff')} onClick={() => routeChange('/report')}>
                            Báo cáo nhân viên
                        </button>
                    </div>
                </div>
            </div>
            <ToastContainer />
            {showModalAdd && (
                <div>
                    <Modal>
                        <div className={cx('wrap-modalview')}>
                            <div className={cx('title-modalView')}>Lập báo cáo</div>

                            <div className={cx('view-detail')}>
                                <label className={cx('required')}>Tiêu đề: </label>
                                <input name="title" value={formRp.title} onChange={onchangeForm} />
                            </div>

                            <div className={cx('view-detail', 'detail-content')}>
                                <label className={cx('required')}>Nội dung:</label>
                                <textarea
                                    name="content"
                                    cols={40}
                                    rows={5}
                                    value={formRp.content}
                                    onChange={onchangeForm}
                                />
                            </div>

                            <div className={cx('view-detailbtn')}>
                                <button className={cx('btn-add')} onClick={handleAddRp}>
                                    Tạo
                                </button>
                                <button className={cx('btn-add', 'btn-close')} onClick={toggleModalAdd}>
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}

            {showModalView && (
                <div>
                    <Modal>
                        <div className={cx('wrap-modalview')}>
                            <div className={cx('title-modalView')}>Nội dung báo cáo</div>

                            <div className={cx('view-detail')}>
                                <label className={cx('required')}>Tiêu đề: </label>
                                <input name="title" value={idSelected.title ? idSelected.title : ''} disabled />
                            </div>

                            <div className={cx('view-detail', 'detail-content')}>
                                <label className={cx('required')}>Nội dung:</label>
                                <textarea
                                    name="content"
                                    cols={40}
                                    rows={5}
                                    value={idSelected.content ? idSelected.content : ''}
                                    disabled
                                />
                            </div>

                            <div className={cx('view-detail', 'detail-content')}>
                                <label>Ghi chú:</label>

                                <textarea
                                    name="updateNote"
                                    cols={40}
                                    rows={4}
                                    value={formRp.updateNote}
                                    onChange={onchangeForm}
                                    disabled
                                />
                            </div>

                            <div className={cx('view-detailbtn')}>
                                <button className={cx('btn-add', 'btn-close')} onClick={toggleModalView}>
                                    Đóng
                                </button>
                            </div>
                        </div>
                    </Modal>
                </div>
            )}

            {showModalSoftDel && (
                <ModalAll label={'Bạn có muốn xóa ?'} methodToggle={toggleModalSoftDel} methodHandle={handleSoftDel} />
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <ReportTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                </div>
                <div className={cx('wrap-paginate')}>
                    <select value={numRecord} onChange={onChangerNum}>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={30}>30</option>
                        <option value={40}>40</option>
                    </select>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default ReportAdm;
