import React from "react";
import favicon from "./favicon.png";

let inlinedStyles = "";
if (process.env.NODE_ENV === "production") {
  try {
    /* eslint import/no-webpack-loader-syntax: off */
    inlinedStyles = require("!raw-loader!../public/styles.css");
  } catch (e) {
    /* eslint no-console: "off"*/
    console.log(e);
  }
}

export default class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === "production") {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: inlinedStyles }}
        />
      );
    }
    return (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="distribution" content="global" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
          <meta name="author" content="Nogle" />
          <meta name="publisher" content="" />
          <meta property="article:author" content="" />
          <meta property="article:publisher" content="" />
          <meta name="rating" content="general" />
          <meta name="copyright" content="" />
          <meta name="robots" content="all" />
          <meta name="spiders" content="all" />
          <meta name="webcrawlers" content="all" />
          <meta name="company" content="" />
          <meta name="abstract" content="" />
          <meta name="subject" content="" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="format-detection" content="telephone=no" />

          <title>Capital Management</title>
          {this.props.headComponents}
          <link rel="shortcut icon" href={favicon} />
          {css}
        </head>
        <body>
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
}
