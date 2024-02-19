import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBugSlash, faCoins, faFileInvoiceDollar, faFlag } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { defaults } from 'chart.js/auto';
import { Bar, Line, Pie } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import axios from 'axios';
import UserHomeTb from '~/components/Table/UserHomeTb';
import { dataLine } from './dataTest';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'center';
defaults.plugins.title.font.size = '20px';
defaults.plugins.title.color = 'black';

const cx = classNames.bind(style);

function Home() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('data_user')));

    const [year, setYear] = useState(new Date().getFullYear());

    const [dataHome, setDataHome] = useState({});

    const formatMoney = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });

    const onChangeYear = (e) => {
        setYear(e.target.value);
        console.log(e.target.value);
    };

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        let baseUrl = process.env.REACT_APP_BASE_URL;
        axios
            //
            .get(`${baseUrl}getmeddue`, {
                params: {
                    curr_year: year,
                    branch_id: user.id_chi_nhanh,
                    count_due: 0,
                    count_neardue: 0,
                    count_ok: 0,
                    tonggt_nhap: 0,
                    tong_ban: 0,
                },
            })
            .then((res) => {
                let arr_ban = res.data[1];
                let arr_nhap = res.data[2];
                console.log(arr_nhap);

                const ban_quy_1 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-01-01`).getTime() <= new Date(current.createdAt).getTime() &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-03-31`).getTime()
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    }
                }, 0);

                const ban_quy_2 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-04-01`).getTime() <= new Date(current.createdAt).getTime() &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-06-30`).getTime()
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    }
                }, 0);

                const ban_quy_3 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-07-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-09-30`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    }
                }, 0);

                const ban_quy_4 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-10-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-12-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    }
                }, 0);

                const nhap_quy_1 = arr_nhap.reduce((total, current) => {
                    if (
                        new Date(`${year}-01-01`).getTime() <= new Date(current.createdDt_at).getTime() &&
                        new Date(current.createdDt_at).getTime() <= new Date(`${year}-03-31`).getTime()
                    ) {
                        return current.thanh_tien_nhap ? total + current.thanh_tien_nhap : total + 0;
                    }
                }, 0);

                const nhap_quy_2 = arr_nhap.reduce((total, current) => {
                    if (
                        new Date(`${year}-04-01`).getTime() <= new Date(current.createdDt_at).getTime() &&
                        new Date(current.createdDt_at).getTime() <= new Date(`${year}-06-30`).getTime()
                    ) {
                        return current.thanh_tien_nhap ? total + current.thanh_tien_nhap : total + 0;
                    }
                }, 0);

                const nhap_quy_3 = arr_nhap.reduce((total, current) => {
                    if (
                        new Date(`${year}-07-01`) <= new Date(current.createdDt_at) &&
                        new Date(current.createdDt_at).getTime() <= new Date(`${year}-09-30`)
                    ) {
                        return current.thanh_tien_nhap ? total + current.thanh_tien_nhap : total + 0;
                    }
                }, 0);

                const nhap_quy_4 = arr_nhap.reduce((total, current) => {
                    if (
                        new Date(`${year}-10-01`) <= new Date(current.createdDt_at) &&
                        new Date(current.createdDt_at).getTime() <= new Date(`${year}-12-31`)
                    ) {
                        return current.thanh_tien_nhap ? total + current.thanh_tien_nhap : total + 0;
                    }
                }, 0);

                setDataHome({
                    ...dataHome,
                    count_ok: res.data[0][0].count_ok,
                    count_due: res.data[0][0].count_due,
                    count_neardue: res.data[0][0].count_neardue,
                    tonggt_nhap: res.data[0][0].tonggt_nhap,
                    tong_ban: res.data[0][0].tong_ban,
                    ban_q1: ban_quy_1 ? ban_quy_1 : 0,
                    ban_q2: ban_quy_2 ? ban_quy_2 : 0,
                    ban_q3: ban_quy_3 ? ban_quy_3 : 0,
                    ban_q4: ban_quy_4 ? ban_quy_4 : 0,
                    nhap_q1: nhap_quy_1 ? nhap_quy_1 : 0,
                    nhap_q2: nhap_quy_2 ? nhap_quy_2 : 0,
                    nhap_q3: nhap_quy_3 ? nhap_quy_3 : 0,
                    nhap_q4: nhap_quy_4 ? nhap_quy_4 : 0,
                });
            })
            .catch((e) => console.log(e));
    }, [year]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('wrap-header')}>
                    <div className={cx('header-hello')}>
                        <h4>Xin chào, {user.name}</h4>
                        <span>Chúc một ngày tốt lành!</span>
                    </div>
                    <div className={cx('wrap-year')}>
                        <select value={Number.parseInt(year)} onChange={onChangeYear}>
                            <option value={Number.parseInt(year) - 3}>{Number.parseInt(year) - 3}</option>
                            <option value={Number.parseInt(year) - 2}>{Number.parseInt(year) - 2}</option>
                            <option value={Number.parseInt(year) - 1}>{Number.parseInt(year) - 1}</option>
                            <option value={Number.parseInt(year)}>{year}</option>
                            <option value={Number.parseInt(year) + 1}>{Number.parseInt(year) + 1}</option>
                            <option value={Number.parseInt(year) + 2}>{Number.parseInt(year) + 2}</option>
                            <option value={Number.parseInt(year) + 3}>{Number.parseInt(year) + 3}</option>
                        </select>
                    </div>
                </div>

                <div className={cx('header-synthetic')}>
                    <div
                        className={cx('synthetic-item', 'med')}
                        onClick={() => routeChange('/statistic/historyImport')}
                    >
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faCoins} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Tổng nhập</span>
                            <span className={cx('if-count')}>{formatMoney.format(dataHome.tonggt_nhap)}</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'ncc')} onClick={() => routeChange('/statistic/historySale')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faFileInvoiceDollar} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Tổng bán</span>
                            <span className={cx('if-count')}>{formatMoney.format(dataHome.tong_ban)}</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'report')} onClick={() => routeChange('/report')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faFlag} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Báo cáo</span>
                            <span className={cx('if-count')}>{3}</span>
                        </div>
                    </div>
                    <div
                        className={cx('synthetic-item', 'warning')}
                        onClick={() => routeChange('/statistic/historyImport')}
                    >
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faBugSlash} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Cảnh báo dược</span>
                            <span className={cx('if-count')}>
                                {dataHome.count_due && dataHome.count_neardue
                                    ? dataHome.count_due + dataHome.count_neardue
                                    : 0}
                            </span>
                        </div>
                    </div>
                </div>

                <div className={cx('wrap-chart')}>
                    <div className={cx('chart', 'chart-1')}>
                        <div className={cx('wrap-bar')}>
                            <Bar
                                data={{
                                    labels: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
                                    datasets: [
                                        {
                                            label: 'Tổng nhập',
                                            data: [
                                                dataHome.nhap_q1,
                                                dataHome.nhap_q2,
                                                dataHome.nhap_q3,
                                                dataHome.nhap_q4,
                                            ],
                                            // backgroundColor: '',
                                            borderRadius: 5,
                                        },
                                        {
                                            label: 'Tổng bán',
                                            data: [dataHome.ban_q1, dataHome.ban_q2, dataHome.ban_q3, dataHome.ban_q4],
                                            backgroundColor: 'rgba(250,192,19,0.6)',
                                            borderRadius: 5,
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                            text: 'Thống kê theo quý',
                                            color: '#333',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>

                    <div className={cx('chart', 'chart-2')}>
                        <div className={cx('wrap-pie')}>
                            <Pie
                                data={{
                                    labels: ['Dược hết hạn', 'Dược sặp hết hạn', 'Dược sẵn sàng'],
                                    datasets: [
                                        {
                                            // label: 'Dược ',
                                            data: [dataHome.count_due, dataHome.count_neardue, dataHome.count_ok],
                                            backgroundColor: [
                                                'rgba(238, 43, 43, 0.681)',
                                                'rgba(250,192,19,0.6)',
                                                'rgba(28, 176, 53, 0.4)',
                                            ],
                                        },
                                    ],
                                }}
                                options={{
                                    plugins: {
                                        title: {
                                            text: 'Tình trạng dược',
                                            color: '#333',
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className={cx('chart-3')}>
                    <Line
                        data={{
                            labels: dataLine.map((data) => data.label),

                            datasets: [
                                {
                                    label: 'Giá trị bán',
                                    data: dataLine.map((data) => data.revenue),
                                },
                                {
                                    label: 'Giá trị nhập',
                                    data: dataLine.map((data) => data.cost),
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: 'Thống kê theo tháng',
                                    color: '#333',
                                },
                            },
                        }}
                    />
                </div>
                <div className={cx('footer')}>
                    <h4 className={cx('table-label')}>Chi nhánh nhà thuốc</h4>
                    <UserHomeTb />
                </div>
            </div>
        </div>
    );
}

export default Home;
