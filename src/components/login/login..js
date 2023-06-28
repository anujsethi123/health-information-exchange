import React, { Component } from "react";
import { connect } from "react-redux";
import { DASHBOARD } from "../../common/constant";
import { withRouter } from "../../common/withRouter";
import { requestLoginDetails } from "../../actions/testAction";
import { encryptData } from "../../common/encryption";
import FormHeader from "../reusable/formHeader";
import FormInput from "../reusable/formInput";
import FormButton from "../reusable/formButton";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loginDetails: "",
      usernameError: false,
      passwordError: false,
      redirectToHomeScreen: false,
      showInvalidUserMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRedirection = this.handleRedirection.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.loginDetails !== state.loginDetails) {
      if (props.loginDetails?.userExists === true) {
        const { navigate } = props;
        navigate(DASHBOARD);
        return {
          loginDetails: props.loginDetails,
          redirectToHomeScreen: true,
          showInvalidUserMessage: false,
        };
      } else if (props.loginDetails?.userExists === false) {
        return { showInvalidUserMessage: true };
      }
    }

    return null; // No change to state
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const userDetails = {
      username: this.state.username,
      key: encryptData(this.state.password),
    };
    if (
      this.validateUserName(this.state.username) &
      this.validatePwd(this.state.password)
    ) {
      this.props.checkUserDetails(userDetails);
    }
  }

  validatePwd(pwd) {
    if (pwd === "" || pwd.length < 0) {
      this.setState({
        passwordError: true,
        showInvalidUserMessage: false,
      });
      return false;
    } else {
      this.setState({
        passwordError: false,
        showInvalidUserMessage: false,
      });
      return true;
    }
  }

  validateUserName(userName) {
    if (userName === "" || userName.length < 0) {
      this.setState({
        usernameError: true,
        showInvalidUserMessage: false,
      });
      return false;
    } else {
      this.setState({
        usernameError: false,
        showInvalidUserMessage: false,
      });
      return true;
    }
  }

  handleRedirection() {
    const { navigate } = this.props;
    navigate(DASHBOARD);
  }

  render() {
    return (
      <div id="loginform">
        <FormHeader title="Login" />
        <form>
          <div className="text-center">
            {this.state.showInvalidUserMessage ? (
              <label id="UsernameBlank" className="customError">
                Invalid Username or Password
              </label>
            ) : null}
          </div>
          <FormInput
            description="Username"
            placeholder="Enter your username"
            type="text"
            name="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          {this.state.usernameError ? (
            <label id="UsernameBlank" className="customError">
              Username can not be blank
            </label>
          ) : null}
          <FormInput
            description="Password"
            placeholder="Enter your password"
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          {this.state.passwordError ? (
            <label id="PasswordBlank" className="customError">
              Password can not be blank
            </label>
          ) : null}
          <FormButton title="Log in" submitHandler={this.handleSubmit} />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const loginDetails = state.loginDetails;
  return {
    loginDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkUserDetails: (userDetails) => {
    dispatch(requestLoginDetails(userDetails));
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
