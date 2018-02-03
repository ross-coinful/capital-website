import React from "react"

export default ({ caption, des }) => {

  return (
    <div className="jumbotron-text">
      <h2 className="h2">
        {caption}
      </h2>
      <p1 className="p1">
        {des}
      </p1>
    </div>
  )
}