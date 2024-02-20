import { faPenToSquare, faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DataTable from 'react-data-table-component';
import classNames from 'classnames/bind';
import style from './Table.module.scss';
import { memo } from 'react';

const cx = classNames.bind(style);

function SupDeletedTb({ data, method, role }) {
    const handleSort = (obj, type, data) => {
        method.setSort({ sort_col: obj.col, sort_type: type });
    };
    const tableStyle = {
        rows: {
            style: {
                minHeight: '56px',
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
        // {
        //     name: 'STT',
        //     selector: (row) => row.ID,
        // },
        {
            name: 'STT',
            cell: (row, index) => index + 1,
        },
        {
            name: 'Tên nhà cung cấp',
            selector: (row) => <div>{row.ten_ncc}</div>,
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
                        <button className={cx('btn')} onClick={() => method.toggleModalHardDel(row.ID)}>
                            <FontAwesomeIcon icon={faTrashCan} className={cx('icon-delete')} />
                        </button>
                    )}
                    <button className={cx('btn')} onClick={() => method.toggleModalView(row.ID)}>
                        <FontAwesomeIcon icon={faPenToSquare} className={cx('icon-view')} />
                    </button>
                    {(role === 'ADMA' || role === 'ADM') && (
                        <button className={cx('btn')} onClick={() => method.toggleModalRes(row.ID)}>
                            <FontAwesomeIcon icon={faRotateLeft} className={cx('icon-eye')} />
                        </button>
                    )}
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
                highlightOnHover
                onSort={handleSort}
                fixedHeader
                fixedHeaderScrollHeight="690px"
                className={cx('wrapper-tb')}
            ></DataTable>
        </div>
    );
}

export default memo(SupDeletedTb);
