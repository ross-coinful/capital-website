import React from "react"
import Link, { withPrefix } from "gatsby-link"

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    const { pathname } = location;

    console.log('pathname', pathname)

    if (pathname === withPrefix('/contact/')) {
      this.setFooterBottom();
      return window.addEventListener('resize', this.setFooterBottom);
    } else if (pathname !== withPrefix('/')) {
      this.setSectionMarginTop();
      return window.addEventListener('resize', this.setSectionMarginTop);      
    } 
  }

  componentWillUnmount() {
    const { pathname } = location;
    
    if (pathname === withPrefix('/contact/')) {
      return window.removeEventListener('resize', this.setFooterBottom);
    } else if (pathname !== withPrefix('/')) {
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
    const { data, fixed, active } = this.props;
    const { navbar } = data.site.siteMetadata;
    
    return (
      <nav className={`navbar ${fixed ? 'fixed' : ''}`}>
        <div className="container">
          <i className="icon icon-menu"></i>
          <a className="logo" href="/"></a>
          <i className="icon icon-close"></i>
          <ul className="navbar-nav">
            {navbar.navs.map((nav, i) => {
              return (
                <li className="nav-item" key={i}> 
                  <Link className="link" activeClassName="active" to={`${navbar['href' + (i + 1)]}`}>
                    {navbar[nav]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    );
  }
}