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

    const [countRp, setCountRp] = useState();
    const [countSup, setCountSup] = useState();
    const [countWarning, setCountWarning] = useState();

    const navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    };

    useEffect(() => {
        axios
            .get('http://localhost:8081/getallcountrp')
            .then((res) => {
                setCountRp(res.data[0].count_rp);
            })
            .catch((e) => console.log(e));

        axios
            .get('http://localhost:8081/getcountsup')
            .then((res) => {
                setCountSup(res.data[0].count_sup);
            })
            .catch((e) => console.log(e));

        axios
            //
            .get('http://localhost:8081/getmeddue')
            .then((res1) => {
                let currentDate = new Date();
                let curr_day =
                    currentDate.getFullYear() * 12 * 30 + (currentDate.getMonth() + 1) * 30 + currentDate.getDate();

                const arr = res1.data.filter((item) => {
                    let day = new Date(item.han_dung);
                    let due_day = day.getFullYear() * 12 * 30 + (day.getMonth() + 1) * 30 + day.getDate();
                    if (due_day - curr_day < 20) return item;
                });
                if (arr.length) {
                    setCountWarning(arr.length);
                }
            })
            .catch((e) => console.log(e));
    }, []);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('header-hello')}>
                    <h4>Xin chào, {user.name}</h4>
                    <span>Chúc một ngày tốt lành!</span>
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
                            <span className={cx('if-count')}>12.000.000đ</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'ncc')} onClick={() => routeChange('/statistic/historySale')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faFileInvoiceDollar} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Tổng bán</span>
                            <span className={cx('if-count')}>3.000.000đ</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'report')} onClick={() => routeChange('/report')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faFlag} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span>Báo cáo</span>
                            <span className={cx('if-count')}>{countRp}</span>
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
                            <span className={cx('if-count')}>{countWarning}</span>
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
                                            data: [100, 300, 500, 400],
                                            // backgroundColor: '',
                                            borderRadius: 5,
                                        },
                                        {
                                            label: 'Tổng bán',
                                            data: [100, 300, 500, 400],
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
                                            data: [7, 2, 80],
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
