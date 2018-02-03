import React from "react";
import g from "glamorous";
import { withPrefix } from "gatsby-link"

import Jumbotron from "../components/jumbotron";
import Navbar from "../components/navbar";

export default class Contact extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { data } = this.props;
    const { contact, navbar } = data.site.siteMetadata;

    return (
      <div className="contact">
        <Navbar data={data} fixed />

        <div className="jumbotron">
          <div className="container">
            <h2 className="h2 caption">{contact.caption}</h2>
            <div className="contact-info">
              <h2 className="h2 local">{contact.local}</h2>
              <p className="quote address">{contact.address}</p>
              <p className="quote phone">{contact.phone}</p>
              <button className="btn">
                <a className="link" href="mailto:info@noglecapital.com">{contact.btn}</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export const query = graphql`
  query ContactQuery {
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
        contact {
          caption
          local
          address
          phone
          btn
        }
      }
    }
  }
 `