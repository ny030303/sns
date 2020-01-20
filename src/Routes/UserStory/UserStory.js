import React from 'react';
import './UserStory.css';
import StoryItem from "../../Component/StoryItem/StoryItem";
import FriendItem from "../../Component/FriendItem/FriendItem";

class UserStory extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        selectedMenuIdx: 0
    };
  }

  storyLinkEvent = (e) => {
    // let listLi = document.querySelectorAll(".story_link");
    // listLi.forEach(v => v.classList.remove("story_link_on"));
    // e.target.classList.add("story_link_on");
      this.setState({selectedMenuIdx: Number(e.target.dataset.midx)});
  };

  render() {
    const menus = ["전체", "캘린더", "사진", "동영상", "장소", "뮤직", "더보기+6"];
    const menuClass = (i) => `story_link ${ i === this.state.selectedMenuIdx ? "story_link_on" : ""}`;
    return (
      <div className="userStory">
        <div className="article_story">
          <div className="story_cover">
            <div className="story_cover_img"/>
            <div className="bg_cover"/>
            <div className="cover_cont">
              <div className="info_pf">
                <div className="link_pf bg_pf"/>
                <span className="ico_ks ico_pf"/>
                <div className="userStoryName">Name</div>
              </div>
              <div className="menu_story">
                <ul className="story_list">
                    {
                        menus.map((menu, i) => (
                            <li key={i} onClick={this.storyLinkEvent} data-midx={i}
                                className={menuClass(i)}>
                                {menu}
                            </li>
                        ))
                    }
                </ul>
                <div className="info_btn">
                  <div className="btn_cover">배경 사진 편집</div>
                </div>
              </div>
            </div>
          </div>
          <div className="story_cont">
            <div className="story_post_wrap">
              <StoryItem/>
              <StoryItem/>
              <StoryItem/>
              <StoryItem/>
            </div>
            <div className="story_widgets">
              <div className="testStyle">
                <div className="section_widgets">
                  <h3 className="tit_widgets">정보 <span className="ico_ks ico_more">채널정보 더보기</span></h3>
                  <div className="list_info">
                    <div className="subtit_info">
                      <span className="ico_ks ico_birthday"/>
                      <span className="tit_info">생일</span>
                      <div className="desc_info">04.04</div>
                    </div>
                    <div className="subtit_info tit_story">
                      <span className="ico_ks ico_story"/>
                      <span className="tit_info">스토리</span>
                      <div className="desc_info">4</div>
                    </div>
                    <div className="subtit_info tit_qna">
                      <span className="tit_info">정보 더보기</span>
                      <span className="ico_ks ico_plus"/>
                    </div>
                  </div>
                </div>

                <div className="section_widgets">
                  <h3 className="tit_widgets" style={{paddingTop: "15px"}}>최근 키워드 </h3>
                  <div className="keyword_widgets">
                    <p className="link_keyword">#키워드</p>
                    <p className="link_keyword">#키키워드</p>
                    <p className="link_keyword">#키키키워드</p>
                  </div>
                </div>

                <div className="section_widgets">
                  <h3 className="tit_widgets" style={{paddingTop: "15px"}}>추천친구</h3>
                  <div className="keyword_widgets">
                    <FriendItem listName={"storyWidgets"}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserStory;
