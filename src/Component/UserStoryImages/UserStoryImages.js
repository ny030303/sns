import * as React from 'react';
import "./UserStoryImages.css";
import {MyImgItem} from "../MyImgItem/MyImgItem";
import Lightbox from "react-image-lightbox";

export class UserStoryImages extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      photoIndex: 0,
      isOpen: false,
    };
  }


  render() {
    const {postData} = this.props;
    const {photoIndex, isOpen} = this.state;
    let fileArr = [];
    let imgsPostData = [];
    // console.log(postData);
    postData.forEach(v => {
      if( v.file !== null ) {
        Array(Number(v.filecnt)).fill(0).forEach((pv,pi) => {
          imgsPostData.push(v);
          fileArr.push(`/php/downloadImage.php?id=${v.file}&subid=${pi}`);
        })
      }
    });

    return (
      <div className="userStoryImages">
        {
          fileArr.map((v,i) => (
            <MyImgItem key={i} imgSrc={v} postData={imgsPostData[i]} onClickEvent={() => this.setState({isOpen: true, photoIndex: i})}/>
          ))
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
      {/*  onClickEvent={this.} */}
      </div>
    );
  };
}