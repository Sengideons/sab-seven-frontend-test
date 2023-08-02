import React, { useEffect, useState, useRef } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Calendar from '../../scenes/calendar/calendar';


const PharmacyAnalytics = () =>{

    const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    // Fetch data from the JSON server
    fetch('https://crazy-cod-sweater.cyclic.cloud/SalesInvoice')
      .then((response) => response.json())
      .then((data) => setSalesData(data))
      .catch((error) => console.error('Error fetching sales data:', error));
  }, []);

  // Function to group total sales by month
  const groupTotalSalesByMonth = () => {
    const salesByMonth = {};
    salesData.forEach((invoice) => {
      const date = new Date(invoice.date);
      const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`;
      if (!salesByMonth[monthYear]) {
        salesByMonth[monthYear] = 0;
      }
      salesByMonth[monthYear] += invoice.totalAmount;
    });
    return salesByMonth;
  };

  // Get the chart data
  const chartData = groupTotalSalesByMonth();
  const data = Object.entries(chartData).map(([month, totalAmount]) => ({ month, totalAmount }));


    

    return(
        <>
        <div className="row">
            {/* Your Profile Views Chart */}
            <div className="col-lg-8 m-b30">
                <div className="widget-box">
                <div className="wc-title">
                    <h4>Your Sales Analytics</h4>
                </div>
                <div className="widget-inner">
                <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
                </div>
                </div>
            </div>
            {/* Your Profile Views Chart END*/}
            <div className="col-lg-4 m-b30">
                <div className="widget-box">
                <div className="wc-title">
                    <h4>Heading</h4>
                </div>
                <div className="widget-inner">
                    <div className="noti-box-list">
                    <ul>
                        <li>
                        <span className="notification-icon dashbg-gray">
                            <i className="fa fa-check" />
                        </span>
                        <span className="notification-text">
                            <span>Medicines for</span> a Better Life.
                        </span>
                        <span className="notification-time">
                            <a href="#loaded" className="fa fa-close" />
                            <span> loaded</span>
                        </span>
                        </li>
                        <li>
                        <span className="notification-icon dashbg-yellow">
                            <i className="fa fa-shopping-cart" />
                        </span>
                        <span className="notification-text">
                            <a href="#accepted">Order good and</a> healthy life always.
                        </span>
                        <span className="notification-time">
                            <a href="#accepted" className="fa fa-close" />
                            <span> accepted</span>
                        </span>
                        </li>
                        <li>
                        <span className="notification-icon dashbg-red">
                            <i className="fa fa-bullhorn" />
                        </span>
                        <span className="notification-text">
                            <span>Your One-Stop</span> Pharmacy.
                        </span>
                        <span className="notification-time">
                            <a href="#live" className="fa fa-close" />
                            <span> live</span>
                        </span>
                        </li>
                        <li>
                        <span className="notification-icon dashbg-green">
                            <i className="fa fa-comments-o" />
                        </span>
                        <span className="notification-text">
                            <a href="#supporting">Supporting a</a> Healthy Lifestyle.
                        </span>
                        <span className="notification-time">
                            <a href="#lifestyle" className="fa fa-close" />
                            <span> lifestyle</span>
                        </span>
                        </li>
                        <li>
                        <span className="notification-icon dashbg-primary">
                            <i className="fa fa-file-word-o" />
                        </span>
                        <span className="notification-text">
                            <span>Advancing Health</span> and Wellness.
                        </span>
                        <span className="notification-time">
                            <a href="#sunny" className="fa fa-close" />
                            <span> sunny</span>
                        </span>
                        </li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>

            <div className="col-lg-12 m-b30">
                <div className="widget-box widget-box2">
                <div className="wc-title">
                    <h4>Basic Calendar</h4>
                </div>
                <div className="widget-inner">
                    <Calendar/>
                </div>
                </div>
            </div>
        </div>

        </>
    );
};

export default PharmacyAnalytics;