import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './UnitGroupMed.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useCallback, useEffect, useState } from 'react';

import axios from 'axios';
import GroupMedTb from '~/components/Table/GroupMedTb';
import ModalAll from '~/components/ModalPage/ModalAll';
import ModalGr from '~/components/ModalPage/ModalUnitGr/ModalGr';
import GrMedTbDeleted from '~/components/Table/GrMedTbDeleted';

const cx = classNames.bind(style);

function GroupMed() {
    const [allDataGr, setAllDataGr] = useState([]);
    const [dataGrMed, setDataGrMed] = useState([]);
    const [dataTb, setDataTb] = useState([]);
    const [dataGrMedDel, setDataGrMedDel] = useState([]);
    const [dataTbDel, setDataTbDel] = useState([]);

    const [idSelected, setIdSelected] = useState('');

    const [valuesSearch, setValuesSearch] = useState('');

    const [showModalSofDel, setShowModalSofDel] = useState(false);
    const [showModalRes, setShowModalRes] = useState(false);
    const [showModalHardDel, setShowModalHarDel] = useState(false);
    const [showModalView, setShowModalView] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);

    const [stateBin, setStateBin] = useState(false);

    const [valueInputs, setValueInputs] = useState({
        ten_nhom_thuoc: '',
        group_code: '',
        description: '',
    });

    const dataInputs = [
        {
            id: 1,
            label: 'Tên nhóm thuốc',
            name: 'ten_nhom_thuoc',
            type: 'text',
            placeholder: 'Thuốc dạ dày,...',
        },
    ];

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
            ten_nhom_thuoc: '',
            group_code: '',
            description: '',
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
            .put(`http://localhost:8081/category/medicine/group/softdelete/${id}`)
            .then((res) => {
                setShowModalSofDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleRes = (id) => {
        axios
            .put(`http://localhost:8081/category/medicine/group/restore/${id}`)
            .then((res) => {
                setShowModalRes(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleHardDel = (id) => {
        axios
            .delete(`http://localhost:8081/category/medicine/group/harddelete/${id}`)
            .then((res) => {
                setShowModalHarDel(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleAdd = () => {
        axios
            .post('http://localhost:8081/category/medicine/group/add', {
                ...valueInputs,
                group_code: `N${allDataGr[0].id + 1}`,
            })
            .then((res) => {
                setShowModalAdd(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    const handleUpdate = (id) => {
        axios
            .put(`http://localhost:8081/category/medicine/group/update/${idSelected}`, valueInputs)
            .then((res) => {
                setShowModalView(false);
                loadData();
            })
            .catch((e) => console.log(e));
    };

    //method #

    const onChangeInputSearch = (e) => {
        setValuesSearch(e.target.value);
    };

    const onChangeInputGrMed = (e) => {
        setValueInputs({ ...valueInputs, [e.target.name]: e.target.value });
    };

    const handleFilter = () => {
        if (stateBin) {
            if (valuesSearch.length) {
                const arr = dataGrMedDel.filter((gr) => {
                    return gr.ten_nhom_thuoc.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
                });
                setDataTbDel(arr);
            } else {
                setDataTbDel(dataGrMedDel);
            }
        } else {
            if (valuesSearch.length) {
                const arr = dataGrMed.filter((gr) => {
                    return gr.ten_nhom_thuoc.toLocaleLowerCase().includes(valuesSearch.toLocaleLowerCase());
                });
                setDataTb(arr);
            } else {
                setDataTb(dataGrMed);
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.code === 'Enter') {
            handleFilter();
        }
    };

    //call API

    const loadData = () => {
        axios
            .get('http://localhost:8081/category/medicine/group')
            .then((res) => {
                setAllDataGr(res.data);
                setDataGrMed(res.data.filter((gr) => gr.isDeleted === 0));
                setDataTb(res.data.filter((gr) => gr.isDeleted === 0));

                setDataGrMedDel(res.data.filter((gr) => gr.isDeleted !== 0));
                setDataTbDel(res.data.filter((gr) => gr.isDeleted !== 0));
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
                    <h4 className={cx('header-title')}>Danh sách nhóm dược phẩm</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input
                                type="text"
                                value={valuesSearch}
                                placeholder="Tìm kiếm theo tên..."
                                onChange={onChangeInputSearch}
                                onKeyDown={handleKeyPress}
                            />
                            <button className={cx('search-btn')} onClick={handleFilter}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')} onClick={toggleModalAdd}>
                            Thêm
                        </button>
                        <button className={cx('btn-addstaff')}>Nhập excel</button>
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
                    label={'Thông tin chi tiết nhóm dược'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodOnchange={onChangeInputGrMed}
                    methodToggle={toggleModalView}
                    methodHandle={handleUpdate}
                />
            )}
            {showModalAdd && (
                <ModalGr
                    label={'Thêm mới nhóm dược'}
                    dataInputs={dataInputs}
                    dataValueInputs={valueInputs}
                    methodToggle={toggleModalAdd}
                    methodOnchange={onChangeInputGrMed}
                    methodHandle={handleAdd}
                />
            )}

            <div className={cx('main-content')}>
                {stateBin ? (
                    <GrMedTbDeleted data={dataTbDel} method={{ toggleModalRes, toggleModalView, toggleModalHardDel }} />
                ) : (
                    <GroupMedTb data={dataTb} method={{ toggleModalSoftDel, toggleModalView }} />
                )}
            </div>
        </div>
    );
}

export default GroupMed;
