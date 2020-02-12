import React from 'react';
import './MainStory.css';
import WritingContainer from "../../Component/WritingContainer/WritingContainer";
import StoryItem from "../../Component/StoryItem/StoryItem";
import {deletePost, getComments, getPost, setStoryUserData} from "../../services/DataService";
import eventService from "../../services/EventService";
import {ModalWritingContainer} from "../../Component/ModalWritingContainer/ModalWritingContainer";
import {LoadingIndicator} from "../../services/LoadingIndicator";
import waitDialog from "../../services/WaitDialog/WaitDialog";

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
      if(posts[idx].isprivate_num)  posts[idx].isprivate_num = isPrivateNumData.isprivate_num;
      // posts[idx] = postData;
      this.setState({postList: posts});
    });

    window.addEventListener('scroll', (e) => {
      const {scrollTop, scrollHeight, clientHeight} = document.documentElement;
      if ((scrollTop + clientHeight) >= scrollHeight) {
        setTimeout(() => {
          this.setState({loading: false, viewCnt: this.state.viewCnt + 5});
        }, 1000);
        if(this.state.viewCnt < this.state.postList.length) {
          this.setState({loading: true});
        }
      }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevState.state && this.state.postList !== prevState.state.postList) {
      console.log(this.state.postList, prevState.state.postList);
      this.getPostEvent();
    }
  }

  getPostEvent = () => {
    getPost(this.state.userInfo.id, (data) => {
      console.log(data);
      if (data.posts !== undefined) {
        // console.log(this);
        let arr = data.posts.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
        this.setState({postList: data.posts, userList: data.users});
        // this.render();
        console.log(data.users);
        try {
          data.users.forEach(uv => {
            // console.log(uv);
            setStoryUserData(uv.userid, uv.name, uv.profileimg);
          });
        }
        catch(e){
          console.log(e);
        }

        let posts = this.state.postList;
        // console.log(posts);
        posts.forEach(v => {
          getComments(v.id, (cData) => {
            // console.log("loadComments:", cData);
            v.comments = cData.data;
            v.onUpdateComments = (comments) => {
              let postData = this.state.postList;
              postData.find(fv => fv.id === v.id).comments = comments;
              this.setState({postList: postData});
            };
            this.setState({postList: posts});
          });
        });
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
      if(res.result == 1) {
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
              this.state.postList.map((v, i) => (i < this.state.viewCnt) ? (
                  <StoryItem key={i} postData={v} arrnum={i}
                             userData={this.state.userList}
                             updatePostEvent={this.updatePostEvent}
                             deletePostEvent={this.deletePostEvent}/>
                ) : null
              )
            }
            {
              (this.state.loading) ? (<div style={{textAlign: "center", margin: "30px 0"}}>
                <div className="spinner-border text-warning"/>
              </div>) : (<LoadingIndicator/>)
            }

          </div>
        </div>
      </div>
    )
  }
}

export default MainStory;
