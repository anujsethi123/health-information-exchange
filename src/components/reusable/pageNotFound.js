import React, { Component } from "react";

import Card from "react-bootstrap/Card";

class pageNotFound extends Component {
  render() {
    return (
      <main id="main" role="main">
        <div id="FourZeroFour">
          <Card
            className="text-center marginTop100"
            bg="light"
            border="warning"
          >
            <Card.Body>
              <Card.Title>
                <h1>Uh Oh..</h1>
              </Card.Title>
              <Card.Text>
                The page you have requested cannot be found.
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </main>
    );
  }
}

export default pageNotFound;
