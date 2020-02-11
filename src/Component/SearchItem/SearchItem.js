import * as React from 'react';
import "./SearchItem.css";

export class SearchItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {type, datas, callbackEvent} = this.props;
    return (
      <li className="searchItem" style={(type !== "no_data") ? {height: "52px"} : null} onClick={callbackEvent}>
        {
          (type === "hash") ?
            (<>
              <div className="ico_ks2 ico_hash"/>
              <div className="info_user">
                <div className="txt_name">Dive with Hana</div>
                <span className="ico_ks2 ico_teller1"/>
              </div>
            </>) :
            (type === "user") ?
              (
                <>
                  <div className="searchImg img_profile"/>
                  <div className="info_user">
                    <div className="txt_name">{datas.name}</div>
                    <span className="ico_ks2 ico_teller1"/>
                  </div>
                  {/*<button type="button" className="btn_plus styleNoneBtn" data-kant-id="1388"><span*/}
                  {/*  className="ico_ks2 ico_plus">소식받기</span></button>*/}
                </>
              ) :
              (type === "have_side_title") ?
                (
                  <>
                    <div className="ico_ks2 thumb_user"/>
                    <div className="info_user" style={{padding: "0 0 0 30px"}}>
                      <div className="txt_name">Da Nang</div>
                      <p className="info_user_sub_title">Da Nang, Hải Châu District, Da Nang, Vietnam</p>
                    </div>
                  </>
                ) : (type === "no_data") ?
                (
                  <div className="no_data">검색 결과가 없습니다.</div>
                ) : null
        }

      </li>
    );
  };
};