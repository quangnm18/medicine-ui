import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import GroupMedTb from '~/components/Table/GroupMedTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import UnitMedTb from '~/components/Table/UnitMedTb';
import UnitMedDelTb from '~/components/Table/UnitMedDelTb';

const cx = classNames.bind(style);

function UnitMed() {
    const [stateBin, setStateBin] = useState(false);
    const [idSelected, setIdSelected] = useState('');

    const [dataAllUnit, setDataAllUnit] = useState([]);
    const [dataUnit, setDataUnit] = useState([]);
    const [dataTb, setDataTb] = useState([]);
    const [dataUnitDel, setDataUnitDel] = useState([]);
    const [dataTbDel, setDataTbDel] = useState([]);

    const [showModalSofDel, setShowModalSofDel] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHarDel] = useState(false);
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

    //method toggle

    const toggleModalSoftDel = (id) => {
        setIdSelected(id);
        setShowModalSofDel(!showModalSofDel);
    };

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

    const toggleBin = () => {
        setStateBin(!stateBin);
        loadData();
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

    const handleAdd = () => {
        const id = dataAllUnit[0].id + 1;
        axios
            .post('http://localhost:8081/category/medicine/unit/add', { ...valueInputs, unit_code: `UC${id}` })
            .then((res) => {
                setShowModalAdd(false);
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
            .get('http://localhost:8081/category/medicine/unit')
            .then((res) => {
                setDataAllUnit(res.data);
                setDataUnit(res.data.filter((unit) => unit.isDeleted === 0));
                setDataTb(res.data.filter((unit) => unit.isDeleted === 0));

                setDataUnitDel(res.data.filter((unit) => unit.isDeleted !== 0));
                setDataTbDel(res.data.filter((unit) => unit.isDeleted !== 0));
            })
            .catch((e) => console.log(e));
    };

    useEffect(() => {
        loadData();
    }, []);

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
                                // onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Thêm
                        </button>
                        <button className={cx('btn-addstaff')} onClick={toggleBin}>
                            {stateBin ? 'Trở lại' : 'Đã xóa'}
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
                {stateBin ? (
                    <UnitMedDelTb data={dataTbDel} method={{ toggleModalRes, toggleModalView, toggleModalHardDel }} />
                ) : (
                    <UnitMedTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                )}
            </div>
        </div>
    );
}

export default UnitMed;
