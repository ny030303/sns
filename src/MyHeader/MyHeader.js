import React from 'react';
import './MyHeader.css';
import {withRouter} from 'react-router-dom';
import HeaderSearchInput from "../Component/HeaderSearchInput/HeaderSearchInput";
import {ModalWritingContainer} from "../Component/ModalWritingContainer/ModalWritingContainer";
import {SearchItem} from "../Component/SearchItem/SearchItem";
import eventService from "../services/EventService";
import {getSearchBoxItemInfos} from "../services/DataService";


class MyHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isModalWritingContainerOn: false,
            isSearchBoxOn: false,

            editPostData: null,
            searchItemList: null
        };
        this.searchInput = React.createRef();

    }


    onClickIconEvent = (e) => {
        let type = e.target.dataset.type;
        console.log(type);
        switch (type) {
            case "write":
                // console.log(this.props.history);
              this.showModalWritingContainer();
                break;
            case "newnoti":
                break;
            case "storyteller":
                break;
            case "mychannel":
                break;
        }
    };
    showModalWritingContainer = () => this.setState({isModalWritingContainerOn: !this.state.isModalWritingContainerOn});

    gotoMain = () => {this.props.history.push("/")};


    onSearch = () => {
        console.log(this.searchInput.current.value);

    };

    componentDidMount() {
        eventService.listenEvent("editPostToMyHeader", (editPostData) => {
            // 입력된 내용으로 표시
            console.log(editPostData);
            this.setState({isModalWritingContainerOn: true, editPostData: editPostData});
        });

        this.searchInput.current.addEventListener("input", (e) => {
            let texts = e.target.value;
            console.log(e.data);
            getSearchBoxItemInfos({text: texts}, (res) => {
                console.log(res);
                this.setState({searchItemList: res});
            });
            if(texts.length <= 0) {
                this.setState({isSearchBoxOn: false});
            } else {
                this.setState({isSearchBoxOn: true});
            }
        });
    }

    render() {
        return (
            <div className="myHeader">
                {(this.state.isModalWritingContainerOn) ? (
                  <ModalWritingContainer postData={this.state.editPostData}
                                         showModalWritingContainer={this.showModalWritingContainer}/>) : null}
                <div className="headerLogoWrap">
                    <div className="headerLogoMargin">
                        <img src="/images/header/logo_kakaostory.png" style={{cursor:"pointer"}}
                             onClick={this.gotoMain}/>
                    </div>
                </div>
                <div className="headerSearchWrap">
                    <div className="searchBarWrap">
                        <HeaderSearchInput onSearch={this.onSearch} inputRef={this.searchInput}/>
                    </div>
                    <div className="searchLayerWrap" style={(this.state.isSearchBoxOn) ? null : {display: "none"}}>
                        <div className="inner_gnb_layer">
                            <span className="ico_ks ico_arrow_up"/>
                            <ul className="search_list">
                                {
                                    (this.state.searchItemList) ?
                                      this.state.searchItemList.users.map((v,i) =>
                                      (<SearchItem key={i} type={"user"} datas={v} callbackEvent={() => this.props.history.push(`/story/${v.id}/main`)}/>))
                                      : (<SearchItem type={"no_data"}/>)
                                }
                                {
                                    (this.state.searchItemList) ?
                                      this.state.searchItemList.tags.map((v,i) =>
                                        (<SearchItem key={i} type={"hashtag"} datas={v} callbackEvent={() => this.props.history.push(`/hashtag/${v.name.slice(1)}`)}/>))
                                      : null
                                }
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
