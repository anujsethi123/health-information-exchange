import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { withRouter } from "../../common/withRouter";
import { DASHBOARD, IMAGEUPLOAD, PATIENTSEARCH } from "../../common/constant";
import { clearLoggedInUserDetails } from "../../actions/testAction";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dropdownOpen: false,
    };
    this.handleRedirection = this.handleRedirection.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.dropdownRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this.dropdownRef.current &&
      !this.dropdownRef.current.contains(event.target)
    ) {
      this.setState({
        dropdownOpen: false,
      });
    }
  }

  toggleDropdown() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    });
  }

  handleRedirection(url) {
    const { navigate } = this.props;
    navigate(url);
  }

  render() {
    return (
      <Navbar
        style={{ backgroundColor: "rgb(232 230 230)" }}
        variant="light"
        fixed="top"
      >
        <Container className="justify-content-start m-0">
          <img alt="" src="/logo-HIE.png" className="nav-logo pt-3" />
        </Container>

        {!this.props.loginDetails?.userExists ? null : (
          <Container className="justify-content-end m-0">
            <FontAwesomeIcon
              icon="home"
              size="2x"
              onClick={() => {
                this.handleRedirection(DASHBOARD);
              }}
              className="cursorPointer"
              title="Dashboard"
            />
            <FontAwesomeIcon icon="user" size="2x" className="ml-3" />
            <p className="userIcon">
              {this.props.loginDetails.FirstName}{" "}
              {this.props.loginDetails.LastName}
            </p>
            <div className="dropdown-wrapper" ref={this.dropdownRef}>
              <span className="dropdown-icon" onClick={this.toggleDropdown}>
                &#9662;
              </span>
              {this.state.dropdownOpen && (
                <div className="dropdown">
                  <div className="dropdown-content">
                    <a
                      onClick={() => {
                        this.toggleDropdown();
                        this.handleRedirection(PATIENTSEARCH);
                      }}
                    >
                      Patient Search
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        this.toggleDropdown();
                        this.handleRedirection(IMAGEUPLOAD);
                      }}
                    >
                      Upload Document
                    </a>
                    <a
                      href="#"
                      onClick={() => {
                        this.toggleDropdown();
                        this.props.clearLoggedInUserDetails();
                        this.handleRedirection(DASHBOARD);
                      }}
                    >
                      Logout
                    </a>
                  </div>
                </div>
              )}
            </div>
          </Container>
        )}
      </Navbar>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  clearLoggedInUserDetails: () => {
    dispatch(clearLoggedInUserDetails());
  },
});

const mapStateToProps = (state) => {
  const loginDetails = state.loginDetails;
  return {
    loginDetails,
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
