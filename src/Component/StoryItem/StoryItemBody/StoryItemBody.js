import * as React from 'react';
import {MyMenu} from "../../MyMenu/MyMenu";
import Lightbox from "react-image-lightbox";

export default class StoryItemBody extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
    this.contents = React.createRef();
    this.nowUserInfo = JSON.parse(localStorage.getItem("userInfo"));
  }


  render() {
    const {postData} = this.props;
    const {photoIndex, isOpen} = this.state;
    let fileArr = [];
    if( postData.file !== null ) {
      Array(Number(postData.filecnt)).fill(0).forEach((v,i) => {
        fileArr.push(`/php/downloadImage.php?id=${postData.file}&subid=${i}`);
      })
    }
    if( this.contents.current ) {
      this.contents.current.innerHTML = unescape(postData.contents);
    }
    return (
      <div>
        <div className="storyContentsWrap">
          <div style={{fontSize: "14px", wordBreak: "break-all"}} ref={this.contents}/>
          {/*<div className="storyitem_font_style" style={{cursor:"pointer"}}>...더보기</div>*/}

          {
            (fileArr !== null) ? (<div className="storyImgList">
              {
                fileArr.map((v, i) => (
                  <div style={{backgroundImage: `url(${v})`}} key={i}
                       onClick={() => this.setState({isOpen: true, photoIndex: i})}
                       className={(fileArr.length === 3 ?
                         (i === 0) ?
                           "storyImgBig" :
                           (i === 1) ?
                             "storyImgSide absolute" :
                             "storyImgSide" :
                         (fileArr.length === 1 ? "storyImgBiger" : ""))}/>
                ))
              }
            </div>) : null
          }

          {(fileArr !== null && isOpen) ? (
            <Lightbox
              mainSrc={fileArr[photoIndex]}
              nextSrc={fileArr[(photoIndex + 1) % fileArr.length]}
              prevSrc={fileArr[(photoIndex + fileArr.length - 1) % fileArr.length]}
              onCloseRequest={() => this.setState({isOpen: false})}
              onMovePrevRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + fileArr.length - 1) % fileArr.length,
                })
              }
              onMoveNextRequest={() =>
                this.setState({
                  photoIndex: (photoIndex + 1) % fileArr.length,
                })
              }
            />
          ) : null}
        </div>
      </div>
    );
  };
};