import React from "react";

import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";
import jonM from "../../img/member/member-m-jon.jpg";
import carlosM from "../../img/member/member-m-carlos.jpg";
import ludwinM from "../../img/member/member-m-ludwin.jpg";
import hankM from "../../img/member/member-m-hank.jpg";
import jonS from "../../img/member/member-s-jon.jpg";
import carlosS from "../../img/member/member-s-carlos.jpg";
import ludwinS from "../../img/member/member-s-ludwin.jpg";
import hankS from "../../img/member/member-s-hank.jpg";

export default class Team extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showFirstRow: false,
      showSecondRow: false,
    };

    this.imgs = {
      jonM,
      carlosM,
      ludwinM,
      hankM,
      jonS,
      carlosS,
      ludwinS,
      hankS
    };

    this.memberLen = props.data.site.siteMetadata.team.section1.members.length;

    this.fadeInImg = this.fadeInImg.bind(this);
    this.expandDesc = this.expandDesc.bind(this);
    this.scrollTo = this.scrollTo.bind(this);
  }

  componentDidMount() {
    this.firstRowTop = document.getElementsByClassName('item')[0].getBoundingClientRect().top;
    this.secondRowTop = document.getElementsByClassName('item')[4].getBoundingClientRect().top;

    this.fadeInImg();
    window.addEventListener('scroll', this.fadeInImg);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fadeInImg);
  }

  fadeInImg() {
    const { showFirstRow, showSecondRow } = this.state;
    const bottom_of_window = window.scrollY + window.innerHeight;

    if( bottom_of_window > this.firstRowTop && !showFirstRow){
      this.setState({
        showFirstRow: true,
      });
    }

    if( bottom_of_window > this.secondRowTop && !showSecondRow){
      this.setState({
        showSecondRow: true,
      });
    }
  }

  expandDesc(e) {
    const index = e.currentTarget.getAttribute('data-index');

    this.setState({
      activeIndex: parseInt(index, 10),
    }, () => {
      const height = document.getElementsByClassName('jumbotron')[0].offsetHeight;
      this.scrollTo(height, 800);
    });


  }

  scrollTo(to, duration) {
    const start = window.scrollY,
      change = to - start,
      increment = 20,
      perTick = change / (duration / 20);
    let currentTime = 0;

    Math.easeInOutQuad = function (t, b, c, d) {
      t /= d/2;
      if (t < 1) return c/2*t*t + b;
      t--;
      return -c/2 * (t*(t-2) - 1) + b;
    };

    const animateScroll = function(){        
      currentTime += increment;
      const val = Math.easeInOutQuad(currentTime, start, change, duration);
      // window.scrollTo(0, window.scrollY + perTick);
      window.scrollTo(0, val);
      console.log('val', val, start)
      if(currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };

    animateScroll();
  }

  render() {
    const { showFirstRow, showSecondRow, activeIndex } = this.state;
    const { data } = this.props;
    const { team, navbar } = data.site.siteMetadata;

    return (
      <div className="team">
        <Navbar data={data} active={navbar.nav3} fixed />
        <div className="jumbotron">
          <div className="container">
            <Jumbotron caption={team.jumbotron.caption} des={team.jumbotron.des} />
          </div>
        </div>
        <div className="section section-management">
          <div className="container">
            <h2 className="h2">{team.section1.header}</h2>
            {team.section1.members.map((member, i) => {
              return (
                <div className={`detail ${activeIndex === i ? 'show' : ''}`} key={i}>
                  <div className="image-container">
                    <div className={`image image-${member.name.split(' ')[0].toLowerCase()}`}>
                      <img src={jonM} />
                    </div>
                  </div>
                  <div className="intro">
                    <h3 className="h3">{member.name.toUpperCase()}</h3>
                    <span className="title">{member.title.toUpperCase()}</span>
                    <hr className="hr" />
                    <div
                      className="p2"
                      dangerouslySetInnerHTML={{
                        __html: member.intro
                      }}
                    >
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="members">
              {team.section1.members.map((member, i) => {
                let className = '';

                if (showFirstRow && i < 4) {
                  className = `fade-in-${i + 1}`;
                }

                if (showSecondRow && i > 3) {
                  className = `fade-in-${i - 3}`;
                }

                return (
                  <div className={`item ${className}`} key={i} data-index={i} onClick={this.expandDesc}>
                    <div className={`image image-${member.name.split(' ')[0].toLowerCase()}`}>
                      <img src={jonS} />
                    </div>
                    <h3 className="h3">{member.name.toUpperCase()}</h3>
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
  query TeamQuery {
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
        team {
          jumbotron {
            caption
            des
          }
          section1 {
            header
            members {
              name
              title
              intro
            }
          }
          section2 {
            header
          }
        }
      }
    }
  }
 `