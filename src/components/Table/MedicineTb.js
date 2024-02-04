import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';

const cx = classNames.bind(style);

function MedicineTb({ data, method }) {
    const tableStyle = {
        table: {
            style: {},
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

        cells: {
            style: {},
        },
    };

    const columns = [
        {
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '80px',
        },
        {
            name: 'Tên dược',
            selector: (row) => row.ten,
            sortable: true,
        },
        {
            name: 'Hoạt chất',
            selector: (row) => row.hoat_chat,
            width: '180px',
        },
        {
            name: 'Hàm lượng',
            selector: (row) => row.ham_luong,
            width: '180px',
        },
        {
            name: 'Dạng bào chế',
            selector: (row) => row.dang_bao_che,
            width: '200px',
        },
        {
            name: 'Dạng đóng gói',
            selector: (row) => row.description_unit,
            width: '200px',
            // maxWidth: 'fit-content',
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
            width: '280px',
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                selectableRows
                onSelectedRowsChange={method.handleChooseRow}
            ></DataTable>
        </div>
    );
}

export default MedicineTb;
