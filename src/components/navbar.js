import React from "react"
import Link from "gatsby-link"

export default class Navbar extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log('didmount')
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