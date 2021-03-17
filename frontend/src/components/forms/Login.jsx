import "../../App.css";
import React, { useState } from "react";
import { Form, Button, Modal, Input, Checkbox , message } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {API} from '../API/Api'
const LoginCollection = ({ visible, onLogin, onCancel, statusMessage }) => {
  const key = 'updatable';
  const openMessage = () => {
    message.loading({ content: 'Loading...', key});
    setTimeout(() => {
      message.success({ content: 'You are successfully login!', key, duration: 2 });
       }, 1000);
  };
  const [form] = Form.useForm();
  return (<Modal
    title="Welcome Back!"
    centered
    visible={visible}
    onOk={() => form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onLogin(values);
        openMessage()
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      })
    }
    onCancel={onCancel}
    htmlType="submit"
  //   style={{ backgroundImage: `url(${LoginBg})`, backgroundRepeat: 'no-repeat',
  //   width:'250px', height:'300px'}}
  >
    <Form
      form={form}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
    >
      {statusMessage}
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <a href="/register"><h4>Don't have an account! Register now!</h4></a>
      </Form.Item>
    </Form>
  </Modal>)
}
export default function Login(props) {
  const [visible, setVisible] = useState(false)
  const onLogin = async (values) => {
   /* const currentUser =API.login(values);
    //console.log(currentUser.__proto__)
    console.log(currentUser[["Promise"]])
  }*/
    console.log(values)
    try {
      await API.login(values)
        .then((res) => {
        // console.log(values)
      //   console.log('res',res.address)
         if(res !== undefined){
          props.setAuth(
            {
             currentUser : res,
             isLogged : true
            })
         }
        })
        .then((login) => {
            setVisible(false)
            console.log('login',login)
            }
          /*}else {
            setStatusMessage(login.message)
          }*/
        )
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <>
      <Button
        className="loginBtn"
        type="primary"
        onClick={() => setVisible(true)}
      >
        Login
        </Button>
      <LoginCollection
        visible={visible}
        onLogin={onLogin}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </>
  )
}