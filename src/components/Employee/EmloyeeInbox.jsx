import React, { useState, useEffect } from 'react';
import { useMode } from "../../theme";
import { useNavigate } from "react-router-dom";


const EmployeeInbox = () =>{
    const [theme, colorMode] = useMode();

    const [medicines, setMedicines] = useState([]);
    const navigate = useNavigate();

    // Fetch the medication data from the JSON server
    useEffect(() => {
        const fetchMedicines = async () => {
            try {
                const response = await fetch('http://localhost:8000/AllMedicines');
                if (!response.ok) {
                    throw new Error('Failed to fetch medication data.');
                }
                const data = await response.json();
                setMedicines(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMedicines();
    }, []);

    // Get the current date
    const currentDate = new Date();

    // Filter the expired medicines
    const expiredMedicines = medicines.filter((medicine) => {
        const expirationDate = new Date(medicine.date);
        return currentDate > expirationDate;
    });

    // State to keep track of the number of unread messages
    const [unreadCount, setUnreadCount] = useState(expiredMedicines.length);

    // Function to handle message click and decrement the unread count
    const LoadDetail = (id) => {
        setUnreadCount((prevCount) => prevCount - 1); // Decrement the count on click
        navigate("/notifications/read-inbox/" + id);
    };

    // Update unread count whenever expiredMedicines changes
    useEffect(() => {
        setUnreadCount(expiredMedicines.length);
    }, [expiredMedicines]);

  return (

            <>
            <main className="ttr-wrapper" style={{marginTop: "-100px"}}>
                <div className="container-fluid">
                <div className="db-breadcrumb">
                    <h4 className="breadcrumb-title">Notifications</h4>
                    <ul className="db-breadcrumb-list">
                    <li>
                        <a href="/pharmacy">
                        <i className="fa fa-home" />
                        Dashboard
                        </a>
                    </li>
                    <li>inbox</li>
                    </ul>
                </div>
                <div className="row">
                    {/* Your Profile Views Chart */}
                    <div className="col-lg-12 m-b30">
                    <div className="widget-box">
                        <div className="email-wrapper">
                        <div className="email-menu-bar">
                            <div className="email-menu-bar-inner">
                            <ul>
                                <li className="active">
                                <a href="/notifications">
                                    <i className="fa fa-envelope-o" />
                                    Inbox <span className="badge badge-success">{unreadCount}</span>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="mail-list-container">
                            <div className="mail-toolbar">
                            <div className="check-all">
                                <div className="custom-control custom-checkbox checkbox-st1">
                                <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="check1"
                                />
                                <label
                                    className="custom-control-label"
                                    htmlFor="check1"
                                />
                                </div>
                            </div>
                            <div className="mail-search-bar">
                                <input
                                type="text"
                                className="form-control"
                                placeholder="Search"
                                />
                            </div>
                            <div className="dropdown all-msg-toolbar">
                                <span className="btn btn-info-icon" data-toggle="dropdown">
                                <i className="fa fa-ellipsis-v" />
                                </span>
                                <ul className="dropdown-menu">
                                <li>
                                    <a href="#">
                                    <i className="fa fa-trash-o" /> Delete
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                    <i className="fa fa-envelope-open" /> Mark as unread
                                    </a>
                                </li>
                                </ul>
                            </div>
                            <div className="next-prev-btn">
                                <a href="#">
                                <i className="fa fa-angle-left" />
                                </a>
                                <a href="#">
                                <i className="fa fa-angle-right" />
                                </a>
                            </div>
                            </div>
                            <div className="mail-box-list">
                            {expiredMedicines.map((medicine) => (
                            <div className="mail-list-info" key={medicine.id} 
                            onClick={() => { LoadDetail(medicine.id) }}>
                                <div className="checkbox-list">
                                <div className="custom-control custom-checkbox checkbox-st1">
                                    <input
                                    type="checkbox"
                                    className="custom-control-input"
                                    id="check3"
                                    />
                                    <label
                                    className="custom-control-label"
                                    htmlFor="check3"
                                    />
                                </div>
                                </div>
                                <div className="mail-rateing">
                                <span>
                                    <i className="fa fa-star-o" />
                                </span>
                                </div>
                                <div className="mail-list-title">
                                <h6>Important notice !!</h6>
                                </div>
                                <div className="mail-list-title-info">
                                <p>{medicine.medicineName}</p>
                                </div>
                                <div className="mail-list-time">
                                <span>{medicine.date}</span>
                                </div>
                                <ul className="mailbox-toolbar">
                                <li data-toggle="tooltip" title="Delete">
                                    <i className="fa fa-trash-o" />
                                </li>
                                <li data-toggle="tooltip" title="Mark as unread">
                                    <i className="fa fa-envelope-open" />
                                </li>
                                </ul>
                            </div>
                            ))}
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                    {/* Your Profile Views Chart END*/}
                </div>
                </div>
            </main>
            <div className="ttr-overlay" />
        </>

            
  );
}

export default EmployeeInbox;