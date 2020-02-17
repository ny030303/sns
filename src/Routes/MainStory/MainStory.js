import React from 'react';
import LazyLoad from 'react-lazyload';
import './MainStory.css';
import WritingContainer from "../../Component/WritingContainer/WritingContainer";
import {deletePost, getPost, getUserFriends, setStoryUserData} from "../../services/DataService";
import eventService from "../../services/EventService";
import StoryItem, {StoryItemLoading} from "../../Component/StoryItem/StoryItem";

class MainStory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userInfo: JSON.parse(localStorage.getItem("userInfo")),
      postList: [],
      userList: [],
      isModalWritingContainerOn: false,
      viewCnt: 5,
      loading: false
    };

    eventService.listenEvent("reloadStorys", (res) => {
      console.log(res);
      this.getPostEvent();
    });

    if (this.state.userInfo !== undefined) this.getPostEvent();
  }


  componentDidMount() {
    console.log('MainStory');
    this.getPostEvent();
    eventService.listenEvent("updatePostToMainAndUserStory", (postData) => {
      let posts = this.state.postList;
      let idx = posts.findIndex(v => v.id === postData.id);
      console.log(postData, posts[idx]);
      posts[idx] = postData;
      this.setState({postList: posts});
    });

    eventService.listenEvent("updateIsPrivateNumToMainAndUserStory", (isPrivateNumData) => {
      let posts = this.state.postList;
      let idx = posts.findIndex(v => v.id === isPrivateNumData.postid);
      console.log(isPrivateNumData, posts[idx]);
      if (posts[idx].isprivate_num) posts[idx].isprivate_num = isPrivateNumData.isprivate_num;
      // posts[idx] = postData;
      this.setState({postList: posts});
    });

    eventService.listenEvent("feelingUpdateToMainAndUserStory", (data) => {
      [this.state.postList.find(v => v.id === data.postid)].forEach(v => {
        v.feeling = data.feeling;
        this.setState({postList: this.state.postList});
      });
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state && this.state.postList !== prevState.state.postList) {
      console.log(this.state.postList, prevState.state.postList);
      this.getPostEvent();
    }
  }



  getPostEvent = () => {
    getPost(this.state.userInfo.id, (data) => {
      // console.log([...data.posts, ...data.ups]);
      if (data.posts !== undefined && data.ups !== undefined) {
        console.log(data);
        let arr = [...data.posts, ...data.ups].sort((a, b) =>
          new Date((b.upcreated) ? b.upcreated : b.created).getTime() - new Date((a.upcreated) ? a.upcreated : a.created).getTime());
        console.log(arr);
        this.setState({postList: arr, userList: data.users});
        // this.render();
        console.log(data.users);
        data.users.forEach(uv => setStoryUserData(uv.userid, uv.name, uv.profileimg));

        let posts = this.state.postList;
        // console.log(posts);
        posts.forEach(v => {
          v.onUpdateComments = (comments) => {
            console.log(v.id, comments);
            [this.state.postList.find(fv => fv.id === v.id)].forEach(postData => {
              postData.comments = comments;
              this.setState({postList: this.state.postList});
            });
          };
        });
        this.setState({postList: posts});
      }
    })
  };


  updatePostEvent = (e) => {
    let postid = e.target.dataset.num;
    let editPost = this.state.postList.find(v => v.id === postid);
    eventService.emitEvent("editPostToMyHeader", editPost);
  };

  deletePostEvent = (e) => {
    let postid = e.target.dataset.num;
    console.log('postid:', postid, this.state.postList);
    deletePost(postid, (res) => {
      console.log(res);
      if (res.result == 1) {
        // this.getPostEvent();
        this.setState({postList: this.state.postList.filter(v => postid !== v.id)})
      }
      console.log('result:', res.result, this.state.postList);
    });
  };

  render() {
    //console.log(this.state.postList);
    return (
      <div className="mainStory">
        <div className="article_story">
          <WritingContainer getPostEvent={this.getPostEvent}/>
          <div className="feed">
            {
              this.state.postList.map((v, i) => (
                <LazyLoad key={i} placeholder={<StoryItemLoading/>}>
                  <StoryItem key={i} postData={v} arrnum={i}
                             userData={this.state.userList}
                             updatePostEvent={this.updatePostEvent}
                             deletePostEvent={this.deletePostEvent}/>
                </LazyLoad>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default MainStory;
