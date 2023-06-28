import React, { Component } from "react";
import { withRouter } from "../../common/withRouter";
import { Card, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IMAGEUPLOAD, PATIENTSEARCH } from "../../common/constant";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleRedirection = this.handleRedirection.bind(this);
  }

  handleRedirection(url) {
    const { navigate } = this.props;
    navigate(url);
  }

  // handleUploadImageRedirection() {
  //   const { navigate } = this.props;
  //   navigate(IMAGEUPLOAD);
  // }

  // handlePatientSearchRedirection() {
  //   const { navigate } = this.props;
  //   navigate(PATIENTSEARCH);
  // }

  render() {
    return (
      <div id="cardSetUp" className="login-container ">
        <Col className="pt-5">
          <Card className="text-center cardStyle cursorPointer" bg="light">
            <Card.Body
              onClick={() => {
                this.handleRedirection(PATIENTSEARCH);
              }}
            >
              <FontAwesomeIcon icon="search" size="2x" beatFade />
              <Card.Title>
                <h2>Patient Search</h2>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
        <Col className="pb-5 mt-5">
          <Card className="text-center cardStyle cursorPointer" bg="light">
            <Card.Body
              onClick={() => {
                this.handleRedirection(IMAGEUPLOAD);
              }}
            >
              <FontAwesomeIcon icon="upload" size="2x" beatFade />
              <Card.Title>
                <h2>Upload Document</h2>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </div>
    );
  }
}

export default withRouter(Dashboard);
