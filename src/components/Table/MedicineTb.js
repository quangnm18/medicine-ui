import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function MedicineTb({ data, method }) {
    const tableStyle = {
        table: {
            style: {
                width: '1457px',
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
        },
        {
            name: 'Tên dược',
            selector: (row) => row.ten,
            sortable: true,
        },
        {
            name: 'Hoạt chất',
            selector: (row) => row.hoat_chat,
        },
        {
            name: 'Hàm lượng',
            selector: (row) => row.ham_luong,
        },
        {
            name: 'Dạng bào chế',
            selector: (row) => row.dang_bao_che,
        },
        {
            name: 'Quy cách đóng gói',
            selector: (row) => row.dong_goi,
        },
        {
            name: '',
            cell: (row) => (
                <div className={cx('action-item')}>
                    <button className={cx('btn')} onClick={() => method.toggleModalSingleDelete(row)}>
                        <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                    </button>
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                </div>
            ),
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                fixedHeader={true}
                pagination
                selectableRows
                onSelectedRowsChange={method.handleChooseRow}
            ></DataTable>
        </div>
    );
}

export default MedicineTb;
