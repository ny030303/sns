import React from 'react';
import './WritingContainer.css';
import {postWriting} from "../../services/DataService";
import FileUploadPopup from "./FileUploadPopup/FileUploadPopup";
import alertDialog from "../../services/AlertDialog";
import eventService from "../../services/EventService";
import {MyMenu} from "../MyMenu/MyMenu";
import {HashtagForm} from "../HashtagForm/HashtagForm";


const fileToDataURL = async (inputfile) => {
  if (inputfile === undefined) return null;
  //console.log(inputfile.files[0]);
  let fileData = await new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(reader.result);
    reader.readAsDataURL(inputfile);
  });
  return fileData;
};

const replaceAll = (str, target, replacement) => {
  return str.split(target).join(replacement);
};

const htmlchar_run = (str) => {
  let  tmp=replaceAll(str,'\t',"&nbsp;&nbsp;&nbsp;&nbsp;");
  tmp=replaceAll(tmp," ","&nbsp;");
  tmp=replaceAll(tmp,'<',"&lt;");
  tmp=replaceAll(tmp,'>',"&gt;");
  tmp=replaceAll(tmp,'\n',"<br/>");
  tmp= "<div>"+tmp+"</div>";
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
      this.divContents.current.innerHTML = unescape(this.props.postData.contents);
      if(this.props.postData.file) {
        let files = [];
        for(let i = 0; i < Number(this.props.postData.filecnt); i++) {
          files.push({
            data: `/php/downloadImage.php?id=${this.props.postData.file}&subid=${i}`,
          })
        }

        this.setState({files : files})
      }
    //  /php/downloadImage.php?id=19&subid=0
    }
  }

  writeEvent = (e) => {
    if (this.state.isPostOn === false) this.setState({isPostOn: true});
    this.setState({postContents: e.target.innerHTML});
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
    let fArr = this.state.files.map(v => v.data);
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
        if(this.props.getPostEvent !== null) {
          this.props.getPostEvent();
        }
      });
  };

  // selectFile = (e) => {
  //   console.log(e.target.files[0]);
  //   fileToDataURL(e.target.files[0]).then(res => {
  //     this.setState({files: [...this.state.files, ...[res]]});
  //   });
  // };

  showFileUploadPopup = (popupShow) => {
    this.setState({fileUploadPopup: popupShow});
  };

  showHashtagForm = () => {
    this.setState({isHashtagFormOn: (this.state.isHashtagFormOn) ? false : true});
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

  showIsPrivateListOn = () => this.setState({isPrivateListOn: (this.state.isPrivateListOn) ? false : true});

  changeIsPrivateNum = (e) => this.setState({isPrivateNum: e.target.dataset.num, isPrivateListOn: false});

  render() {
    // <input type="email|file" multiple>
    console.log(this.state.files);
    return (
      <div className="writingContainer">
        {this.state.fileUploadPopup ?
          <FileUploadPopup showFileUploadPopup={this.showFileUploadPopup} fileToDataURL={fileToDataURL} attachFiles={this.attachFiles}/> : null}
        <div className="write">
          <div className="section">
            <div ref={this.divContents} id="contents_write" className="editable" contentEditable="true"
                 onChange={this.writeEvent} onInput={this.writeEvent}
                 style={(this.state.isPostOn) ? {minHeight: "130px"} : {minHeight: "37px"}}
                 placeholder={this.state.postMsg[this.randomNum]}/>
            <br/>
            <ul className="uk-list fileList writeFileList">
              {
                this.state.files.map((v, i) => (
                  <div key={i} className="upload-item">
                    <div className="img-box">
                      <img src={v.data} alt="img"/>
                      <span className="ico_ks bn_x" onClick={this.deleteFile} data-lnum={i}/>
                    </div>
                    <div className="text-box">
                      {i+1}.img
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
                {/*<input type="file" id="ex_file" ref={this.myPostFile} onChange={this.selectFile}/>*/}
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

            {
              (this.state.isHashtagFormOn) ?
                (
                 <HashtagForm/>
                ) : null
            }

            <div className="bottomWriteContents" style={(this.state.isPostOn) ? {display: "block"} : {display: "none"}}>
              <div className="inner_open" onClick={this.showIsPrivateListOn}>
                <div className="flexClass">
                  <span className={this.privateBoxArr[this.state.isPrivateNum-1].class}/><span>{this.privateBoxArr[this.state.isPrivateNum-1].text}</span>
                  <span className="ico_ks arr"/>
                </div>
              </div>
              {
                (this.state.isPrivateListOn) ?
                  (<MyMenu menuInfo={[
                    {text: "전체공개", icon: "ico_ks global", type: "checkBox", data_set: 3, eventCallback: this.changeIsPrivateNum},
                    {text: "친구공개", icon: "ico_ks ic_friend", type: "checkBox", data_set: 2, eventCallback: this.changeIsPrivateNum},
                    {text: "나만보기", icon: "ico_ks ic_lock", type: "checkBox", data_set: 1, eventCallback: this.changeIsPrivateNum},
                  ]}/>): null
                //{text: "친구만 댓글 허용", type: "checkBox"},
                //{text: "공유 허용", type: "checkBox"}
              }

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
