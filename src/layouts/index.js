import React from "react";
import '../style/main.css';

import Footer from "../components/footer";

export default class Layout extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { pathname } = location;

    console.log('pathname', pathname)

    if (pathname.indexOf('contact') !== -1) {
      this.setFooterBottom();
      return window.addEventListener('resize', this.setFooterBottom);
    } else if (pathname !== '/') {
      this.setSectionMarginTop();
      return window.addEventListener('resize', this.setSectionMarginTop);      
    } 
  }

  componentWillUnmount() {
    const { pathname } = location;
    
    if (pathname.indexOf('contact') !== -1) {
      return window.removeEventListener('resize', this.setFooterBottom);
    } else if (pathname !== '/') {
      return window.removeEventListener('resize', this.setSectionMarginTop);      
    } 
  }

  setSectionMarginTop() {
    const navbarH = document.getElementsByClassName('navbar')[0].offsetHeight;
    const marginTop = document.getElementsByClassName('jumbotron')[0].offsetHeight + navbarH;

    document.getElementsByClassName('section')[0].style.marginTop = `${marginTop}px`;
  }

  setFooterBottom() {
    const bottom = document.getElementsByTagName('html')[0].offsetHeight;
    const windowH = window.innerHeight;
    const footer = document.getElementsByClassName('footer')[0];

    console.log('windowH', windowH, 'bottom', bottom)

    if (windowH > bottom) {
      console.log('footer', footer)
      footer.style.top = `${windowH - bottom}px`;
    } else {
      console.log('else footer', footer)

      footer.style.top = 0;
    }    
  }

  render () {
    const { children, data } = this.props;

    return (
      <div>
        {children()}
        <Footer data={data} />
      </div>
    );
  }
};

export const query = graphql`
  query LayoutQuery {
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
        footer {
          title1
          link1
          link2
          link3
          link4
          link5
          link6
          title2
          address
          phone
          copyright
        }
      }
    }
  }
 `