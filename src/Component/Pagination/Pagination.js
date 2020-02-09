import * as React from 'react';

import "./Pagination.css";

export default class Pagination extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const {dataCnt, sizePerPage, currPage, changePage} = this.props;
    let pageCnt = Math.floor((dataCnt + sizePerPage - 1) / sizePerPage);
    return (
      <ul className="uk-pagination paginationList" style={{justifyContent: "space-between"}}>
        <li style={{width: "70px"}} onClick={changePage} data-page={currPage-1}>〈 Previous</li>
        <li>
          <div style={{display: "flex"}}>
            {
              Array(pageCnt).fill(0).map((v, i) => (
                <div key={i} style={(currPage == i + 1) ? {backgroundColor: "#f26a41", color: "#fff"} : null}
                     onClick={changePage}
                     data-page={i + 1} className="paginationNumStyle">
                  {i + 1}
                </div>)
              )
            }
          </div>
        </li>
        <li style={{width: "70px", textAlign: "right"}} onClick={changePage} data-page={currPage+1}>Next 〉</li>
      </ul>
    );
  };
};