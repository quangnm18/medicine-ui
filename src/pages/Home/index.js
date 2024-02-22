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
                    count_rp: 0,
                },
            })
            .then((res) => {
                let arr_ban = res.data[1];
                let arr_nhap = res.data[2];

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

                const ban_thang_1 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-01-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-01-31`)
                    ) {
                        return total + current.thanh_tien_ban;
                    } else return total + 0;
                }, 0);

                const ban_thang_2 = arr_ban.reduce((total, current) => {
                    if (
                        year % 4 === 0 &&
                        new Date(`${year}-02-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-02-29`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else if (
                        year % 4 !== 0 &&
                        new Date(`${year}-02-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-02-28`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_3 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-03-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-03-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_4 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-04-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-04-30`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_5 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-05-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-05-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_6 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-06-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-06-30`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_7 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-07-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-07-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_8 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-08-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-08-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_9 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-09-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-09-30`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_10 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-10-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-10-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_11 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-11-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-11-30`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const ban_thang_12 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-12-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-12-31`)
                    ) {
                        return current.thanh_tien_ban ? total + current.thanh_tien_ban : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_1 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-01-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-01-31`)
                    ) {
                        return total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd;
                    } else return total + 0;
                }, 0);

                const dt_thang_2 = arr_ban.reduce((total, current) => {
                    if (
                        year % 4 === 0 &&
                        new Date(`${year}-02-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-02-29`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else if (
                        year % 4 !== 0 &&
                        new Date(`${year}-02-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-02-28`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_3 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-03-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-03-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_4 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-04-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-04-30`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_5 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-05-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-05-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_6 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-06-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-06-30`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_7 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-07-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-07-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_8 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-08-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-08-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_9 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-09-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-09-30`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_10 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-10-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-10-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_11 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-11-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-11-30`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                const dt_thang_12 = arr_ban.reduce((total, current) => {
                    if (
                        new Date(`${year}-12-01`) <= new Date(current.createdAt) &&
                        new Date(current.createdAt).getTime() <= new Date(`${year}-12-31`)
                    ) {
                        return current.thanh_tien_ban
                            ? total + current.thanh_tien_ban - current.so_luong_ban * current.gianhap_daqd
                            : total + 0;
                    } else return total + 0;
                }, 0);

                setDataHome({
                    ...dataHome,
                    count_ok: res.data[0][0].count_ok,
                    count_due: res.data[0][0].count_due,
                    count_neardue: res.data[0][0].count_neardue,
                    count_rp: res.data[0][0].count_rp,

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
                    ban_t: [
                        ban_thang_1 ? ban_thang_1 : 0,
                        ban_thang_2 ? ban_thang_2 : 0,
                        ban_thang_3 ? ban_thang_3 : 0,
                        ban_thang_4 ? ban_thang_4 : 0,
                        ban_thang_5 ? ban_thang_5 : 0,
                        ban_thang_6 ? ban_thang_6 : 0,
                        ban_thang_7 ? ban_thang_7 : 0,
                        ban_thang_8 ? ban_thang_8 : 0,
                        ban_thang_9 ? ban_thang_9 : 0,
                        ban_thang_10 ? ban_thang_10 : 0,
                        ban_thang_11 ? ban_thang_11 : 0,
                        ban_thang_12 ? ban_thang_12 : 0,
                    ],
                    dt_t: [
                        dt_thang_1 ? dt_thang_1 : 0,
                        dt_thang_2 ? dt_thang_2 : 0,
                        dt_thang_3 ? dt_thang_3 : 0,
                        dt_thang_4 ? dt_thang_4 : 0,
                        dt_thang_5 ? dt_thang_5 : 0,
                        dt_thang_6 ? dt_thang_6 : 0,
                        dt_thang_7 ? dt_thang_7 : 0,
                        dt_thang_8 ? dt_thang_8 : 0,
                        dt_thang_9 ? dt_thang_9 : 0,
                        dt_thang_10 ? dt_thang_10 : 0,
                        dt_thang_11 ? dt_thang_11 : 0,
                        dt_thang_12 ? dt_thang_12 : 0,
                    ],
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
                            <span className={cx('if-count')}>{dataHome.count_rp ? dataHome.count_rp : 0}</span>
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
                                            // backgroundColor: 'rgba(0, 215, 232, 0.5)',
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
                                    label: 'Doanh thu',
                                    data: dataHome.ban_t && dataHome.ban_t.map((data) => data),
                                },
                                {
                                    label: 'Lợi nhuận',
                                    data: dataHome.dt_t && dataHome.dt_t.map((data) => data),
                                },
                            ],
                        }}
                        options={{
                            plugins: {
                                title: {
                                    text: 'Thống kê doanh thu',
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
