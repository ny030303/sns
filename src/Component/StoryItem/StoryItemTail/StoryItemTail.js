import * as React from 'react';
import {MyMenu} from "../../MyMenu/MyMenu";
import Lightbox from "react-image-lightbox";
import {addPostFeeling, deletePostFeeling, getPostFeeling} from "../../../services/DataService";

export default class StoryItemTail extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      feelIconClass: "",
      feelingCnt: 0
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
    getPostFeeling(this.props.postData.id, (cData) => {
      // console.log("loadFeelings:", cData);
      // console.log(this.state.feelings);
      if(Array.isArray(cData.data)) {
        this.setState({feelings: cData.data.map(v => JSON.parse(v))});
        console.log(this.state.feelings);
        this.state.feelings.forEach((v,i) => {
          if(v.userid === this.nowUserInfo.id) {
            this.setState({feelIconClass: v.feeling});
          }
        });
      } else {
        this.setState({feelings: JSON.parse(cData.data)});
        console.log(this.state.feelings);
        if(this.state.feelings.userid === this.nowUserInfo.id) {
          this.setState({feelIconClass: this.state.feelings.feeling});
        }
      }
      this.setState({feelingCnt: this.state.feelings.length});

    });
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
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid:this.nowUserInfo.id, feeling: feeling})
    };

    deletePostFeeling(data, (res) => {

    });
  };

  addFeelingToPost = (feeling) => {
    this.setState({feelingCnt: this.state.feelingCnt +=1});
    let data = {
      postid: this.props.postData.id,
      feelingInfo: JSON.stringify({userid:this.nowUserInfo.id, feeling: feeling})
    };
    addPostFeeling(data, (res) => {

    });
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
            <div className="ico_ks2 bn_up"/>
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