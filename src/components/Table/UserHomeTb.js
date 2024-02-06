import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../Pagination/Pagination';

const cx = classNames.bind(style);

function UserHomeTb({ data, method }) {
    const [dataTb, setDataTb] = useState([]);

    const numRecord = 10;
    const [startRecord, setStartRecord] = useState(0);
    const [pageCount, setPageCount] = useState(1);

    const handleChangePage = (e) => {
        setStartRecord(e.selected * numRecord);
    };

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            .get(`${baseUrl}branch/paginate`, {
                params: {
                    search_value: '',
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
            .catch((e) => console.log(e));
    }, []);

    const tableStyle = {
        table: {
            style: {
                padding: '0px 24px',
            },
        },
        rows: {
            style: {
                fontSize: '16px',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
            },
        },
    };

    const columns = [
        {
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Tên chi nhánh',
            selector: (row) => row.name,
        },
        {
            name: 'Địa chỉ',
            selector: (row) => row.address,
            width: '400px',
        },
        {
            name: 'Người đại diện',
            selector: (row) => row.ten_quan_ly,
        },
        {
            name: 'Số điện thoại',
            selector: (row) => row.PhoneNumber,
        },
        {
            name: '',
            cell: (row) => (
                <div>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                </div>
            ),
            width: '100px',
        },
    ];
    return (
        <div>
            <div className={cx('table-content')}>
                <DataTable columns={columns} data={dataTb} customStyles={tableStyle}></DataTable>
            </div>
            <div className={cx('table-paginate')}>
                <Pagination pageCount={pageCount} methodOnchange={handleChangePage} />
            </div>
        </div>
    );
}

export default UserHomeTb;
