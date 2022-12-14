import React, { useState, useEffect } from 'react';

import { Link, useHistory } from 'react-router-dom';

import * as EgovNet from 'context/egovFetch';
import URL from 'context/url';
import CODE from 'context/code';
import { NOTICE_BBS_ID } from 'context/config';

import { default as EgovLeftNav } from 'egov/common/leftmenu/EgovLeftNavInform';
import EgovAttachFile from 'egov/common/EgovAttachFile';

function EgovNoticeDetail(props) {
    console.group("EgovNoticeDetail");
    console.log("------------------------------");
    console.log("EgovNoticeDetail [props] : ", props);

    const history = useHistory();
    console.log("EgovNoticeDetail [history] : ", history);

    const bbsId = history.location.state.bbsId || NOTICE_BBS_ID;
    const nttId = history.location.state.nttId;
    const searchCondition = history.location.state.searchCondition;

    const [masterBoard, setMasterBoard] = useState({});
    const [user, setUser] = useState({});
    const [boardDetail, setBoardDetail] = useState({});
    const [boardAttachFiles, setBoardAttachFiles] = useState();

    const retrieveDetail = () => {
        const retrieveDetailURL = '/cop/bbs/selectBoardArticleAPI.do';
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId
            })
        }
        EgovNet.requestFetch(retrieveDetailURL,
            requestOptions,
            function (resp) {
                setMasterBoard(resp.result.brdMstrVO);
                setBoardDetail(resp.result.boardVO);
                setUser(resp.result.user);
                setBoardAttachFiles(resp.result.resultFiles);
            }
        );
    }

    const onClickDeleteBoardArticle = (bbsId, nttId) => {
        const deleteBoardURL = "/cop/bbs/deleteBoardArticleAPI.do";
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                bbsId: bbsId,
                nttId: nttId
            })
        }

        EgovNet.requestFetch(deleteBoardURL,
            requestOptions,
            (resp) => {
                console.log("====>>> board delete= ", resp);
                if (Number(resp.resultCode) === Number(CODE.RCV_SUCCESS)) {
                    //window.location.href = URL.INFORM_NOTICE + qs.stringify(query, { addQueryPrefix: true });
                    alert("???????????? ?????????????????????.")
                    history.push(URL.INFORM_NOTICE);
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
    
    console.groupEnd("EgovNoticeDetail");

    return (
        <div className="container mx-auto">
            <div className="c_wrap">
                {/* <!-- Location --> */}
                <div className="location">
                    <ul>
                        <li><Link to={URL.MAIN} className="home">Home</Link></li>
                        <li><Link to={URL.INFORM}>????????????</Link></li>
                        <li>{masterBoard && masterBoard.bbsNm}</li>
                    </ul>
                </div>
                {/* <!--// Location --> */}

                <div className="layout">
                    {/* <!-- Navigation --> */}
                    <EgovLeftNav></EgovLeftNav>
                    {/* <!--// Navigation --> */}

                    <div className="contents NOTICE_VIEW" id="contents">
                        {/* <!-- ?????? --> */}

                        <div className="top_tit">
                            <h1 className="tit_1">????????????</h1>
                        </div>

                        <h2 className="tit_2">{masterBoard && masterBoard.bbsNm}</h2>

                        {/* <!-- ????????? ???????????? --> */}
                        <div className="board_view">
                            <div className="board_view_top">
                                <div className="tit">{boardDetail && boardDetail.nttSj}</div>
                                <div className="info">
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterNm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>{boardDetail && boardDetail.frstRegisterPnttm}</dd>
                                    </dl>
                                    <dl>
                                        <dt>?????????</dt>
                                        <dd>{boardDetail && boardDetail.inqireCo}</dd>
                                    </dl>
                                </div>
                            </div>

                            <div className="board_article">
                                <textarea name="" cols="30" rows="10" readOnly="readonly" defaultValue={boardDetail && boardDetail.nttCn}></textarea>
                            </div>
                            <div className="board_attach">
                                <EgovAttachFile boardFiles={boardAttachFiles} />
                            </div>


                            <div className="board_btn_area">
                                {user.id &&
                                    <div className="left_col btn3">
                                        <Link to={{
                                            pathname: URL.INFORM_NOTICE_MODIFY,
                                            state: {
                                                nttId: nttId,
                                                bbsId: bbsId
                                            }
                                        }} className="btn btn_skyblue_h46 w_100">??????</Link>
                                        <button className="btn btn_skyblue_h46 w_100" onClick={(e) => {
                                            // e.preventDefault();
                                            onClickDeleteBoardArticle(boardDetail.bbsId, boardDetail.nttId);
                                        }}>??????</button>
                                        <Link to={{
                                            pathname: URL.INFORM_NOTICE_REPLY,
                                            state: {
                                                nttId: nttId,
                                                bbsId: bbsId
                                            }
                                        }} className="btn btn_skyblue_h46 w_100">????????????</Link>
                                    </div>
                                }

                                <div className="right_col btn1">
                                    <Link to={{
                                        pathname: URL.INFORM_NOTICE,
                                        state: {
                                            nttId: nttId,
                                            bbsId: bbsId,
                                            searchCondition: searchCondition
                                        }
                                    }} className="btn btn_blue_h46 w_100">??????</Link>
                                </div>
                            </div>
                        </div>
                        {/* <!-- ????????? ???????????? --> */}

                        {/* <!--// ?????? --> */}
                    </div>
                </div>
            </div>
        </div>
    );
}


export default EgovNoticeDetail;