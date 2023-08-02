import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Home.css';

const Home = () => {

    const [isLoading, setIsLoading] = useState(true);
    const usenavigate = useNavigate();

    useEffect(() => {
        let username = sessionStorage.getItem('username');
        if(username==='' || username ===null){
            usenavigate('/login');
        }
        setTimeout(() => setIsLoading(false), 5000); // hide the pre-loader after 5 seconds
       
    }, [usenavigate]);

    return ( 
    <>
        {isLoading ? (
            <div className="pre-loader">
                <div className="spinner"></div>
                    <div class="loading">
                    <svg width="64px" height="48px">
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="back"></polyline>
                        <polyline points="0.157 23.954, 14 23.954, 21.843 48, 43 0, 50 24, 64 24" id="front"></polyline>
                    </svg>
                    </div>
            </div>
        ) : (
            <div className="landing-page">
                <div role="banner" className="ui-section-header">
                    <div className="ui-layout-container">
                        <div className="ui-section-header__layout ui-layout-flex">
                            <div class="logo-holder logo-3">
                                <Link to={"/"}>
                                    
                                </Link>
                            </div>
                            <Link to={"/login"} className='btn'>
                                Logout
                            </Link>
                        </div>
                    </div>
                </div>
                <section className="ui-section-hero">
                    <div className="ui-layout-container">
                        <div className="ui-layout-column-6 ui-layout-column-center">
                            <h1 className="h1">Welcome To Pharmacy Management System.</h1>
                            <p className="ui-text-intro">Click the button below to continue.</p>
                            <div className="ui-component-cta ui-layout-flex">
                                <Link to={"/pharmacy"} className="ui-component-button ui-component-button-normal ui-component-button-primary ui-component-button-icon">
                                    <img src={"assets/images/icons/pharmacy.png"} alt="" style={{height:"45px", width:"45px"}}/>
                                    <span>PHARMACY</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )}
    </> 
    );
}

export default Home;
