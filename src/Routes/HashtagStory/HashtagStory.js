import * as React from 'react';
import "./HashtagStory.css";
import {MyImgItem} from "../../Component/MyImgItem/MyImgItem";

export class HashtagStory extends React.Component {
  render() {
    return (
      <div className="hashtagStory">
        <div className="article_story">
          <div className="hash">
            <div className="inner_hash">
              <h3 className="tit_hash">#sdfasdf</h3>
              <div className="btn_wh">글쓰기</div>
            </div>
          </div>
          <div className="wrap_recomm">
            <div className="tit_recomm">게시물</div>
            <div className="img_wrap">
              <MyImgItem/>
            </div>
          </div>
        </div>
      </div>
    );
  };
}