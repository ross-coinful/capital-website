exports.onClientEntry = () => {
  console.log("We've started!")
}

exports.onRouteUpdate = ({ location }) => {
  console.log('new pathname', location.pathname)
}