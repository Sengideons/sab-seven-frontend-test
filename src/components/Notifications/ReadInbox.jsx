import React, { useState, useEffect } from 'react';
import { Box, CssBaseline, ThemeProvider, Button, TextField } from "@mui/material";
import { ColorModeContext, tokens, useMode } from "../../theme";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useParams } from "react-router-dom";
import PharmacySidebar from '../../scenes/global/PharmacySidebar';
import PharmacyTopbar from '../../scenes/global/PharmacyTopbar';


const ReadInbox = () =>{
    const [theme, colorMode] = useMode();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    const { medicineId } = useParams();

    const [itemdata, itemdatachange] = useState({});

    useEffect(() => {
        fetch("http://localhost:8000/AllMedicines/" + medicineId).then((res) => {
            return res.json();
        }).then((resp) => {
            itemdatachange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [medicineId]);
        

  return (
    <>
    
  <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="app">
          <PharmacySidebar />
          <main className="content">
            <PharmacyTopbar />
            {/* Add Main Body*/}
            <Box m="20px">

            <>
            <main className="ttr-wrapper" style={{marginTop: "-100px"}}>
                <div className="container-fluid">
                <div className="db-breadcrumb">
                    <h4 className="breadcrumb-title">Inbox Read</h4>
                    <ul className="db-breadcrumb-list">
                    <li>
                        <a href="/notifications">
                        <i className="fa fa-home" />
                        Inbox
                        </a>
                    </li>
                    <li>Inbox Read</li>
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
                                    Inbox <span className="badge badge-success">0</span>
                                </a>
                                </li>
                            </ul>
                            </div>
                        </div>
                        <div className="mail-list-container">
                            <div className="mail-toolbar">
                           
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
                            <div className="mailbox-view">
                            <div className="mailbox-view-title">
                                <h5 className="send-mail-title">
                                Your message title goes here
                                </h5>
                            </div>
                            <div className="send-mail-details">
                                <div className="d-flex">
                                <div className="send-mail-user">
                                    <div className="send-mail-user-pic">
                                    🔰📖
                                    </div>
                                    <div className="send-mail-user-info">
                                    </div>
                                </div>
                                <div className="ml-auto send-mail-full-info">
                                    <div className="time">
                                    <span>time of when notification was received</span>
                                    </div>
                                    <div className="dropdown all-msg-toolbar ml-auto">
                                    <span
                                        className="btn btn-info-icon"
                                        data-toggle="dropdown"
                                    >
                                        <i className="fa fa-ellipsis-v" />
                                    </span>
                                    <ul className="dropdown-menu dropdown-menu-right">
                                        <li>
                                        <a href="#">
                                            <i className="fa fa-trash-o" /> Delete
                                        </a>
                                        </li>
                                        <li>
                                        <a href="#">
                                            <i className="fa fa-envelope-open" /> Mark as
                                            unread
                                        </a>
                                        </li>
                                    </ul>
                                    </div>
                                </div>
                                </div>
                                <div className="read-content-body">
                                <h5 className="read-content-title">Hi 👋, User,</h5>
                                {itemdata &&
                                <p>
                                    <strong>Just a brief notice,</strong> One of your 
                                    medicines <strong>{itemdata.medicineName}</strong> with a quantity of <strong>{itemdata.quantity}</strong>, and 
                                    a unit cost GH₵ <strong>{itemdata.price}</strong> has expired on <strong>{itemdata.date}</strong>.
                                    kindly go to your medicine list and have a look at it.
                                </p>
                                }
                                <p>
                                    Have a nice day 
                                    <strong>Thank you 😉</strong>
                                </p>
                               
                                </div>
                            </div>
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

            </Box>
            {/* End of Add medication Main Body*/}
          </main>
        </div>
      </CssBaseline>
    </ThemeProvider>
  </ColorModeContext.Provider>
  </>
  );
}

export default ReadInbox;