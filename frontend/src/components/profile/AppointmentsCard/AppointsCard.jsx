import React, { Component, useState } from "react";
import { Card, Col, Row, Divider, Tooltip , Popconfirm} from "antd";
import { deleteAppointment } from "../../API/Api";
import { Route, Link } from "react-router-dom";
import Add_appointment from "../../forms/Add_appointment";
import Star from "./StarRating";
import Track from "./Track";
import Trash from '../Trash'
import {
  EditOutlined,
  NodeIndexOutlined,
  DeleteOutlined,
  CalendarOutlined,
  CheckSquareOutlined,
  StarOutlined,
} from "@ant-design/icons";
import moveToTrash from "./moveToTrash";
const { Meta } = Card;
// class component for display a card
class AppointsCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      Appointments:[],
      show:false
    };
  }
  orderInfo =(info)=>{

    this.setState({ order: [...this.state.order, info] });
  
    // console.log("hi from order", info)
  
  }
   handleDelete = (key) => {
    //datasource.title
    console.log(key)
    // setData(dataSource.filter((item) => item._id !== key));
    console.log("hiiii", key._id);
    // let arr=[]
    // arr.push(key)
    var joined = this.state.Appointments.push(key);
    this.setState({ Appointments: joined })
    console.log(this.state.Appointments)

    deleteAppointment(key._id)
      .then((response) => {
        console.log("Deleted Succcfully !!!!!!!!", response);
      })
      .catch((error) => {
        console.log("API ERROR:", error);
      });
  };

  Check=(key)=>{
    console.log(key)
    console.log("Check", key._id);

  }
  // let [showTrack, setshowTrack] = useState("");
  render() {
    return (
      <div>
        <div>
          <Row gutter={[16, 16]}>
            <Col>
              <Card
                style={{ width: 300 }}
                actions={[
                  <Tooltip placement="bottom" title="Track">
                    <NodeIndexOutlined
                      className="appointsIco"
                      key="track"
                      // onClick={setshowTrack(true)}
                    />
                    {/* {showTrack && <Track />} */}
                  </Tooltip>,
                  <Tooltip placement="bottom" title="Check">
                  <CheckSquareOutlined
                    className="appointsIco"
                    key="track"
                    onClick={this.Check(this.props.item)}
                  />
    
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
                  title={this.props.title}

                  description={`${this.props.description} \n ${this.props.time}`}

                />
              </Card>
            </Col>
            <Col></Col>
          </Row>
        </div>

        {/* {this.state.show ? <Trash array={this.state.Appointments}></Trash>: null} */}
        {/* <moveToTrash array={this.state.Appointments}></moveToTrash>
        <Trash array={this.state.Appointments}></Trash> */}

      </div>
    );
  }
}

export default AppointsCard;