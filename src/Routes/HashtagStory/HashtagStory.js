import * as React from 'react';
import "./HashtagStory.css";
import {MyImgItem} from "../../Component/MyImgItem/MyImgItem";
import {ModalStoryItem} from "./ModalStoryItem/ModalStoryItem";
import {getPostFromHashTag} from "../../services/DataService";

export class HashtagStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalStoryItemNum: -1,
      posts: []
    };
  }

  updateHashtagPost = () => {
    getPostFromHashTag(this.props.match.params.tag, res => {
      let posts= res.posts;
      posts.forEach(v => {
        v.onUpdateComments = (comments) => {
          // console.log(v.id, comments);
          [this.state.posts.find(fv => fv.id === v.id)].forEach(postData => {
            postData.comments = comments;
            this.setState({posts: this.state.posts});
          });
        };
      });
      this.setState({posts: posts});
      // console.log(res.posts);
    });
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(this.props.match.params.tag !== prevProps.match.params.tag) {
      this.updateHashtagPost();
    }
  }

  componentDidMount() {
    this.updateHashtagPost();
  }

  showStoryItem = (e) => {
    e.preventDefault();
    let elm = e.target;
    while(elm.dataset.postid === undefined) {
      elm = elm.parentElement;
    }
    this.setState({modalStoryItemNum: Number(elm.dataset.postid)});
  };

  hideStoryItem = () => {
    this.setState({modalStoryItemNum: -1});
  };

  render() {
    // console.log(this.props);
    let fileArr = [];
    let postData = [];
    // console.log(postData);
    this.state.posts.forEach(v => {
      if( v.file !== null ) {
        Array(Number(v.filecnt)).fill(0).forEach((pv,pi) => {
          postData.push(v);
          fileArr.push(`/php/downloadImage.php?id=${v.file}&subid=${pi}`);
        })
      } else {
        postData.push(v);
        fileArr.push(v);
      }
    });
    // console.log(this.state.posts);
    // console.log(this.state.posts.filter(v => v.id == this.state.modalStoryItemNum)[0], this.state.modalStoryItemNum);
    return (
      <div className="hashtagStory">
        {
          (this.state.modalStoryItemNum >= 0) ? (
            <ModalStoryItem post={this.state.posts.filter(v => v.id == this.state.modalStoryItemNum)[0]}
                            showStoryItem={this.showStoryItem} hideStoryItem={this.hideStoryItem} />
          ) : null
        }
        <div className="article_story">
          <div className="hash">
            <div className="inner_hash">
              <h3 className="tit_hash">#{this.props.match.params.tag}</h3>
              <div className="btn_wh">글쓰기</div>
            </div>
          </div>
          <div className="wrap_recomm">
            <div className="tit_recomm">게시물</div>
            <div className="img_wrap">
              {/*<MyImgItem onClickEvent={this.showStoryItem}/>*/}
              {/*<MyImgItem/>*/}
              {/*<MyImgItem/>*/}
              {/*<MyImgItem type="txt"/>*/}

              {
                fileArr.map((v,i) =>
                  (typeof v === "string") ? (
                  <MyImgItem key={i} imgSrc={v} postData={postData[i]} onClickEvent={this.showStoryItem}/>
                  ) : (
                    <MyImgItem key={i} type={"txt"} postData={postData[i]} onClickEvent={this.showStoryItem}/>
                  )
                )
              }

            </div>
          </div>
        </div>
      </div>
    );
  };
}