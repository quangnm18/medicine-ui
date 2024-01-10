import style from './Pagination.module.scss';
import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(style);

function Pagination({ pageCount, methodOnchange }) {
    return (
        <ReactPaginate
            pageCount={pageCount ? pageCount : 0}
            onPageChange={methodOnchange}
            pageRangeDisplayed={3}
            renderOnZeroPageCount={null}
            nextLabel=">"
            previousLabel="<"
            containerClassName={cx('pagination')}
            pageLinkClassName={cx('pagi-num')}
            previousLinkClassName={cx('pagi-num', 'pagi-prenext')}
            nextLinkClassName={cx('pagi-num', 'pagi-prenext')}
            activeLinkClassName={cx('active')}
        />
    );
}

export default Pagination;
