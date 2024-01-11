import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import UnitMedTb from '~/components/Table/UnitMedTb';
import { useNavigate } from 'react-router-dom';
import Pagination from '~/components/Pagination/Pagination';

const cx = classNames.bind(style);

function UnitMed() {
    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    const [dataTb, setDataTb] = useState([]);

    const [idSelected, setIdSelected] = useState('');
    const [showModalSofDel, setShowModalSofDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

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

    //method toggle

    const toggleModalSoftDel = (id) => {
        setIdSelected(id);
        setShowModalSofDel(!showModalSofDel);
    };

    const toggleModalView = (gr) => {
        setIdSelected(gr.id);
        setShowModalView(!showModalView);

        setValueInputs(gr);
    };

    const toggleModalAdd = (id) => {
        setValueInputs({
            donvi_lon: '',
            donvi_tb: '',
            donvi_nho: '',
            unit_code: '',
            description_unit: '',
        });
        setIdSelected(id);
        setShowModalAdd(!showModalAdd);
    };

    //method handle
    const handleSingleSoftDel = (id) => {
        axios
            .put(`http://localhost:8081/category/medicine/unit/softdelete/${id}`)
            .then((res) => {
                setShowModalSofDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleAdd = () => {
        axios
            .get('http://localhost:8081/category/maxidunit')
            .then((res) => {
                const unit_code = `UC${res.data[0].max_id + 1}`;
                axios
                    .post('http://localhost:8081/category/medicine/unit/add', {
                        ...valueInputs,
                        unit_code: unit_code,
                    })
                    .then((res1) => {
                        setShowModalAdd(false);
                        loadData();
                    })
                    .catch((e) => console.log(e));
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
                    search_value: valuesSearch,
                    isDeleted: 0,
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startRecord]);

    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Quản lý danh mục</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách đơn vị dược</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên..."
                                onChange={onChangeInputSearch}
                                onKeyUp={handleKeyPress}

                                // onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')} onClick={handleSearch}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Thêm
                        </button>
                        <button
                            className={cx('btn-addstaff')}
                            onClick={() => routeChange('/category/unitmedicine/deleted')}
                        >
                            Đã xóa
                        </button>
                    </div>
                </div>
            </div>
            {showModalSofDel && (
                <ModalAll
                    label={'Bạn có muốn xóa?'}
                    methodToggle={toggleModalSoftDel}
                    methodHandle={handleSingleSoftDel}
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
            {showModalAdd && (
                <ModalGr
                    label={'Thêm mới đơn vị'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodToggle={toggleModalAdd}
                    methodOnchange={onChangeInputs}
                    methodHandle={handleAdd}
                />
            )}
            <div className={cx('main-content')}>
                <div className={cx('content-table')}>
                    <UnitMedTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                </div>
                <div>
                    <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
                </div>
            </div>
        </div>
    );
}

export default UnitMed;
