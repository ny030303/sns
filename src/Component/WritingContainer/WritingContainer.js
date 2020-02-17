import React from 'react';
import axios from "axios";
import './WritingContainer.css';
import {postWriting, updatePost, getSnsFileData} from "../../services/DataService";
import FileUploadPopup from "./FileUploadPopup/FileUploadPopup";
import alertDialog from "../../services/AlertDialog";
import eventService from "../../services/EventService";
import {MyMenu} from "../MyMenu/MyMenu";
import {fileToDataURL, fileToServerURL} from "../../services/CommonUtils";

const replaceAll = (str, target, replacement) => {
  return str.split(target).join(replacement);
};

const htmlchar_run = (str) => {
  let  tmp=replaceAll(str,'\t',"&nbsp;&nbsp;&nbsp;&nbsp;");
  tmp=replaceAll(tmp," ","&nbsp;");
  tmp=replaceAll(tmp,'\n',"<br/>");
  return tmp;

};

class WritingContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      postContents: "",
      isPostOn: (props.writingType !== undefined) ? true : false,
      isPrivateListOn: false,
      isHashtagFormOn: false,
      postMsg: [
        `${JSON.parse(localStorage.getItem("userInfo")).name}님의 이야기를 기다리고 있어요.`,
        "오늘 하루, 기억하고 싶은 순간이 있나요?"
      ],
      files: [],
      fileUploadPopup: false,
      isPrivateNum: 2
    };

    this.myPostFile = React.createRef();
    this.randomNum = Math.floor(Math.random() * 2);
    this.privateBoxArr = [
      {text: "나만 공개", class: "ico_ks ic_lock"},
      {text: "친구 공개", class: "ico_ks ic_friend"},
      {text: "전체 공개", class: "ico_ks global"}];
    this.divContents = React.createRef();
  }

  componentDidMount() {
    if(this.props.postData) {
      console.log(this.props.postData);
      this.divContents.current.innerHTML = unescape(this.props.postData.contents);
      let files = [];
      (this.props.postData.urls || '').split('|').forEach(v => files.push(v));
      if(this.props.postData.file) {
        getSnsFileData(this.props.postData.file, res => {
          if(res.files && res.files.length > 0) {
            let filteredFiles = res.files.filter(v => v.length > 10);
            files = [...files, ...filteredFiles];
          }
          this.setState({files : files})
        });
        this.setState({isPrivateNum: Number(this.props.postData.isprivate_num)});
      }
      //  /php/downloadImage.php?id=19&subid=0
    }
  }

  onKeyEvent  = (e) => {
    console.log(e.keyCode);
  };

  writeEvent = (e) => {
    if (this.state.isPostOn === false) this.setState({isPostOn: true});
    this.setState({postContents: e.target.innerHTML});

    // let lastText = e.target.innerHTML.substr(-1,1);

    // if(lastText === "#") {
    //   let regex = new RegExp("#[\\d|A-Z|a-z|ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*", "gm");
    //   let content = e.target.innerHTML;
    //   content = content.replace(regex, `<span class="hashtag_color">$&</span>`);
    //   e.target.innerHTML = content;
    //   this.setState({isHashLayerOn: true});
    // } else if(lastText === " " || e.target.innerHTML.length <= 0) {
    //   let regex = new RegExp("\s", "g");
    //   let content = e.target.innerHTML;
    //   content = content.replace(regex, ``);
    //   e.target.innerHTML = content;
    //   this.setState({isHashLayerOn: false});
    // }
  };

  postOff = () => {
    if(this.props.writingType !== undefined) {
      this.props.showModalWritingContainer();
    } else {
      this.setState({isPostOn: false, files: []});
      let contents = document.querySelector("#contents_write");
      contents.innerText = "";
    }
  };

  postEvent = () => {
    let fArr = this.state.files;
    if(this.props.postData) { // 글 수정일때
      let data = {
        postid: this.props.postData.id,
        userid: JSON.parse(localStorage.getItem("userInfo")).id,
        contents: escape(htmlchar_run(this.state.postContents)),
        fileData: (fArr.length <= 0) ? null : fArr.join("|"),
        isprivatenum: this.state.isPrivateNum,
      };
      console.log(data);
      updatePost(data, (res) => {
        console.log(res);
        eventService.emitEvent("updatePostToMainAndUserStory", res.postData);
        alertDialog.show("안내", "수정 되었습니다.");
        this.postOff();
      })
    } else { // 글 작성일때
      let data = {
        userid: JSON.parse(localStorage.getItem("userInfo")).id,
        feeling: 0,
        contents: escape(htmlchar_run(this.state.postContents)),
        fileData: (fArr.length <= 0) ? null : fArr.join("|"),
        isprivatenum: this.state.isPrivateNum,
      };
      // console.log(data.fileData.length);
      postWriting(data, (res) => {
        console.log(res);
        alertDialog.show("안내", "소식을 성공적으로 업로드 했습니다." +
            "'나만보기'로 설정한 글은 내 스토리에서만 볼 수 있습니다." +
            " 지금 올린 스토리를 확인해보세요.");
        this.postOff();
        eventService.emitEvent("reloadStorys", "asdf");
        if(this.props.getPostEvent) {
          this.props.getPostEvent();
        }
      });
    }
  };

  dragOverEvent = (e) => {
    console.log("드래그 오버");
    e.preventDefault();
  };

  dropEvent = (e) => {
    e.preventDefault();
    let list = Array.from(e.dataTransfer.files);
    list.forEach(v => {
      fileToDataURL(v).then(res => {
        this.setState({files: [...this.state.files, ...[res]]});
      });
    });
  };

  selectFile = (e) => {
    console.log(e.target.files[0]);
    if( e.target.files[0].type.startsWith('video') ) {
      fileToServerURL(e.target.files[0]).then(res => {
        this.setState({files: [...this.state.files, ...[res]]});
        console.log('fileToServerURL:', res);
      })
    }
    else {
      fileToDataURL(e.target.files[0]).then(res => {
        this.setState({files: [...this.state.files, ...[res]]});
        console.log(this.state.files);
      });
    }
  };

  showFileUploadPopup = (popupShow) => {
    this.setState({fileUploadPopup: popupShow});
  };

  attachFiles = (fileDatas) => {
    console.log(fileDatas);
    this.setState({files: [...this.state.files, ...fileDatas]});
    this.showFileUploadPopup(false);
    // alertDialog.show("안내", "파일이 첨부됐습니다.");
  };

  deleteFile = (e) => {
    let {files} = this.state;
    let num = e.target.dataset.lnum;
    files.splice(num, 1);
    this.setState({files: files});
  };

  showIsPrivateListOn = () => this.setState({isPrivateListOn: !this.state.isPrivateListOn});

  changeIsPrivateNum = (e) => this.setState({isPrivateNum: e.target.dataset.num, isPrivateListOn: false});

  // showHashtagForm = () => {
  //   this.setState({isHashtagFormOn: !this.state.isHashtagFormOn});
  // };
  render() {
    // <input type="email|file" multiple>
    console.log(this.state.files);
    return (
        <div className="writingContainer">
          {/*{this.state.fileUploadPopup ?*/}
          {/*  <FileUploadPopup showFileUploadPopup={this.showFileUploadPopup} fileToDataURL={fileToDataURL} attachFiles={this.attachFiles}/> : null}*/}
          <div className="write">
            <div className="section"onDragOver={this.dragOverEvent} onDrop={this.dropEvent}>
              <div ref={this.divContents} id="contents_write" className="editable" contentEditable="true"
                   onChange={this.writeEvent} onInput={this.writeEvent} onKeyUp={this.onKeyEvent}
                   style={(this.state.isPostOn) ? {minHeight: "130px"} : {minHeight: "37px"}}
                   placeholder={this.state.postMsg[this.randomNum]}/>
              <br/>
              <ul className="uk-list fileList writeFileList">
                {
                  this.state.files.map((v, i) => (
                      <div key={i} className="upload-item">
                        <div className="img-box" style={v.startsWith("/movies") ? {backgroundColor: "#000"} : null}>
                          {
                            (v.substr(5,5) === "image") ?
                                (<img src={v} alt="img"/>) :
                                (<video style={{position: "absolute", top: "50%", transform: "translate(0, -50%)"}}
                                        onLoadedData={(e) => e.target.currentTime = 1}>
                                  <source src={`http://localhost${v}`} type={"video/" + v.substr(v.length-3,3)}/>
                                </video>)
                          }

                          <span className="ico_ks bn_x" onClick={this.deleteFile} data-lnum={i}/>
                        </div>
                        <div className="text-box">
                          {v.substr(5,5)} ({i+1})
                        </div>
                      </div>
                  ))
                }
              </ul>

              <ul className="fileUploadList">
                <li className="link_menu" onClick={() => this.showFileUploadPopup(true)}>
                  <label className="txt_menu" htmlFor="ex_file">
                  <span style={{display: "flex"}}>
                      <span className="ico_ks ico_camera"/><span>사진/동영상</span>
                  </span>
                  </label>
                  <input type="file" id="ex_file" accept="image/*,video/*" ref={this.myPostFile} onChange={this.selectFile}/>
                </li>
                <li className="link_menu">
                  <div className="txt_menu">
                  <span style={{display: "flex"}}>
                      <span className="ico_ks ico_music"/><span>뮤직</span>
                  </span>
                  </div>
                </li>
                <li className="link_menu">
                  <div className="txt_menu">
                    <span style={{display: "flex"}}>
                        <span className="ico_ks ico_link"/><span>링크</span>
                    </span>
                  </div>
                </li>
              </ul>

              {/*{*/}
              {/*  (this.state.isHashtagFormOn) ?*/}
              {/*    (*/}
              {/*     <HashtagForm/>*/}
              {/*    ) : null*/}
              {/*}*/}

              <div className="bottomWriteContents" style={(this.state.isPostOn) ? {display: "block"} : {display: "none"}}>
                <div className="uk-inline">
                  <div className="inner_open" type="button" onClick={this.showIsPrivateListOn}>
                    <div className="flexClass">
                      <span className={this.privateBoxArr[this.state.isPrivateNum-1].class}/><span>{this.privateBoxArr[this.state.isPrivateNum-1].text}</span>
                      <span className="ico_ks arr"/>
                    </div>
                  </div>
                  <MyMenu menuInfo={[
                    {text: "전체공개", icon: "ico_ks global", type: "checkBox", data_set: 3, eventCallback: this.changeIsPrivateNum},
                    {text: "친구공개", icon: "ico_ks ic_friend", type: "checkBox", data_set: 2, eventCallback: this.changeIsPrivateNum},
                    {text: "나만보기", icon: "ico_ks ic_lock", type: "checkBox", data_set: 1, eventCallback: this.changeIsPrivateNum},
                  ]} menuPos={"bottom-left"}/>
                </div>


                <div className="postIconWrap">
                  <span uk-tooltip="해시태그 추가" className="hashtag_icon" onClick={this.showHashtagForm}>#</span>
                </div>
                <div className="writePostBtns">
                  <button className="btn blackLineBtn" onClick={this.postOff}>취소</button>
                  <button className="btn orangeColorBtn nullTextOrangeColor"
                          style={(this.state.postContents.length > 0) ? {display: "none"} : {display: "inline-block"}}>올리기
                  </button>
                  <button className="btn orangeColorBtn"
                          style={(this.state.postContents.length > 0) ? {display: "inline-block"} : {display: "none"}}
                          onClick={this.postEvent}>올리기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default WritingContainer;
