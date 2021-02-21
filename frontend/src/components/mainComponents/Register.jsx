import React, { Component } from "react";
import { Form, Input, Button, Divider } from 'antd';
import "../../App.css";
import CalendarBG from "../../images/calendarBG.svg";

const style = {
  height: 40,
  width: 100,
  lineHeight: "30px",
  borderRadius: 4,
  backgroundColor: "#fff",
  color: "#006466",
  textAlign: "center",
  fontSize: 14,
};
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sucsses: false
    }
  }
  render() {
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 8 },
    };
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };
 
    return (
      <div   style={{
        background: `url(${CalendarBG})`,
        width: "100%",
        backgroundRepeat: "no-repeat",
        color: "white",
      }}>
        <Divider orientation="center" type="horizontal">
          <h1 className="large-font contact-title">
            <b>Register</b>
          </h1>

        </Divider>
        <div className='register-container'>
          <h1 className="contact-title">Be one of our clients!</h1>
          <Form
            {...layout}
            name="basic"
          
          >
            <Form.Item
              label={<h4><b>Your Name :</b></h4>}
              name="name"
              rules={[{ required: true, message: 'Please input your name!' }]}
            >
              <Input />
            </Form.Item>
        
            <Form.Item
              label={<h4><b>Email:</b></h4>}
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={<h4><b>Password</b></h4>}
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label={<h4><b>Re-enter Password</b></h4>}
              name="confirm-password"
              rules={[{ required: true, message: 'Re-enter Password!' }]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label={<h4><b>Phone number:</b></h4>}
              name="phone"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
              </Form.Item>
            <Form.Item
              label={<h4><b>Adress:</b></h4>}
              name="phone"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit" style={style}>
                Register
        </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
export default Register;