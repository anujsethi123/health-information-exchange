import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "../../common/withRouter";
import MedicationPage from './MedicationPage';
import PatientInfo from './PatientInfo';

class MedicationData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      DOB: null,
      FirstName: null,
      Gender: null,
      LastName: null,
      Medical_Data: null,
      patientExists: null,
      Age: null,
      patient : {
        firstName: null,
        lastName: null,
        dob: null,
        gender: null,
        age: null
      }
    };
  }
  
  static getDerivedStateFromProps(props, state) {
    if (props.patientSearchDetails !== state.patientSearchDetails) {
        state.Medical_Data= props.patientSearchDetails.Medical_Data;
        state.patientExists= props.patientSearchDetails.patientExists.S;
        state.patient.firstName= props.patientSearchDetails.FirstName;
        state.patient.lastName= props.patientSearchDetails.LastName;
        state.patient.dob= props.patientSearchDetails.DateOfBirth;
        state.patient.gender= props.patientSearchDetails.Gender;

        const dobDate = props.patientSearchDetails.DateOfBirth;
        const [day, month, year] = dobDate.split("-");
        let today = new Date();
        let age = today.getFullYear() - year;
        if (today.getMonth() < month || (today.getMonth() === month && today.getDate() < day)) {
          age--;
        }
        state.patient.age= age;
    }
    return null; 
  }

  render() {
    return (
      <div id="medicationData">
        {this.props.patientSearchDetails.patientExists===true? 
        <div>
          <PatientInfo {...this.state.patient} />
        </div> : 
        <h1>Patient does not exist</h1> }
        {/* <hr/>
        <p>Medical_Comprehend_Data : {JSON.stringify(this.state.Medical_Data)}</p> */}
        <hr/>
        <MedicationPage data={this.state.Medical_Data} />
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


export default withRouter(
  connect(mapStateToProps, null)(MedicationData)
);

