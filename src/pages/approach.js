import React from "react";
import g from "glamorous";
import { withPrefix } from "gatsby-link"

import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";

export default class Approach extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;
    const { approach, navbar } = data.site.siteMetadata;

    return (
      <div className="approach">

        <Navbar data={data} fixed />

        <div className="jumbotron">
          <div className="container">
            <Jumbotron caption={approach.jumbotron.caption} des={approach.jumbotron.des} />

            <div className="list-approach">
              {approach.jumbotron.approaches.map((approach, i) => {

                return (
                  <div className="item" key={i}>
                    <i className={`icon icon-${approach.item.toLowerCase()}`}></i>
                    <h3 className="h3">{approach.item}</h3>
                    <p className="p2">{approach.des}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="section">
          <div className="container">
            <h2 className="h2">{approach.section1.header}</h2>
            <div className="list-process">
              {approach.section1.processes.map((process, i) => {
                return (
                  <div className="item" key={i}>
                    <h3 className="h3">{process.item}</h3>
                    <p className="p2">{process.des}</p>
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
  query ApproachQuery {
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
        approach {
          jumbotron {
            caption
            des
            approaches {
              item
              des
            }
          }
          section1 {
            header
            processes {
              item
              des
            }
          }
        }
      }
    }
  }
 `