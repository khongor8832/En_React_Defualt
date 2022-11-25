import React from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';

import URL from 'context/url';
import CODE from 'context/code';

function EgovHeader({ loginUser, onChangeLogin }) {
    console.group("EgovHeader");
    console.log("[Start] EgovHeader ------------------------------");

    const history = useHistory();

    const logInHandler = () => { // 로그인 정보 없을 시
        history.push(URL.LOGIN);
    }
    const logOutHandler = () => {// 로그인 정보 존재할 때
        const logOutUrl = '/uat/uia/actionLogoutAPI.do';
        const requestOptions = {
            credentials: 'include',
        }
        EgovNet.requestFetch(logOutUrl, requestOptions,
            function (resp) {
                console.log("===>>> logout resp= ", resp);
                if (resp.resultCode == CODE.RCV_SUCCESS) {
                    onChangeLogin({ loginVO: {} });
                    window.alert("로그아웃되었습니다!");
                    history.push(URL.MAIN);
                }
            }
        );
    }

    console.log("------------------------------EgovHeader [End]");
    console.groupEnd("EgovHeader");

    return (
        // <!-- header -->
        <div className="header">
           
            <div className="inner">
                <Link to={URL.MAIN} className="ico lnk_go_template" target="_blank">Go to homepage template introduction page </Link>

                <h1 className="logo">
                    <Link to={URL.MAIN} className="w"><img src="/assets/images/logo_w.png" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                    <Link to={URL.MAIN} className="m"><img src="/assets/images/logo_m.png" alt="표준프레임워크포털 eGovFrame 심플홈페이지" /></Link>
                </h1>

                <div className="gnb">
                    <h2 className="blind">main menu</h2>
                    <ul>
                        <li><NavLink to={URL.ABOUT} activeClassName="cur">introduction</NavLink></li>
                        <li><NavLink to={URL.INTRO} activeClassName="cur">News</NavLink></li>
                        <li><NavLink to={URL.SUPPORT} activeClassName="cur">Support</NavLink></li>
                        <li><NavLink to={URL.INFORM} activeClassName="cur"> Notice</NavLink></li>
                        {loginUser?.id &&
                            <li><NavLink to={URL.ADMIN} activeClassName="cur">Control</NavLink></li>
                        }
                    </ul>
                </div>

                {/* <!-- PC web에서 보여지는 영역 --> */}
                <div className="user_info">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {loginUser?.id &&
                        <>
                            <span className="person">{loginUser?.name} </span> You are logged in as an administrator.
                            <button onClick={logOutHandler} className="btn">Log out</button>
                        </>
                    }
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!loginUser?.id &&
                        <button onClick={logInHandler} className="btn login">login</button>
                    }
                </div>
                {/* <!--// PC web에서 보여지는 영역 --> */}

                {/* <!-- right area --> */}
                <div className="right_a">
                    <button type="button" className="btn btnAllMenu" title="All menus closed">Full menu</button>
                    <button type="button" className="btn mobile btnAllMenuM" title="All menus closed">Full menu</button>
                </div>
            </div>

            {/* <!-- All menu : web -->  DROWN MENU*/}
            <div className="all_menu WEB">
                <h2 className="blind">Full menu</h2>
                <div className="inner">
                    <div className="col">
                        <h3>Site Introduction</h3>
                        <ul>
                            <li><NavLink to={URL.ABOUT_SITE} activeClassName="cur">Introduce</NavLink></li>
                            <li><NavLink to={URL.ABOUT_HISTORY} activeClassName="cur">History</NavLink></li>
                            <li><NavLink to={URL.ABOUT_ORGANIZATION} activeClassName="cur">Organization introduction</NavLink></li>
                            <li><NavLink to={URL.ABOUT_LOCATION} activeClassName="cur">Directions</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Information </h3>
                        <ul>
                            <li><NavLink to={URL.INTRO_WORKS} activeClassName="cur">Introduction of major business</NavLink></li>
                            <li><NavLink to={URL.INTRO_SERVICE} activeClassName="cur">Representative service introduction</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Customer Support</h3>
                        <ul>
                            <li><NavLink to={URL.SUPPORT_DOWNLOAD} activeClassName="cur">Reference Room</NavLink></li>
                            <li><NavLink to={URL.SUPPORT_QNA} activeClassName="cur">Ask and answer</NavLink></li>
                            <li><NavLink to={URL.SUPPORT_APPLY} activeClassName="cur">Service request</NavLink></li>
                        </ul>
                    </div>
                    <div className="col">
                        <h3>Notification</h3>
                        <ul>
                            <li><NavLink to={URL.INFORM_DAILY}>Today's event</NavLink></li>
                            <li><NavLink to={URL.INFORM_WEEKLY} activeClassName="cur">Event of the week</NavLink></li>
                            <li><NavLink to={URL.INFORM_NOTICE} activeClassName="cur">Notice</NavLink></li>
                            <li><NavLink to={URL.INFORM_GALLERY} activeClassName="cur">site gallery</NavLink></li>
                        </ul>
                    </div>
                    {loginUser?.id &&
                        <div className="col">
                            <h3>Site management</h3>
                            <ul>
                                <li><NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">Schedule management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_BOARD} activeClassName="cur">Bulletin board creation management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_USAGE} activeClassName="cur">Board use management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">Notice management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">Site gallery management</NavLink></li>
                            </ul>
                        </div>
                    }
                </div>
            </div>
            {/* <!-- All menu : mobile --> */}
            <div className="all_menu Mobile bg-red-500">
                <div className="user_info_m">
                    {/* 로그아웃 : 로그인 정보 있을때 */}
                    {loginUser?.id &&
                        <>
                            <span className="person">{loginUser?.name} </span>You are logged in.
                            <button onClick={logOutHandler} className="btn logout">Log out</button>
                        </>
                    }
                    {/* sidebar menu  */}
                    {/* 로그인 : 로그인 정보 없을 때 */}
                    {!loginUser?.id &&
                        <button onClick={logInHandler} className="btn login">login</button>
                    }
                    <button className="btn noscript close" type="button">Close all menus</button>
                </div>
               
                <div className="menu">
                    <h3><Link to={URL.ABOUT}>Site Introduction</Link></h3>
                    <ul>
                        <li><NavLink to={URL.ABOUT_SITE} activeClassName="cur">Introduce</NavLink></li>
                        <li><NavLink to={URL.ABOUT_HISTORY} activeClassName="cur">history</NavLink></li>
                        <li><NavLink to={URL.ABOUT_ORGANIZATION} activeClassName="cur">Organization introduction</NavLink></li>
                        <li><NavLink to={URL.ABOUT_LOCATION} activeClassName="cur">Directions</NavLink></li>
                    </ul>
                    <h3><Link to={URL.INTRO}>Information</Link></h3>
                    <ul>
                        <li><NavLink to={URL.INTRO_WORKS} activeClassName="cur">Introduction of major business</NavLink></li>
                        <li><NavLink to={URL.INTRO_SERVICE} activeClassName="cur">Representative service introduction</NavLink></li>
                    </ul>
                    <h3><Link to={URL.SUPPORT}>Customer Support</Link></h3>
                    <ul>
                        <li><NavLink to={URL.SUPPORT_DOWNLOAD} activeClassName="cur">Reference Room</NavLink></li>
                        <li><NavLink to={URL.SUPPORT_QNA} activeClassName="cur">Ask and answer</NavLink></li>
                        <li><NavLink to={URL.SUPPORT_APPLY} activeClassName="cur">Service request</NavLink></li>
                    </ul>
                    <h3><Link to={URL.INFORM}>Notification </Link></h3>
                    <ul>
                        <li><NavLink to={URL.INFORM_DAILY}>Today's event</NavLink></li>
                        <li><NavLink to={URL.INFORM_WEEKLY} activeClassName="cur">Event of the week</NavLink></li>
                        <li><NavLink to={URL.INFORM_NOTICE} activeClassName="cur">Notice</NavLink></li>
                        <li><NavLink to={URL.INFORM_GALLERY} activeClassName="cur">site gallery</NavLink></li>
                    </ul>
                    {loginUser?.id &&
                        <>
                            <h3><Link to={URL.ADMIN}>site management</Link></h3>
                            <ul>
                                <li><NavLink to={URL.ADMIN_SCHEDULE} activeClassName="cur">schedule management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_BOARD} activeClassName="cur">Bulletin board creation management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_USAGE} activeClassName="cur">Board use management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_NOTICE} activeClassName="cur">Notice management</NavLink></li>
                                <li><NavLink to={URL.ADMIN_GALLERY} activeClassName="cur">Site gallery management</NavLink></li>
                            </ul>
                        </>
                    }
                </div>
            </div>
            {/* <!--// All menu --> */}
        </div>
        // <!--// header -->
    );
}

export default EgovHeader;