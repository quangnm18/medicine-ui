import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import UnitMedDelTb from '~/components/Table/UnitMedDelTb';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function UnitMedDel() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [dataTb, setDataTb] = useState([]);
    const [idSelected, setIdSelected] = useState('');

    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHarDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);

    const [valuesSearch, setValuesSearch] = useState('');
    const [valueInputs, setValueInputs] = useState({
        donvi_lon: '',
        donvi_tb: '',
        donvi_nho: '',
        unit_code: '',
        description_unit: '',
    });

    const dataInputs = [
        {
            id: 1,
            label: 'Đơn vị lớn',
            name: 'donvi_lon',
            type: 'text',
            placeholder: 'Hộp,...',
        },
        {
            id: 2,
            label: 'Đơn vị TB',
            name: 'donvi_tb',
            type: 'text',
            placeholder: 'Vỉ,...',
        },
        {
            id: 3,
            label: 'Đơn vị nhỏ',
            name: 'donvi_nho',
            type: 'text',
            placeholder: 'Viên,...',
        },
        {
            id: 5,
            label: 'Mô tả',
            name: 'description_unit',
            type: 'text',
            placeholder: 'Hộp-Vỉ-Viên',
        },
    ];

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onChangeInputs = (e) => {
        setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    };

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    //method toggle

    const toggleModalRes = (id) => {
        setIdSelected(id);
        setShowModalRes(!showModalRes);
    };

    const toggleModalHardDel = (id) => {
        setIdSelected(id);
        setShowModalHarDel(!showModalHardDel);
    };

    const toggleModalView = (gr) => {
        setIdSelected(gr.id);
        setShowModalView(!showModalView);

        setValueInputs(gr);
    };

    //method handle

    const handleRes = (id) => {
        axios
            .put(`http://localhost:8081/category/medicine/unit/restore/${id}`)
            .then((res) => {
                setShowModalRes(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleHardDel = (id) => {
        axios
            .delete(`http://localhost:8081/category/medicine/unit/harddelete/${id}`)
            .then((res) => {
                setShowModalHarDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = (id) => {
        axios
            .put(`http://localhost:8081/category/medicine/unit/update/${idSelected}`, valueInputs)
            .then((res) => {
                setShowModalView(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    //method call api
    const loadData = () => {
        axios
            .get('http://localhost:8081/category/medicineunit/', {
                params: {
                    isDeleted: 1,
                    numRecord: numRecord,
                    startRecord: startRecord,
                    totalRecord: 0,
                },
            })
            .then((res) => {
                setDataTb(res.data[0]);
                const totalRecord = res.data[1][0].totalRecord;
                setPageCount(Math.ceil(totalRecord / numRecord));
            })
            .catch((err) => console.log(err));
    };

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        loadData();
    }, [startRecord]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách đơn vị đã xóa</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên..."
                                onChange={onChangeInputSearch}
                                // onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>

                        <button className={cx('btn-addstaff')} onClick={() => routeChange('/category/unitmedicine')}>
                            Trở lại
                        </button>
                    </div>
                </div>
            </div>

            {showModalRes && (
                <ModalAll
                    label={'Bạn có muốn khôi phục?'}
                    methodToggle={toggleModalRes}
                    methodHandle={handleRes}
                    data={idSelected}
                />
            )}

            {showModalHardDel && (
                <ModalAll
                    label={'Bạn có muốn xóa vĩnh viễn?'}
                    methodToggle={toggleModalHardDel}
                    methodHandle={handleHardDel}
                    data={idSelected}
                />
            )}

            {showModalView && (
                <ModalGr
                    label={'Thông tin chi tiết đơn vị'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodOnchange={onChangeInputs}
                    methodToggle={toggleModalView}
                    methodHandle={handleUpdate}
                />
            )}

            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <UnitMedDelTb data={dataTb} method={{ toggleModalRes, toggleModalView, toggleModalHardDel }} />
                </div>
                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default UnitMedDel;
