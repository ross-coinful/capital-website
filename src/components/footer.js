import React from "react"

export default ({ data }) => {

  return (
    <div className="footer">
      <div className="container">
        <div className="site-map">
          <h4 className="title">{data.site.siteMetadata.footer.title1}</h4>
          <ul className="list left-list">
            {data.site.siteMetadata.navbar.navs.map((nav, i) => {
              const navbars = data.site.siteMetadata.navbar;

              return (
                <li className="item" key={i}> 
                  <a className="link" href={`${navbars['href' + i]}`}>
                    {navbars[nav]}
                  </a>
                </li>
              );
            })}
          </ul>   
          <ul className="list right-list">
            <li className="item">
              <a className="link">{data.site.siteMetadata.footer.link5}</a>
            </li>
            <li className="item">
              <a className="link" href="http://www.nogle.com/" target="_blank">{data.site.siteMetadata.footer.link6}</a>
            </li>
          </ul>   
        </div>
        <div className="contact-info">
          <h4 className="title">{data.site.siteMetadata.footer.title2}</h4>
          <ul className="list">
            <li className="item">{data.site.siteMetadata.footer.address}</li>
            <li className="item">{data.site.siteMetadata.footer.phone}</li>
          </ul>
        </div>
        <span className="copyright">
          {data.site.siteMetadata.footer.copyright}
        </span>
      </div>
    </div>
  )
}