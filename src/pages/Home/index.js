import { useEffect, useMemo, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBugSlash, faFlag, faHouseChimneyMedical, faTruckField } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, Legend, plugins } from 'chart.js/auto';
import { Bar, Doughnut, Line } from 'react-chartjs-2';
import classNames from 'classnames/bind';
import style from './Home.module.scss';
import axios from 'axios';
import UserHomeTb from '~/components/Table/UserHomeTb';

const cx = classNames.bind(style);

function Home() {
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
                    <h4>
                        Xin chào,{' '}
                        {localStorage.getItem('data_user') && JSON.parse(localStorage.getItem('data_user')).name}
                    </h4>
                    <span>Chúc một ngày tốt lành!</span>
                </div>

                <div className={cx('header-synthetic')}>
                    <div className={cx('synthetic-item', 'med')} onClick={() => routeChange('/category/medicine')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faHouseChimneyMedical} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span className={cx('if-count')}>8</span>
                            <span>Danh mục dược</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'ncc')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faTruckField} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span className={cx('if-count')}>{countSup}</span>
                            <span>Nhà cung cấp</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'report')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faFlag} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span className={cx('if-count')}>{countRp}</span>
                            <span>Báo cáo</span>
                        </div>
                    </div>
                    <div className={cx('synthetic-item', 'warning')}>
                        <div className={cx('wrap-icon')}>
                            <FontAwesomeIcon className={cx('icon-med')} icon={faBugSlash} />
                        </div>
                        <div className={cx('wrap-if')}>
                            <span className={cx('if-count')}>{countWarning}</span>
                            <span>Cảnh báo dược</span>
                        </div>
                    </div>
                </div>

                <div className={cx('wrap-chart')}>
                    <div className={cx('chart', 'chart-1')}>
                        <Bar
                            data={{
                                labels: ['Quý I', 'Quý II', 'Quý III', 'Quý IV'],
                                datasets: [
                                    {
                                        label: 'Revenue',
                                        data: [100, 300, 500, 400],
                                    },
                                ],
                            }}
                        />
                    </div>

                    <div className={cx('chart', 'chart-2')}>
                        <Doughnut
                            options
                            data={{
                                labels: ['A', 'B'],
                                datasets: [
                                    {
                                        label: 'Doanh thu',
                                        data: [100, 300],
                                        backgroundColor: ['rgba(233,241,249,1)', 'rgba(255,26,104,0.2)'],
                                        weight: '2',
                                    },
                                    {
                                        label: '2',
                                        data: [0, 0],
                                        backgroundColor: ['rgba(255,26,104,0.2)', 'rgba(255,26,104,0.2)'],
                                        weight: '3',
                                    },
                                    {
                                        label: 'Giá trị nhập',
                                        data: [100, 300],
                                        backgroundColor: ['red', 'red'],
                                        weight: '2',
                                    },
                                ],
                            }}
                        />
                    </div>
                </div>

                <div className={cx('footer')}>
                    <UserHomeTb />
                </div>
            </div>
        </div>
    );
}

export default Home;
