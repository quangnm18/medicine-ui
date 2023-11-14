import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function MedicineTb({ data }) {
    const tableStyle = {
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

    // const allKeys = Object.keys(data[0]);
    // const column = allKeys.map((key, index) => {
    //     return {
    //         name: key,
    //         selector: (row) => row[key],
    //     };
    // });

    const columns = [
        {
            name: 'STT',
            selector: (row) => row.ID,
        },
        {
            name: 'Tên dược',
            selector: (row) => row.Name,
        },
        {
            name: 'Nhà cung cấp',
            selector: (row) => {
                const [idSup] = data.dataSupplier.filter((supplier) => supplier.ID === row.SupplierID);
                if (idSup) return idSup.Name;
            },
        },
        {
            name: 'Xuất xứ',
            selector: (row) => row.Origin,
        },
        {
            name: 'Giá',
            selector: (row) => row.Price,
        },
        {
            name: 'Số đăng ký',
            selector: (row) => row.ResNumber,
        },
        {
            name: '#',
            cell: (row) => (
                <div>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <DataTable columns={columns} data={data.dataMedicine} customStyles={tableStyle}></DataTable>
        </div>
    );
}

export default MedicineTb;
