import React from "react";
import g from "glamorous";
import { withPrefix } from "gatsby-link"

import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";

export default class Investment extends React.Component {
  constructor() {
    super();
  }

  renderBoard(board) {

    if(board.groups) {
      return board.groups.map((group, i) => {
        return (
          <div className="group" key={i}>
            <p className="p1 group-name">{group}</p>
            {
              board[`list${i + 1}`].map((item, i) => {
                return <li className="p1" key={i}>{item}</li>
              })
            }
          </div>
        );
      });
    }

    return board.list.map((item, i) => {
      return <li className="p1" key={i}>{item}</li>
    });
  }

  render() {
    const { data } = this.props;
    const { investments } = data.site.siteMetadata;

    return (
      <div className="investments">
        <Navbar data={data} fixed />
        <div className="jumbotron">
          <div className="container">
            <Jumbotron caption={investments.jumbotron.caption} des={investments.jumbotron.des} />
          </div>
        </div>
        <div className="section section-quote">
          <div className="container">
            <p className="quote">{investments.section1.title}</p>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <h2 className="h2 title">{investments.section2.title}</h2>
            <div className="list-feature">
              <div className="item">
                <i className="icon icon-focused"></i>       
                <h3 className="h3">{investments.focused}</h3>
              </div>
              <div className="item">
                <i className="icon icon-unique"></i>        
                <h3 className="h3">{investments.unique}</h3>
              </div>
              <div className="item">
                <i className="icon icon-knowhow"></i>       
                <h3 className="h3">{investments.knowhow}</h3>
              </div>
              <div className="item">
                <i className="icon icon-build"></i>       
                <h3 className="h3">{investments.build}</h3>
              </div>
            </div>
            <div className="list-board">
              {investments.boards.map((board, i) => {
                return (
                  <div className="board" key={i}>
                    <h3 className="h3 title">{board.title}</h3>
                    <ul className="list">
                      {this.renderBoard(board)}
                    </ul>   
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query InvestMentQuery {
    site {
      siteMetadata {
        navbar {
          navs
          nav1
          nav2
          nav3
          nav4
          href1
          href2
          href3
          href4
        }
        investments {
          section1 {
            title
          }
          section2 {
            title
          }
          boards {
            title
            groups
            list1
            list2
            list
          }
          jumbotron {
            caption
            des
          }
          focused
          unique
          knowhow
          build
        }
      }
    }
  }
 `