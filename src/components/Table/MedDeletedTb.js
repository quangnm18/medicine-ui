import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);

function MedDeletedTb({ data, method, role }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };
    const tableStyle = {
        rows: {
            style: {
                fontSize: '16px',
            },
        },
        headCells: {
            style: {
                fontSize: '16px',
                minHeight: '56px',
            },
        },
    };

    const columns = [
        {
            name: 'STT',
            cell: (row, index) => index + 1,
            width: '100px',
        },
        {
            name: 'Tên dược',
            selector: (row) => <div>{row.ten}</div>,
            sortable: true,
            col: 1,
        },
        {
            name: 'Thời gian xóa',
            selector: (row) => {
                let date = new Date(row.deletedAt);
                return date.toLocaleString();
            },
        },
        {
            name: 'Người xóa',
            selector: (row) => row.Name,
        },

        {
            name: '',
            cell: (row) => (
                <div className={cx('action-item')}>
                    {role === 'ADMA' && (
                        <button className={cx('btn')} onClick={() => method.toggleModalHardDelete(row.id)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                    {(role === 'ADMA' || role === 'ADM') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalRes(row.id)}>
                            <FontAwesomeIcon icon={faRotateLeft} className={cx('icon-eye')} />
                        </button>
                    )}
                </div>
            ),
            width: '180px',
        },
    ];
    return (
        <div>
            <DataTable
                columns={columns}
                data={data}
                customStyles={tableStyle}
                selectableRows
                highlightOnHover
                onSort={handleSort}
                fixedHeader
                fixedHeaderScrollHeight="620px"
                className={cx('wrapper-tb')}
            ></DataTable>
        </div>
    );
}

export default memo(MedDeletedTb);
