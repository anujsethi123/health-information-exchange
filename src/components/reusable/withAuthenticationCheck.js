import React from "react";
import { connect } from "react-redux";

export default function withAuthCheck(WrappedComponent) {
  class AuthCheck extends React.Component {
    redirection = () => {
      // TO Capture current Tab's Time Spent before Logout.
      window.location.href = "/login";
    };

    componentDidMount() {
      const that = this;
      const { loginDetails } = this.props;
      if (!loginDetails?.userExists) {
        that.redirection();
      }
    }

    render() {
      return <WrappedComponent />;
    }
  }

  const mapStateToProps = (state) => {
    const loginDetails = state.loginDetails;
    return {
      loginDetails,
    };
  };
  return connect(mapStateToProps)(AuthCheck);
}
