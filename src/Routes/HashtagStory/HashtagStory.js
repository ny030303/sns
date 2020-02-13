import * as React from 'react';
import "./HashtagStory.css";
import {MyImgItem} from "../../Component/MyImgItem/MyImgItem";
import {ModalStoryItem} from "./ModalStoryItem/ModalStoryItem";

export class HashtagStory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalStoryItemOn: false
    };
  }

  componentDidMount() {

  }

  showStoryItem = (e) => {
    e.preventDefault();
    this.setState({isModalStoryItemOn: !this.state.isModalStoryItemOn});
  };

  render() {
    console.log(this.props);

    return (
      <div className="hashtagStory">
        {
          (this.state.isModalStoryItemOn) ? (<ModalStoryItem showStoryItem={this.showStoryItem}/>) : null
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
            </div>
          </div>
        </div>
      </div>
    );
  };
}