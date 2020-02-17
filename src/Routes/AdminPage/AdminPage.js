import * as React from 'react';
import "./AdminPage.css";
import eventService from "../../services/EventService";
import StoryItem, {StoryItemLoading} from "../../Component/StoryItem/StoryItem";
import {
    countPostFromUser,
    deletePost,
    deleteUser,
    getPost,
    getPostFromAdminPage,
    logout,
    setStoryUserData
} from "../../services/DataService";
import LazyLoad from "react-lazyload";

export class AdminPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            postData: [],
            userList: [],

            postTop5: [],
            commentTop5: []
        };
    }


    componentDidMount() {
        eventService.emitEvent("topMenuHide", true);
        this.getPostEvent();
    }

    componentWillUnmount() {
        // console.log("나갔니?");
        eventService.emitEvent("topMenuHide", false);
    }

    updatePostEvent = (e) => {
        let postid = e.target.dataset.num;
        let editPost = this.state.postData.find(v => v.id === postid);
        eventService.emitEvent("editPostToMyHeader", editPost);
    };

    deletePostEvent = (e) => {
        let postid = e.target.dataset.num;
        // console.log('postid:', postid, this.state.postData);
        deletePost(postid, (res) => {
            // console.log(res);
            if (res.result == 1) {
                // this.getPostEvent();
                this.setState({postData: this.state.postData.filter(v => postid !== v.id)})
            }
            // console.log('result:', res.result, this.state.postData);
        });
    };

    getPostEvent = () => {
        getPostFromAdminPage((data) => {
            // console.log([...data.posts, ...data.ups]);
            if (data.posts !== undefined) {
                // console.log(data);
                let arr = data.posts.sort((a, b) =>
                    new Date((b.upcreated) ? b.upcreated : b.created).getTime() - new Date((a.upcreated) ? a.upcreated : a.created).getTime());
                // console.log(arr);

                // countPostFromUser
                // export const countCommentFromUser

                //
                // data.users.forEach((v,i) => {
                //     countPostFromUser(v.userid, (res) => {
                //
                //     });
                // });

                this.setState({postData: arr, userList: data.users});
                // this.render();
                // console.log(data.users);
                data.users.forEach(uv => setStoryUserData(uv.userid, uv.name, uv.profileimg));

                let posts = this.state.postData;
                // console.log(posts);
                posts.forEach(v => {
                    v.onUpdateComments = (comments) => {
                        // console.log(v.id, comments);
                        [this.state.postData.find(fv => fv.id === v.id)].forEach(postData => {
                            postData.comments = comments;
                            this.setState({postData: this.state.postData});
                        });
                    };
                });
                this.setState({postData: posts});
            }
        })
    };

    logoutEvent = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("isSaveUserInfo");
        eventService.emitEvent("loginStatus", false);
        logout((data) => {
            // console.log(data)
        });
    };

    deleteUser = (e) => {
        // console.log(e.target.dataset.uid);
        deleteUser(e.target.dataset.uid, (res) => {
            // console.log(res);
            this.setState({userList: res.users})
        });
    };

    render() {
        // console.log(this.state.userList);
        return (
            <div className="adminPage">
                <nav className="navbar navbar-expand-sm bg-dark navbar-dark"
                     style={{position: "fixed", top: 0, width: "100%", zIndex: 300}}>
                    <a className="navbar-brand">관리자 페이지</a>
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" onClick={this.logoutEvent}>로그아웃</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Link 2</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link">Link 3</a>
                        </li>
                    </ul>
                </nav>
                <div className="article_story">
                    <div className="feed">
                        {
                            this.state.postData.map((v, i) => (
                                <LazyLoad key={i} placeholder={<StoryItemLoading/>}>
                                    <StoryItem key={i} postData={v} arrnum={i}
                                               userData={this.state.userList}
                                               updatePostEvent={this.updatePostEvent}
                                               deletePostEvent={this.deletePostEvent}/>
                                </LazyLoad>
                            ))
                        }
                    </div>
                    <div className="leftInfoFromAdmin">
                        <div className="section_widgets">
                            <h3 className="tit_widgets" style={{paddingTop: "15px"}}>가입된 회원</h3>
                            <div className="keyword_widgets">
                                <p className="link_keyword">가입된 회원수: {this.state.userList.length}명</p>
                                <div className="userInfosFromAdmin">
                                    {
                                        this.state.userList.filter(v => v.userid !== "admin").map((v, i) => (
                                            <div key={i}>{v.name} <span style={{color: "red", cursor: "pointer"}}
                                                                        data-uid={v.userid}
                                                                        onClick={this.deleteUser}>삭제</span></div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="section_widgets">
                            <div className="keyword_widgets">
                                <h3 className="tit_widgets" style={{paddingTop: "15px"}}>많이 작성한 유저 TOP 5</h3>
                                <div>글:</div>

                                <div>댓글:</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
};