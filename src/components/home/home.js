import React, { Component } from "react";
import { withRouter } from "../../common/withRouter";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    return <div></div>;
  }
}

const mapStateToProps = (state) => {};

export default withRouter(connect(mapStateToProps)(Home));
