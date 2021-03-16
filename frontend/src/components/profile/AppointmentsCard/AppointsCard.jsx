import React, { Component, useState } from "react";
import { Card, message ,Tooltip, Popconfirm } from "antd";
import { deleteAppointment, CompletedApp } from "../../API/Api";
import {
  NodeIndexOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CheckOutlined,
} from "@ant-design/icons";
//Confirmation message
const key = 'updatable';
const openMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Your Appointment has been Moved to Trash!', key, duration: 2 });
  }, 1500);
};
const openCompMessage = () => {
  message.loading({ content: 'Loading...', key });
  setTimeout(() => {
    message.success({ content: 'Your Appointment has been Moved to Completed!', key, duration: 2 });
  }, 1500);
};
const { Meta } = Card;
// class component for display a card
class AppointsCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appointments: [],
      show: false,
      trash : this.props.trash
    };
  }
  orderInfo = (info) => {
    this.setState({ order: [...this.state.order, info] });
    // console.log("hi from order", info)
  };
  handleDelete = (key) => {
    //  console.log(key)
    // setData(dataSource.filter((item) => item._id !== key));
    //console.log("hiiii", key._id);
    // let arr=[]
    // arr.push(key)
    var joined = this.state.Appointments.push(key);
    this.setState({ Appointments: joined });
    //console.log(this.state.Appointments)
    deleteAppointment(key._id)
      .then((response) => {
        let a = [...this.state.trash]
        a.push(key)
        this.setState({
        trash: a})
        console.log(a)
          if(localStorage.getItem('trash title') == null){
            localStorage.setItem('trash title', a[a.length-1].title);   
          }
          else{
            localStorage.setItem('trash title', localStorage.getItem('trash title')+' '+a[a.length-1].title);   
          }
          if(localStorage.getItem('trash date') == null){
            localStorage.setItem('trash date', a[a.length-1].date);   
          }
          else{
            localStorage.setItem('trash date', localStorage.getItem('trash date')+' '+a[a.length-1].date);   
          }
       console.log("Deleted Succcfully !!!!!!!!", response);
       openMessage();
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });
  };
  Check = () => {
    console.log("Check", this.props.item._id);
    CompletedApp(this.props.item._id)
      .then((response) => {
        console.log("Checked Succcfully !!!!!!!!", response);
        openCompMessage();
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });
  };
  // let [showTrack, setshowTrack] = useState("");
  render() {
    return (
      <>
        <div className="Cardscolumn">
          <div className="Cardsrow">
            <Card
              style={{ width: 300 }}
              actions={[
                <Tooltip placement="bottom" title="Track">
                  <NodeIndexOutlined className="appointsIco" key="track" />
                </Tooltip>,
                <Tooltip placement="bottom" title="Completed">
                  <CheckOutlined onClick={this.Check} />
                </Tooltip>,
                <Tooltip placement="bottom" title="Delete">
                  <Popconfirm
                    title="Sure to delete?"
                    onConfirm={() => this.handleDelete(this.props.item)}
                  >
                    <a>
                      <DeleteOutlined className="edit" />
                    </a>
                  </Popconfirm>
                </Tooltip>,
              ]}
            >
              <Meta
                avatar={<CalendarOutlined className="AppAvatar" />}
                title={`Title: ${this.props.title}`}
                description={`Your issue: ${
                  this.props.description
                } ${"\n"} ${`At: ${this.props.time}`}`}
                style={{ whiteSpace: "break-spaces" }}
              />
            </Card>
          </div>
        </div>
      </>
    );
  }
}
export default AppointsCard;