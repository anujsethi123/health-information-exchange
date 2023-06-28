import React, { Component } from "react";
import FormHeader from "../reusable/formHeader";
import FormInput from "../reusable/formInput";
import FormButton from "../reusable/formButton";
import { withRouter } from "../../common/withRouter";
import { requestFileUpload, retrieveTesting } from "../../actions/testAction";
import { connect } from "react-redux";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      files: [],
      fileName: "",
      userName: "",
      fileUploadSuccess: "",
      firstNameError: false,
      lastNameError: false,
      dobError: false,
      genderError: false,
      fileError: false,
      showFileMessageSuccess: false,
      showFileMessageError: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.fileUploadSuccess !== state.fileUploadSuccess) {
      if (props.fileUploadSuccess === true) {
        return {
          showFileMessageSuccess: true,
          showFileMessageError: false,
          fileUploadSuccess: props.fileUploadSuccess,
        };
      } else if (props.fileUploadSuccess === false) {
        return {
          showFileMessageError: true,
          showFileMessageSuccess: false,
          fileUploadSuccess: props.fileUploadSuccess,
        };
      }
    }
    return null;
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    // Check file size before adding to state
    const filteredFiles = fileList.filter(
      (file) => file.size <= 10 * 1024 * 1024
    );
    this.setState({
      files: filteredFiles,
    });
  };

  async updateFileContent() {
    let filesData = [];
    for (const fileValue of this.state.files) {
      let fileContent = await readFileAsDataURL(fileValue);
      const params = {
        name: fileValue.name,
        content: fileContent,
      };
      filesData.push(params);
    }
    // await this.state.files.forEach(async (fileValue) => {
    //   let fileContent = await readFileAsDataURL(fileValue);
    //   const params = {
    //     name: fileValue.name,
    //     content: fileContent,
    //   };
    //   filesData.push(params);
    // });
    const patientDetails = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      dob: this.state.dob,
      gender: this.state.gender,
      userName: this.props.userName,
      files: filesData,
    };
    if (
      this.validateFirstName(this.state.firstName) &
      this.validateLastName(this.state.lastName) &
      this.validateDob(this.state.dob) &
      this.validateGender(this.state.gender) &
      this.validateFile(this.state.files)
    ) {
      this.props.checkFileUploadStatus(patientDetails);
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateFileContent();
  }

  handleClear = () => {
    this.setState({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      files: [],
      fileName: "",
      firstNameError: false,
      lastNameError: false,
      dobError: false,
      genderError: false,
      fileError: false,
    });
  };

  validateFirstName(firstName) {
    if (firstName === "" || firstName.length < 0) {
      this.setState({
        firstNameError: true,
      });
      return false;
    } else {
      this.setState({
        firstNameError: false,
      });
      return true;
    }
  }

  validateLastName(lastName) {
    if (lastName === "" || lastName.length < 0) {
      this.setState({
        lastNameError: true,
      });
      return false;
    } else {
      this.setState({
        lastNameError: false,
      });
      return true;
    }
  }

  validateDob(dob) {
    if (dob === "" || dob.length < 0) {
      this.setState({
        dobError: true,
      });
      return false;
    } else {
      this.setState({
        dobError: false,
      });
      return true;
    }
  }

  validateGender(gender) {
    if (gender === "" || gender.length < 0) {
      this.setState({
        genderError: true,
      });
      return false;
    } else {
      this.setState({
        genderError: false,
      });
      return true;
    }
  }

  validateFile(files) {
    if (files.length === 0) {
      this.setState({
        fileError: true,
      });
      return false;
    } else {
      this.setState({
        fileError: false,
      });
      return true;
    }
  }

  render() {
    return (
      <div id="patientuploadform">
        <FormHeader title="Upload Files" />
        <div className="text-center">
          {this.state.showFileMessageError ? (
            <label id="FileUploadError" className="customError">
              File Upload Failed
            </label>
          ) : null}
          {this.state.showFileMessageSuccess ? (
            <label id="FileUploadSuccess" className="customError">
              File Uploaded Successfully
            </label>
          ) : null}
        </div>
        <div>
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
              <div className="customRow">
                <label>File Upload (Max 10MB)</label>
                <input
                  type="file"
                  id="file"
                  name="file"
                  onChange={this.handleFileChange}
                  multiple
                />
              </div>
              {this.state.fileError ? (
                <label id="FileBlank" className="customError">
                  Please select atleast 1 File
                </label>
              ) : null}
            </div>
            <div className="col-6">
              {this.state.files.length > 0 ? (
                <label>Selected Files:</label>
              ) : null}
              {this.state.files.map((file, index) => (
                <div key={index}>{file.name}</div>
              ))}
            </div>
          </div>
          <div className="customColumn">
            <div className="col-6">
              <FormButton title="Upload" submitHandler={this.handleSubmit} />
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

const mapStateToProps = (state) => ({
  fileUploadSuccess: state.loginDetails.fileUploadSuccess,
  userName: state.loginDetails.Username,
});

const mapDispatchToProps = (dispatch) => ({
  increment: () => {
    dispatch(retrieveTesting());
  },
  checkFileUploadStatus: (patientDetails) => {
    dispatch(requestFileUpload(patientDetails));
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(UploadImage)
);

export const readFileAsDataURL = async (fileObj) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject({ data: "Error occured while reading file content" });
    };
    reader.readAsDataURL(fileObj);
  });
};
