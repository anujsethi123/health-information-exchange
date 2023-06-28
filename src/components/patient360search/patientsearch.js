import React, { Component } from "react";
import FormInput from "../reusable/formInput";
import FormButton from "../reusable/formButton";
import FormHeader from "../reusable/formHeader";
import {
  requestSearchPatient,
  clearSearchPatient,
} from "../../actions/testAction";
import { connect } from "react-redux";
import { withRouter } from "../../common/withRouter";
import { MEDICATIONDATA } from "../../common/constant";

class PatientSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      firstNameError: false,
      lastNameError: false,
      dobError: false,
      genderError: false,
      patientSearchDetails: {},
      showInvalidSearchMessage: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.clearPatientSearchDetails();
  }

  static getDerivedStateFromProps(props, state) {
    if (props.patientSearchDetails !== state.patientSearchDetails) {
      if (props.patientSearchDetails?.patientExists === true) {
        const { navigate } = props;
        navigate(MEDICATIONDATA);
        return {
          patientSearchDetails: props.patientSearchDetails,
          showInvalidSearchMessage: false,
        };
      } else if (props.patientSearchDetails?.patientExists === false) {
        return { showInvalidSearchMessage: true };
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
    this.setState(
      { showInvalidSearchMessage: false, patientSearchDetails: {} },
      () => {
        if (
          this.validateFirstName(this.state.firstName) &
          this.validateLastName(this.state.lastName) &
          this.validateDob(this.state.dob) &
          this.validateGender(this.state.gender)
        ) {
          const patientDetails = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            dob: this.state.dob,
            gender: this.state.gender,
          };

          this.props.searchPatient(patientDetails);
        }
      }
    );
  }

  handleClear = () => {
    this.setState({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      firstNameError: false,
      lastNameError: false,
      dobError: false,
      genderError: false,
    });
  };

  validateFirstName(firstName) {
    if (firstName === "" || firstName.length < 0) {
      this.setState({
        firstNameError: true,
        showInvalidSearchMessage: false,
      });
      return false;
    } else {
      this.setState({
        firstNameError: false,
        showInvalidSearchMessage: false,
      });
      return true;
    }
  }

  validateLastName(lastName) {
    if (lastName === "" || lastName.length < 0) {
      this.setState({
        lastNameError: true,
        showInvalidSearchMessage: false,
      });
      return false;
    } else {
      this.setState({
        lastNameError: false,
        showInvalidSearchMessage: false,
      });
      return true;
    }
  }

  validateDob(dob) {
    if (dob === "" || dob.length < 0) {
      this.setState({
        dobError: true,
        showInvalidSearchMessage: false,
      });
      return false;
    } else {
      this.setState({
        dobError: false,
        showInvalidSearchMessage: false,
      });
      return true;
    }
  }

  validateGender(gender) {
    if (gender === "" || gender.length < 0) {
      this.setState({
        genderError: true,
        showInvalidSearchMessage: false,
      });
      return false;
    } else {
      this.setState({
        genderError: false,
        showInvalidSearchMessage: false,
      });
      return true;
    }
  }

  render() {
    return (
      <div id="patientsearchform">
        <FormHeader title="Search Patient" />
        <div>
          <div className="text-center">
            {this.state.showInvalidSearchMessage ? (
              <label id="UsernameBlank" className="customError">
                No patient found with the given search criteria. Please refine
                your search criteria.
              </label>
            ) : null}
          </div>
          <div className="customColumn">
            <div className="col-6">
              <FormInput
                description="First Name"
                placeholder="Enter patient's first name"
                type="text"
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
              {this.state.firstNameError ? (
                <label id="FirstNameBlank" className="customError">
                  First Name can not be blank
                </label>
              ) : null}
            </div>
            <div className="col-6">
              <FormInput
                description="Last Name"
                placeholder="Enter patient's last name"
                type="text"
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
              {this.state.lastNameError ? (
                <label id="LastNameBlank" className="customError">
                  Last Name can not be blank
                </label>
              ) : null}
            </div>
          </div>
          <div className="customColumn">
            <div className="col-6">
              <FormInput
                description="Date of Birth"
                placeholder="Enter patient's date of birth"
                type="date"
                name="dob"
                value={this.state.dob}
                onChange={this.handleChange}
              />
              {this.state.dobError ? (
                <label id="DobBlank" className="customError">
                  Date of Birth can not be blank
                </label>
              ) : null}
            </div>
            <div className="col-6">
              <div className="customRow">
                <label>Gender</label>
                <select
                  description="Gender"
                  placeholder="Select patient's gender"
                  type="select"
                  name="gender"
                  value={this.state.gender}
                  onChange={this.handleChange}
                >
                  <option disabled value="">
                    Select patient's gender
                  </option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {this.state.genderError ? (
                <label id="GenderBlank" className="customError">
                  Gender can not be blank
                </label>
              ) : null}
            </div>
          </div>
          <div className="customColumn">
            <div className="col-6">
              <FormButton title="Search" submitHandler={this.handleSubmit} />
            </div>
            <div className="col-6">
              <FormButton title="Clear" submitHandler={this.handleClear} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const patientSearchDetails = state.patientSearchDetails;
  return {
    patientSearchDetails,
  };
};

const mapDispatchToProps = (dispatch) => ({
  searchPatient: (patientDetails) => {
    dispatch(requestSearchPatient(patientDetails));
  },

  clearPatientSearchDetails: () => {
    dispatch(clearSearchPatient());
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PatientSearch)
);
