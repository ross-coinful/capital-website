import React from "react";
import '../style/main.css';

import Footer from "../components/footer";

export default class Layout extends React.Component {
  constructor() {
    super();
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