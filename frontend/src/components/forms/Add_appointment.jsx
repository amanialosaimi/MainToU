import React, { useState } from "react";
import { Form, Input, Modal, Button, Select, DatePicker, Radio, Row, Space,Col } from "antd";
import { addNewAppointment , booked , currentUser} from "../API/Api";
// import moment from "moment";
const { Option } = Select;
const { TextArea } = Input;
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
let selectedDate = "";
const AppointsCollection = ({ visible, createNewAppoint, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      title="Book a New Appointment:"
      centered
      visible={visible}
      onOk={() =>
        form
          .validateFields()
          .then((values) => {
            values.date = selectedDate;
            values.time+=values.radio_group
            console.log("bla bla", values);
            form.resetFields();
            createNewAppoint(values);
          })
          .catch((info) => {
            console.log("Validate Failed!!!!:", info);
          })
      }
      okText="Book"
      onCancel={onCancel}
      htmlType="submit"
    >
      <Form {...layout} form={form} name="nest-messages">
        
      <Form.Item
          name={"title"}
          rules={[
            {
              required: true,
              message: "Title is required",
            },
          ]}
        >
           <Select  defaultValue="Select issue type ">
            <Option value="Devices">Device issue</Option>
            <Option value="Networks">Network issue</Option>
            <Option value="Softwares">Software issue</Option>
            <Option value="cables">Cables issue</Option>
            <Option value="OS">OS issue</Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
          name={"description"}
          label="What is your issue? "
        >
          <Input.TextArea placeholder= 'Write your issue in details .. ' />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Company Selection is required",
            },
          ]}
          name={"companyName"}
        >
          <Select defaultValue="Choose a Company">
            <Option value="TWAIK Holding Group">TWAIK Holding Group</Option>
            <Option value="MOSOOK">MOSOOK</Option>
            <Option value="POLY-TECH">POLY-TECH</Option>
            <Option value="Suadi Technichal limited">Suadi Technichal limited</Option>
          </Select>
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Date is required",
            },
          ]}
          name={"date"}
          label="Date: "
        >
          <DatePicker
            style={{ width: "50%" }}
            onChange={(date, dateString) => {
              selectedDate = dateString;
            }}
          />
        </Form.Item>
        <Form.Item 
        rules={[
          {
            required: true,
            message: "Time is required",
          },
        ]}
        name={"time"} label="Time: ">
          <Input placeholder='Ex: 9:00'/>
          </Form.Item>
          <Form.Item rules={[
          {
            required: true,
            message: "AM or PM is required",
          },
        ]}
        name="radio_group" label="Choose: ">
            <Radio.Group>
              <Radio value="am">AM</Radio>
              <Radio value="pm">PM</Radio>
            </Radio.Group>
          </Form.Item>
      </Form>
    </Modal>
  );
};

export default function Add_appointment() {
  const [visible, setVisible] = useState(false);
  const createNewAppoint = async (values) => {
    console.log(values);
    addNewAppointment(values)
      .then((response) => {
        console.log("response", response.data);
        console.log("response", response.data._id);
        booked(currentUser._id,response.data._id)
        .then((response) => {
          console.log("Added appointments");

        }).catch((error) => {
        console.log("API ERROR:", error);
      });

      })

      .catch((error) => {
        console.log("API ERROR:", error);
      });

    return setVisible(false);
  };
  return (
    <>
      <Button className="addAppbtn"  onClick={() => setVisible(true)}>
        Add Appointment
      </Button>
      <AppointsCollection
        visible={visible}
        createNewAppoint={createNewAppoint}
        onCancel={() => setVisible(false)}
      />
    </>
  );
}
