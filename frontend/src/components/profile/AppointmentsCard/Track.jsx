import React, { Component } from 'react'
import { Steps, Divider, Row } from "antd";
import Profile from "../Profile";

// const {  Steps, Divider  } = antd;

const { Step } = Steps;

export default class Track extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 0,
        };
      }

  onChange = current => {
    console.log('onChange:', current);
    this.setState({ current });
  };

    render()
     {
        const { current } = this.state;

        return (
          <>
          <Row>
          <Divider><h2>Track your appointment status!</h2></Divider>
          </Row>
          <div className="track">
            <Steps current={current} onChange={this.onChange}>
              <Step title="Confirmed" description="This service is approved" />
              <Step title="In Progress" description="We trying to reach you" />
              <Step title="Compleated" description="Done , Rate our service" />
            </Steps>
            </div>
    
            {/* <Divider />
    
            <Steps current={current} onChange={this.onChange} direction="vertical">
              <Step title="Confirmed" description="This service is approved" />
              <Step title="In Progress" description="We trying to reach you" />
              <Step title="Compleated" description="Done , Rate our service" />
            </Steps> */}
          </>
        );
    };
}
