import * as React from 'react';
import {MyMenu} from "../../MyMenu/MyMenu";
import Lightbox from "react-image-lightbox";
import {
  addPostFeeling,
  addPostUp,
  deletePostFeeling,
  deletePostUp,
  getPostFeeling
} from "../../../services/DataService";

export default class StoryItemTail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feelIconClass: "",
      feelingCnt: 0,
      isUpOn: false,
      feelings: null
    };
    this.feelIcons = [
      "bn_feel",
      "bn_like",
      "bn_pleasure",
      "bn_sad",
      "bn_cheerup",
      "bn_good",
    ];
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  }


  componentDidMount() {
    this.loadFeelings();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.state) {
      // console.log(prevState.state);
    }
    if (prevState.state && this.state.feelings !== prevState.state.feelings) {
      this.loadFeelings();
    }
  }

  loadFeelings = () => {
    if(this.props.postData.feeling !== "") {
      let cData = this.props.postData.feeling.split("|");
      console.log(cData.length);
      console.log(cData.map(v => JSON.parse(v)));

      if(Array.isArray(cData)) {
        // console.log(this.state.feelings);
        cData.map(v => JSON.parse(v)).forEach((v,i) => {
          if(v.userid === this.nowUserInfo.id) {
            this.setState({feelIconClass: v.feeling});
          }
        });
      } else {
        // this.setState({feelings: JSON.parse(cData)});
        // console.log(this.state.feelings);
        if(this.state.feelings.userid === this.nowUserInfo.id) {
          this.setState({feelIconClass: JSON.parse(cData).feeling});
        }
      }
      this.setState({feelingCnt: cData.length});
      this.props.onFeelingCnt(cData.length);
    }
  };


  feelIconEvent = (e) => {
    let fnum = e.target.dataset.fnum;
    this.setState({feelIconClass: this.feelIcons[fnum]});
    this.addFeelingToPost(this.feelIcons[fnum]);
  };

  nowFeelIconEvent = () => {
    if(this.state.feelIconClass === "") {
      this.setState({feelIconClass:  "bn_like"});
      this.addFeelingToPost("bn_like");
    } else {
      this.setState({feelIconClass:  ""});
      this.deleteFeelingToPost(this.state.feelIconClass);
    }
  };

  deleteFeelingToPost = (feeling) => {
    this.setState({feelingCnt: this.state.feelingCnt -=1});
    this.props.onFeelingCnt(this.state.feelingCnt);
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid:this.nowUserInfo.id, feeling: feeling})
    };

    deletePostFeeling(data, (res) => {

    });
  };

  addFeelingToPost = (feeling) => {
    this.setState({feelingCnt: this.state.feelingCnt +=1});
    this.props.onFeelingCnt(this.state.feelingCnt);
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid:this.nowUserInfo.id, feeling: feeling})
    };
    addPostFeeling(data, (res) => {

    });
  };

  onUpClickEvent = () => {
    console.log(this.props.postData);

    if(this.state.isUpOn) { // 삭제
      deletePostUp(this.props.postData.id, this.nowUserInfo.id, (res) => {
        console.log(res);
      });
    } else { // 추가
      addPostUp(this.props.postData.id, this.nowUserInfo.id, (res) => {
        console.log(res);
      });
    }
    this.setState({isUpOn: !this.state.isUpOn});
  };

  render() {
    return (
      <div>
        <div className="storyContentsWrap">
          <div className="storyitem_icon_wrap">
            <div onClick={this.nowFeelIconEvent} className={`ico_ks2 bn_feel ${this.state.feelIconClass}`}
                 id="nowFeelIcon"/>
            {
              this.state.feelIconClass !== "" ? null : (
                <div className="selectFeelIcons">
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_like selectFeelIconStyle" data-fnum="1"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_pleasure selectFeelIconStyle" data-fnum="2"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_sad selectFeelIconStyle" data-fnum="3"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_cheerup selectFeelIconStyle" data-fnum="4"/>
                  <div onClick={this.feelIconEvent} className="ico_ks2 bn_good selectFeelIconStyle" data-fnum="5"/>
                </div>
              )
            }

            <div className="ico_ks2 bn_share"/>
            <div className={`ico_ks2 bn_up ${(this.state.isUpOn) ? "on" : ""}`} onClick={this.onUpClickEvent}/>
            <div className="relative feelingUserIconWrap" style={{display: "inline-block"}}>
              {
                (this.state.feelIconClass !== "") ? (this.nowUserInfo.profileimg == null) ?
                  (<div className="storyItem_feeling_user_img_wrap">
                    <span className="img_profile storyItem_frame_g"/>
                    <span className={this.state.feelIconClass}/>
                  </div>) :
                  (<div className="storyItem_feeling_user_img_wrap">
                    <span className="img_profile storyItem_feeling_user_img" style={{backgroundImage: `url(${this.nowUserInfo.profileimg})`}}/>
                    <span className={this.state.feelIconClass}/>
                  </div>) : null
              }
              {
                (this.state.feelingCnt <=0) ? null : (this.state.feelIconClass !== "") ? (<div className="bn_morelike">+{this.state.feelingCnt-1}</div>) : (<div className="bn_morelike">+{this.state.feelingCnt}</div>)
              }
            </div>
          </div>
        </div>
      </div>
    );
  };
};