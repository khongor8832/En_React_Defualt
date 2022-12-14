import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';

function EgovDailyList(props) {
    console.group("EgovDailyDetail");
    console.log("[Start] EgovDailyDetail ------------------------------");
    console.log("EgovDailyDetail [props] : ", props);

    const history = useHistory();
    console.log("EgovDailyDetail [history] : ", history);

    const DATE = new Date();
    const TODAY = new Date(DATE.getFullYear(), DATE.getMonth(), DATE.getDate());

    const [searchCondition, setSearchCondition] = useState(history.location.state?.searchCondition || { schdulSe: '', year: TODAY.getFullYear(), month: TODAY.getMonth(), date: TODAY.getDate() });

    const [scheduleList, setScheduleList] = useState([]);
    const [listTag, setListTag] = useState([]);

    const changeDate = (target, amount) => {
        let changedDate;

        if (target === CODE.DATE_YEAR) {
            changedDate = new Date(searchCondition.year + amount, searchCondition.month, searchCondition.date);
        }

        if (target === CODE.DATE_MONTH) {
            changedDate = new Date(searchCondition.year, searchCondition.month + amount, searchCondition.date);
        }

        if (target === CODE.DATE_DATE) {
            changedDate = new Date(searchCondition.year, searchCondition.month, searchCondition.date + amount);
        }

        setSearchCondition({ ...searchCondition, year: changedDate.getFullYear(), month: changedDate.getMonth(), date: changedDate.getDate() });
    }

    const retrieveList = (srchcnd) => {
        console.groupCollapsed("EgovDailyDetail.retrieveList()");

        const retrieveListURL = '/cop/smt/sim/egovIndvdlSchdulManageDailyListAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(srchcnd)
        }

        EgovNet.requestFetch(retrieveListURL,
            requestOptions,
            (resp) => {

                setScheduleList(resp.result.resultList);
                drawList();
            },
            function (resp) {
                console.log("err response : ", resp);
            }
        );

        console.groupEnd("EgovDailyDetail.retrieveList()");
    }

    const drawList = () => {
        let mutListTag = [];
        mutListTag.push(<p className="no_data">????????? ????????? ????????????.</p>); // ????????? ?????? ?????????

        let listCnt = 0;
        // ????????? ?????? ??????
        scheduleList.forEach(function (item, index) {
            if (index === 0) mutListTag = []; // ?????? ?????????
            listCnt++;
            mutListTag.push(
                <Link
                    to={{
                        pathname: URL.INFORM_DAILY_DETAIL,
                        state: {
                            schdulId : item.schdulId,
                            prevPath: URL.INFORM_DAILY
                        }
                    }}
                    key={listCnt}
                    className="list_item" >
                    <div>{getTimeForm(item.schdulBgnde)} ~ {getTimeForm(item.schdulEndde)}</div>
                    <div className="al">{item.schdulNm}</div>
                    <div>{item.userNm}</div>
                </Link>
            );
        });
        setListTag(mutListTag);
    }
    const getTimeForm = (str) => {
        let hour = str.substring(8, 10);
        let starminute = str.substring(10, 12);
        return hour + ":" + starminute;
    }

    useEffect(() => {
        retrieveList(searchCondition);
        return () => {
        }
    }, [searchCondition.schdulSe, searchCondition.year, searchCondition.month, searchCondition.date]);

    useEffect(() => {
        drawList();
        return () => {
        }
    }, [scheduleList]);


    console.log("------------------------------EgovDailyDetail [End]");
    console.groupEnd("EgovDailyDetail");
    return (
        <div className="container mx-auto">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>????????????</Link></li>
                        <li>????????? ??????</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents TODAY_SCHEDULE" id="contents">
                        {/* <!-- ?????? --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">????????????</h1>
                        </div>

                        <h2 className="tit_2">????????? ??????</h2>

                        {/* <!-- ???????????? --> */}
                        <div className="condition">
                            <ul>
                                <li>
                                    <label className="f_select" htmlFor="sel1">
                                        <select name="schdulSe" id="sel1" title="??????"
                                            onChange={e => {
                                                setSearchCondition({ ...searchCondition, schdulSe: e.target.value });
                                            }}
                                        >
                                            <option value="">??????</option>
                                            <option value="1">??????</option>
                                            <option value="2">?????????</option>
                                            <option value="3">??????</option>
                                            <option value="4">??????</option>
                                            <option value="5">??????</option>
                                        </select>
                                    </label>
                                </li>
                                <li>
                                    {/* <a href="" className="prev">?????????????????????</a> */}
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.year}???</span>
                                    {/* <a href="" className="next">?????????????????????</a> */}
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_YEAR, 1);
                                        }}
                                    ></button>
                                </li>
                                <li className="half L">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, -1);
                                        }}
                                    ></button>
                                    <span>{(searchCondition.month + 1)}???</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_MONTH, 1);
                                        }}
                                    ></button>
                                </li>
                                <li className="half R">
                                    <button className="prev"
                                        onClick={() => {
                                            changeDate(CODE.DATE_DATE, -1);
                                        }}
                                    ></button>
                                    <span>{searchCondition.date}???</span>
                                    <button className="next"
                                        onClick={() => {
                                            changeDate(CODE.DATE_DATE, 1);
                                        }}
                                    ></button>
                                </li>
                            </ul>
                        </div>
                        {/* <!--// ???????????? --> */}

                        {/* <!-- ??????????????? --> */}
                        <div className="board_list BRD001">
                            <div className="head">
                                <span>??????</span>
                                <span>??????</span>
                                <span>?????????</span>
                            </div>
                            <div className="result">
                                {listTag}
                            </div>
                        </div>
                        {/* <!--// ??????????????? --> */}
                        {/* <!--// ?????? --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovDailyList;