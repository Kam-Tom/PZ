import { Line, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import { getAll } from '../../axios';
import React, { useState, useEffect } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement);

function StatsAdmin() {
    const [data, setData] = useState([]);
    const [wordCount, setWordCount] = useState({});
    const [AccCount, setAccCount] = useState({});
    const [numOfOrdersCount, setNumOfOrdersCount] = useState({});
    const [numOfProductCount, setnumOfProductCount] = useState({});

    async function fetchData() {
        let users = await getAll("https://localhost:7248/api/Users/Get");
        for (let i = 0; i < users.length; i++) {
            users[i].createdAt = users[i].createdAt.split('T')[0];
        }
        console.log(users);
        let allDates = [];
        users.forEach(user => {
            allDates.push(user.createdAt);
        });
        console.log(allDates);
        const AccCount = {};
        allDates.forEach(item => {
            if (AccCount[item]) {
                AccCount[item]++;
            } else {
                AccCount[item] = 1;
            }
        });
        console.log(AccCount);
        setAccCount(AccCount);
        console.log('-----------------------------------------');
        console.log(users[0]);
        let items = await getAll("https://localhost:7248/api/Shop/GetAllAsAdmin");
        console.log(items);
        for (let i = 0; i < items.length; i++) {
            items[i].date = items[i].date.split('T')[0];
        }
        console.log(items);
         console.log('-----------------------------------------');
        let allOrders = [];
        items.forEach(item => {
            allOrders.push(item.date);
        });
        console.log(allOrders);
        const numOfOrdersCount = {};
        allOrders.forEach(item => {
            if (numOfOrdersCount[item]) {
                numOfOrdersCount[item]++;
            } else {
                numOfOrdersCount[item] = 1;
            }
        });
        console.log(numOfOrdersCount);
        setNumOfOrdersCount(numOfOrdersCount);
         console.log('-----------------------------------------');
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const filteredItems = items.filter(item => new Date(item.date) > thirtyDaysAgo);
        let allitems = [];
        for (let i = 0; i < filteredItems.length; i++) {
            let item = await getAll(`https://localhost:7248/api/Shop/GetDetails?id=${filteredItems[i].orderId}`);
            console.log(item);
            allitems.push(...item.items.map(i => i.name)); 
        }
        const wordCount = {};
        allitems.forEach(item => {
            if (wordCount[item]) {
                wordCount[item]++;
            } else {
                wordCount[item] = 1;
            }
        });
        console.log(wordCount);
        console.log(allitems);
        console.log(filteredItems);
        setData(items);
        setWordCount(wordCount); 


        let products = await getAll("https://localhost:7248/Product/Admin");
        console.log(products);
        const lsitProducts = products.map(item => ({ name: item.name, stock: item.stock }));
        console.log(lsitProducts);
        setnumOfProductCount(lsitProducts);
    }
    useEffect(() => {
        fetchData();
    }, []);

    const sortedAccCount = Object.entries(AccCount)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    const datas = {
        labels: Object.keys(sortedAccCount),
        datasets: [
            {
                label: 'Created accounts',
                data: Object.values(sortedAccCount),
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
        ],
    };
    const sortedNumOfOrderst = Object.entries(numOfOrdersCount)
        .sort((a, b) => new Date(a[0]) - new Date(b[0]))
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    const numOfOrders = {
        labels: Object.keys(sortedNumOfOrderst),
        datasets: [
            {
                label: 'Number of order',
                data: Object.values(sortedNumOfOrderst),
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    const sortedWordCount = Object.entries(wordCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});

    const mostBuy = {
        labels: Object.keys(sortedWordCount),
        datasets: [
            {
                label: 'Top 10 most bought products in last 30 days',
                data: Object.values(sortedWordCount),
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 1,
            },
        ],
    };

    const sortedNumOfProductCount = numOfProductCount.length > 0 ? numOfProductCount.sort((a, b) => b.stock - a.stock).slice(0, 5) : [];


    const mostStock = {
        labels: sortedNumOfProductCount.length > 0 ? sortedNumOfProductCount.map(product => product.name) : [],
        datasets: [
            {
                label: 'Top 5 products with most stock',
                data: sortedNumOfProductCount.length > 0 ? sortedNumOfProductCount.map(product => product.stock) : [],
                backgroundColor: 'rgb(255, 205, 86)',
                borderColor: 'rgba(255, 205, 86, 0.2)',
                borderWidth: 1,
            },
        ],
    };
    
    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    font: {
                        size: 16
                    }
                }
            },
            x: {
                ticks: {
                    font: {
                        size: 16
                    }
                }
            }
        },
    };

    return (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "1fr 1fr", gap: "20px" }}>
            <div>
                <Line data={numOfOrders} options={{ ...options, maintainAspectRatio: false, plugins: { legend: { labels: { font: { size: 25 } } } } }} height={500} width={750} />
            </div>
            <div>
                <Line data={datas} options={{ ...options, maintainAspectRatio: false, plugins: { legend: { labels: { font: { size: 25 } } } } }} />
            </div>
            <div>
                <Bar data={mostBuy} options={{ ...options, maintainAspectRatio: false, plugins: { legend: { labels: { font: { size: 25 } } } } }} />
            </div>
            <div>
                <Bar data={mostStock} options={{ ...options, maintainAspectRatio: false, plugins: { legend: { labels: { font: { size: 25 } } } } }} />
            </div>
        </div>
    );
}

export default StatsAdmin;
