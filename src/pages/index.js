import React from "react";
import Img from "gatsby-image";

import Navbar from "../components/navbar";

export default class Homepage extends React.Component {
  constructor() {
    super();

    this.state = {
      size: '2x',
    };

    this.resetHomepagePhoto = this.resetHomepagePhoto.bind(this);
  }

  componentDidMount() {
    this.resetHomepagePhoto();
    window.addEventListener('resize', this.resetHomepagePhoto);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resetHomepagePhoto);
  }

  resetHomepagePhoto() {
    console.log('set photo')
    const { size } = this.state;
    const windowW = window.innerWidth;

    if (windowW <= 800) {

      if (size === '2x') {
        this.setState({
          size: '',
        });        
      }
    } else if (size === '') {
      this.setState({
        size: '2x',
      });
    }
  }

  render() {
    const { size } = this.state;
    const { data } = this.props;
    const { homepage, navbar } = data.site.siteMetadata;
    console.log('data', data)
    return (
      <div className="homepage">
        <div className="jumbotron">
          <div className="container">
            <h1 className="h1">{homepage.jumbotron.caption}</h1>
            <p className="p1">{homepage.jumbotron.des}</p>
          </div>

          <Navbar data={data} />
        </div>
        <div className="section section-investments">
          <div className="container">
            <h2 className="h2 title">{homepage.section1.title}</h2>
            <p className="p1 des">{homepage.section1.des}</p>
            <button className="btn">
              <a className="link" href={navbar.href1}>
                {homepage.section1.btn}
              </a>
            </button>
          </div>
        </div>
        <div className="section section-approach">
          <div className="container">
            <h2 className="h2 title">{homepage.section2.title}</h2>
            <p className="p1 des">{homepage.section2.des}</p>
            <button className="btn">
              <a className="link" href={navbar.href2}>
                {homepage.section2.btn}
              </a>
            </button>
          </div>
        </div>
        <div className="section section-team">
          <div className="container">
            <h2 className="h2 title">{homepage.section3.title}</h2>
            <p className="p1 des">{homepage.section3.des}</p>
            <div className="member-group">

              {homepage.members.map((member, i) => {
                return (
                  <div className="member" key={i}>
 
                    <Img className="image" sizes={data[`${member.imgThumbnail}Image${size}`].sizes} />
                    <div className="info">
                      <span className="name">{member.name}</span>
                      <span className="p1 title">{member.title}</span>
                      <span className="p1 expert">{member.expert}</span>
                    </div>
                  </div>
                );
              })}

            </div>
            <button className="btn">
              <a className="link" href={navbar.href3}>
                {homepage.section3.btn}
              </a>
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query IndexQuery {
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
        homepage {
          jumbotron {
            caption
            des
          }
          section1 {
            title
            des
            btn
          }
          section2 {
            title
            des
            btn
          }
          section3 {
            title
            des
            btn
          }
          members {
            name
            title
            imgThumbnail
          }
        }
      }
    }
    jonImage: imageSharp(id: { regex: "/member-l-jon/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    jonImage2x: imageSharp(id: { regex: "/member-l-jon2x/" }) {
      sizes(maxWidth: 3000) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    carlosImage: imageSharp(id: { regex: "/member-l-carlos/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    carlosImage2x: imageSharp(id: { regex: "/member-l-carlos2x/" }) {
      sizes(maxWidth: 3000) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    ludwinImage: imageSharp(id: { regex: "/member-l-ludwin/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    ludwinImage2x: imageSharp(id: { regex: "/member-l-ludwin2x/" }) {
      sizes(maxWidth: 3000) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    hankImage: imageSharp(id: { regex: "/member-l-hank/" }) {
      sizes(maxWidth: 800) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
    hankImage2x: imageSharp(id: { regex: "/member-l-hank2x/" }) {
      sizes(maxWidth: 3000) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }
  }
 `