import * as React from 'react';
import "./MyEmotions.css";

const getImgLinkArr = (imglinkbefore, imglinkafter, cnt) => {
  let arr = [];
  for (let i = 1; i <= cnt; i++) {
    (i >= 10) ? arr.push(imglinkbefore + i + imglinkafter) :
      arr.push(imglinkbefore + "0" + i + imglinkafter);
  }
  return arr;
};

export class MyEmotions extends React.Component {

  constructor(props) {
    super(props);
    this.thum1Arr = getImgLinkArr("thum_0", ".png", 40);
    this.thum2Arr = getImgLinkArr("thum_0", ".png", 88);
  }

  getData = (e) => {

  };

  render() {
    return (
      <div className="emotionList">
        <ul className="nav nav-tabs emotionNavWrap" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" data-toggle="tab" href="#thum1">
              <img src="/images/thum1/icon_on.png" className="emotionIcon"/>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#thum2">
              <img src="/images/thum2/icon_on.png" className="emotionIcon"/>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" data-toggle="tab" href="#thum3">
              <img src="/images/thum3/icon_on.png" className="emotionIcon"/>
            </a>
          </li>
        </ul>

        <div className="tab-content">
          <div id="thum1" className="container tab-pane active"><br/>
            {this.thum1Arr.map((v, i) => (<img src={"/images/thum1/" + v} key={i} className="emotion" onClick={this.props.addEmotion}/>))}
          </div>
          <div id="thum2" className="container tab-pane fade"><br/>
            {this.thum1Arr.map((v, i) => (<img src={"/images/thum2/" + v} key={i} className="emotion" onClick={this.props.addEmotion}/>))}
          </div>
          <div id="thum3" className="container tab-pane fade"><br/>
            {this.thum2Arr.map((v, i) => (<img src={"/images/thum3/" + v} key={i} className="emotion" onClick={this.props.addEmotion}/>))}
          </div>
        </div>
      </div>
    );
  };
};