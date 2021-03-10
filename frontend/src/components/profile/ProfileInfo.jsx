import React, { Component } from "react";
import { Form, Input, Button, Table, Col, Row, Divider, Space } from "antd";
import { getClientInfo, updateClientInfo , currentUser} from "../API/Api";
import { EditOutlined, TeamOutlined } from "@ant-design/icons";
const { Column, ColumnGroup } = Table;
export default class ProfileInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showButton: false,
      Inputname: false,
      Inputaddress: false,
      Inputemail: false,
      InputphoneNumber: false,
      clientInfo: "",
      companyName: "",
      address: "",
      email: "",
      phoneNumber: "",
    };
  }
  componentDidMount() {
    // ************** add id client */
    getClientInfo(currentUser._id)
      .then((response) => {
        console.log("DATA: ", response.data);
        this.setState({ clientInfo: response.data });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }
  show = () => {
    this.setState({ showButton: true });
  };
  hide = () => {
    this.setState({ showButton: false });
    this.setState({ Inputname: false });
    this.setState({ Inputaddress: false });
    this.setState({ Inputemail: false });
    this.setState({ InputphoneNumber: false });

    const info = this.state.clientInfo;
    const newInfo = {
      companyName: this.state.companyName ? this.state.companyName: info.companyName,
      address: this.state.address ? this.state.address : info.address,
      email: this.state.email ? this.state.email : info.email,
      phoneNumber: this.state.phoneNumber ? this.state.phoneNumber : info.phoneNumber,
    };
    updateClientInfo(newInfo, currentUser._id)
      .then((response) => {
        console.log("DATA: ", response.data);
        
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });

      
  };
  Editname = () => {
    console.log();
    this.setState({ Inputname: true });
  };
  Editaddress = () => {
    console.log();
    this.setState({ Inputaddress: true });
  };
  Editemail = () => {
    console.log();
    this.setState({ Inputemail: true });
  };
  EditphoneNumber = () => {
    console.log();
    this.setState({ InputphoneNumber: true });
  };
  render() {

    console.log(currentUser.email)
    return (
      <div>
        <Row>
          <Divider>
            <h2>Your Information</h2>
          </Divider>
        </Row>
        <div className="profileInfo "
     
        >
          <div className="profform" >
          <Divider><TeamOutlined className="profIco"/></Divider>
        <Form name="nest-messages" style={{ width: 300 }}>

          <Form.Item name="companyName" label={<h4><b>Company name:</b></h4>}>
            <Row>
            {this.state.companyName ? this.state.companyName: this.state.clientInfo.companyName}

            {this.state.showButton ? (
              <Col className="gutter-row" span={8}>
              
              <EditOutlined onClick={this.Editname}></EditOutlined>
               </Col>
            ) : null}
            {this.state.Inputname ? (
              <Col className="gutter-row" span={8}>
              <Input
                onChange={(event) => {
                  this.setState({ companyName: event.target.value });
                }}
              />
              
            </Col>
            ) : null}
            </Row>
          </Form.Item>

          <Divider/>
          <Form.Item name="address" label={<h4><b>Address:</b></h4>}>
           <Row>
            {this.state.address ? this.state.address: this.state.clientInfo.address}

            {this.state.showButton ? (
              <Col className="gutter-row" span={8}>
              <EditOutlined onClick={this.Editaddress}></EditOutlined>
              </Col>
            ) : null}
            {this.state.Inputaddress ? (
              <Col className="gutter-row" span={8}>
              <Input
                onChange={(event) => {
                  this.setState({ address: event.target.value });
                }}
              />
              </Col>
            ) : null}
            </Row>
          </Form.Item>

           <Divider/>
          <Form.Item name="email" label={<h4><b>Email:</b></h4>}>
            <Row>
            {this.state.email ? this.state.email: this.state.clientInfo.email}

            {this.state.showButton ? (
              <Col className="gutter-row" span={8}>
              <EditOutlined onClick={this.Editemail}></EditOutlined>
              </Col>
            ) : null}
            {this.state.Inputemail ? (
              <Col className="gutter-row" span={8}>
              <Input
                onChange={(event) => {
                  this.setState({ email: event.target.value });
                }}
              />
              </Col>
            ) : null}
            </Row>
          </Form.Item>

          <Divider/>
          <Form.Item name="phoneNumber" label={<h4><b>Phone Number:</b></h4>}>
            <Row>
            {this.state.phoneNumber ? this.state.phoneNumber: this.state.clientInfo.phoneNumber}
            {this.state.showButton ? (
              <Col className="gutter-row" span={8}>
              <EditOutlined onClick={this.EditphoneNumber}></EditOutlined>
              </Col>
            ) : null}
            {this.state.InputphoneNumber ? (
              <Col className="gutter-row" span={8}>
              <Input
                onChange={(event) => {
                  this.setState({ phoneNumber: event.target.value });
                }}
              />
              </Col>
            ) : null}
            </Row>
          </Form.Item>
          {this.state.showButton ? (
            <Button onClick={this.hide}>save</Button>
          ) : (
            <Button onClick={this.show}>Edit</Button>
          )}
        </Form>
        </div>
        </div>
      </div>
    );
  }
}