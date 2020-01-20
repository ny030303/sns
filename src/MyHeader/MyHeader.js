import React from 'react';
import './MyHeader.css';
import {withRouter} from 'react-router-dom';


class MyHeader extends React.Component {

    onClickIconEvent = (e) => {
        let type = e.target.dataset.type;
        console.log(type);
        switch (type) {
            case "write":
                // console.log(this.props.history);
                break;
            case "newnoti":
                break;
            case "storyteller":
                break;
            case "mychannel":
                break;
        }
    };

    gotoMain = () => {this.props.history.push("/")};

    render() {
        return (
            <div className="myHeader">
                <div className="headerLogoWrap">
                    <div className="headerLogoMargin">
                        <img src="/images/header/logo_kakaostory.png" style={{cursor:"pointer"}} onClick={this.gotoMain}/>
                    </div>
                </div>
                <div className="headerSearchWrap">
                    <div className="searchBarWrap">
                        <div className="searchBar">
                            <div className="searchInputWrap">
                                <input className="searchInput" placeholder="친구, 채널, 태그, 장소 검색"/>
                            </div>
                            <div className="searchBtnWrap"><span className="searchBtn ico_ks">검색</span></div>
                        </div>
                    </div>
                    <div className="searchLayerWrap">
                        <div className="inner_gnb_layer">
                            <span className="ico_ks ico_arrow_up"/>
                            <ul className="search_list">
                                <li className="searchItem">
                                    <div className="searchImg img_profile"/>
                                    <div className="info_user">
                                        <div className="txt_name">Dive with Hana</div>
                                        <span className="ico_ks2 ico_teller1"/>
                                    </div>
                                    <button type="button" className="btn_plus styleNoneBtn" data-kant-id="1388"><span className="ico_ks2 ico_plus">소식받기</span></button>
                                </li>
                                <li className="searchItem">
                                    <div className="ico_ks2 thumb_user"/>
                                    <div className="info_user">
                                        <div className="txt_name">Da Nang</div>
                                        <p className="info_user_sub_title">Da Nang, Hải Châu District, Da Nang, Vietnam</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>
                <div className="kakao_gnb">
                    <ul className="gnb_comm">
                        <li className="headerIcon">
                            <span className="ico_ks ico_write" data-type="write" onClick={this.onClickIconEvent}>새소식올리기</span>
                        </li>
                        <li className="headerIcon" style={{marginLeft: "3px"}}>
                            <span className="ico_ks ico_newnoti" data-type="newnoti" onClick={this.onClickIconEvent}>최근 알림</span>
                        </li>
                        <li className="headerIcon" style={{paddingTop: "9px"}}>
                            <span className="ico_ks2 ico_storyteller" data-type="storyteller" onClick={this.onClickIconEvent}>스토리텔러</span>
                        </li>
                        <li className="headerIcon group_gnb">
                            <span className="ico_ks2 ico_mychannel" data-type="mychannel" onClick={this.onClickIconEvent}>스토리채널</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(MyHeader);
