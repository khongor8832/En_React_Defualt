import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovPaging from 'egov/common/EgovPaging';
import EgovAttachFile from 'egov/common/EgovAttachFile';

function EgovDailyDetail(props) {
    console.group("EgovDailyDetail");
    console.log("[Start] EgovDailyDetail ------------------------------");
    console.log("EgovDailyDetail [props] : ", props);

    const history = useHistory();
    console.log("EgovDailyDetail [history] : ", history);

    const [scheduleDetail, setScheduleDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();
    const [user, setUser] = useState({});

    const retrieveDetail = () => {

        const retrieveDetailURL = '/cop/smt/sim/egovIndvdlSchdulManageDetailAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                schdulId: history.location.state?.schdulId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                let rawScheduleDetail = resp.result.scheduleDetail;
                rawScheduleDetail.startDateTime = convertDate(rawScheduleDetail.schdulBgnde);
                rawScheduleDetail.endDateTime = convertDate(rawScheduleDetail.schdulEndde);
                rawScheduleDetail.reptitSeCodeNm = getCodeName(resp.result.reptitSeCode, resp.result.scheduleDetail.reptitSeCode);
                rawScheduleDetail.schdulIpcrCodeNm = getCodeName(resp.result.schdulIpcrCode, resp.result.scheduleDetail.schdulIpcrCode);
                rawScheduleDetail.schdulSeNm = getCodeName(resp.result.schdulSe, resp.result.scheduleDetail.schdulSe);
                setScheduleDetail(rawScheduleDetail);
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }
    const convertDate = (str) => {
        let year = str.substring(0, 4);
        let month = str.substring(4, 6);
        let date = str.substring(6, 8);
        let hour = str.substring(8, 10);
        let minute = str.substring(10, 12);
        return {
            year: year,
            month: month,
            date: date,
            hour: hour,
            minute: minute,
            dateForm: year + "??? " + month + "??? " + date + "??? " + hour + "??? " + minute + "??? "
        }
    }

    const getCodeName = (codeArr, code) => {
        return (
            codeArr.map((codeObj) => {
                if (codeObj.code == code) return codeObj.codeNm;
            })
        );
    }

    const onClickDeleteSchedule = (schdulId) => {
        const deleteBoardURL = "/cop/smt/sim/egovIndvdlSchdulManageDeleteAPI.do";
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                schdulId: schdulId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> Schdule delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    alert("???????????? ?????????????????????.")
                    // history.go(1);
                    history.goBack();
                } else {
                    alert("ERR : " + resp.resultMessage);
                }

            }
        );
    }

    useEffect(function () {
        retrieveDetail();
        return function () {
        }
    }, []);

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
                        <li>????????????</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents SITE_GALLARY_VIEW" id="contents">
                        {/* <!-- ?????? --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">????????????</h1>
                        </div>

                        <h2 className="tit_2">???????????? ????????????</h2>

                        {/* <!-- ????????? ???????????? --> */}
                        <div className="board_view2">
                            <dl>
                                <dt>????????????</dt>
                                <dd>{scheduleDetail.schdulSeNm}</dd>
                            </dl>
                            <dl>
                                <dt>?????????</dt>
                                <dd>{scheduleDetail.schdulIpcrCodeNm}</dd>
                            </dl>
                            <dl>
                                <dt>??????</dt>
                                <dd>{scheduleDetail.schdulDeptName}</dd>
                            </dl>
                            <dl>
                                <dt>?????????</dt>
                                <dd>{scheduleDetail.schdulNm}</dd>
                            </dl>
                            <dl>
                                <dt>????????????</dt>
                                <dd>{scheduleDetail.schdulCn}</dd>
                            </dl>
                            <dl>
                                <dt>????????????</dt>
                                <dd>{scheduleDetail.reptitSeCodeNm}</dd>
                            </dl>
                            <dl>
                                <dt>??????/??????</dt>
                                <dd> {scheduleDetail.startDateTime?.dateForm} ~ {scheduleDetail.endDateTime?.dateForm}</dd>
                            </dl>
                            <dl>
                                <dt>?????????</dt>
                                <dd>{scheduleDetail.schdulChargerName}</dd>
                            </dl>
                            {/* <dl>
                                <dt>????????????</dt>
                                <dd>
                                    <span className="file_attach">
                                        <a href="">file_name.hwp</a> <span>[3626] byte</span>
                                    </span>
                                </dd>
                            </dl> */}

                            <EgovAttachFile boardFiles={boardAttachFiles} />

                            {/* <!-- ???????????? --> */}
                            <div className="board_btn_area">
                                <div className="right_col btn1">
                                    <Link to={history.location.state?.prevPath} className="btn btn_blue_h46 w_100">??????</Link>
                                </div>
                            </div>
                            {/* <!--// ???????????? --> */}
                        </div>
                        {/* <!-- ????????? ???????????? --> */}

                        {/* <!--// ?????? --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EgovDailyDetail;