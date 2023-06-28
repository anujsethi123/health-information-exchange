import React from 'react';

const PatientInfo = ({ firstName, lastName, dob, gender, age }) => {
  return (
    <div>
      <div className="card bg-primary-dark text-black" style={{ width: '100%' }}> 
        <div className="card-body text-center marginleftright">
          <h2 className="mb-4">Patient Information</h2>
          <div className="row">
            <div className="col-6"> 
              <strong>First Name:</strong> {firstName}
            </div>
            <div className="col-6">
              <strong>Last Name:</strong> {lastName}
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <strong>Date of Birth:</strong> {dob}
            </div>
            <div className="col-6">
              <strong>Gender:</strong> {gender}
            </div>
          </div>
          <div className="d-flex justify-content-center align-items-center"  style={{ fontSize: '1.2rem' }}>
            <div>
              <strong>Age:</strong>
            </div>
            <div>
              {age} years
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;
