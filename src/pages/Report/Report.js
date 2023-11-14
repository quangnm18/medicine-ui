import DirectionHeader from '~/components/DirectionHeader/DirectionHeader';
import style from './Report.module.scss';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import ReportTb from '~/components/Table/ReportTb';

const cx = classNames.bind(style);
const Data = [
    {
        id: 1,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 2,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 3,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
    {
        id: 4,
        name: 'Ampecilin',
        unit: 'Hộp',
        dueDate: '12/02/2023',
        count: 20,
        price: 20000,
        totalPrice: 400000,
    },
];

function Report() {
    return (
        <div className={cx('content')}>
            <div className={cx('header-content')}>
                <DirectionHeader>Báo cáo</DirectionHeader>
                <div className={cx('choose-medicine')}>
                    <h4 className={cx('header-title')}>Danh sách báo cáo</h4>
                    <div className={cx('header-action')}>
                        <div className={cx('header-search')}>
                            <input placeholder="Tìm kiếm theo SĐT, Email, ..." />
                            <button className={cx('search-btn')}>
                                <FontAwesomeIcon icon={faSearch} className={cx('search-icon')} />
                            </button>
                        </div>
                        <button className={cx('btn-addstaff')}>Tạo báo cáo</button>
                    </div>
                </div>
            </div>

            <div className={cx('main-content')}>
                <ReportTb data={Data} />
            </div>
        </div>
    );
}

export default Report;
