import * as React from 'react';

class HeaderSearchInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div className="searchBar">
        <div className="searchInputWrap">
          <input className="searchInput" placeholder="친구, 글, 태그, 장소 검색" ref={this.props.inputRef}/>
        </div>
        <div className="searchBtnWrap"><span className="searchBtn ico_ks" onClick={this.props.onSearch}>검색</span></div>
      </div>
    );
  };
}

export default HeaderSearchInput;