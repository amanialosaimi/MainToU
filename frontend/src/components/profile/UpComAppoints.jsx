import React, { Component, useState , useEffect } from "react";
import { gettAllAppointment , currentUser} from "../API/Api";
import Add_appointment from "../forms/Add_appointment";
import About from "../mainComponents/About";
import AppointsCard from "./AppointmentsCard/AppointsCard";
import Track from "./AppointmentsCard/Track";
import StarRating from "./AppointmentsCard/StarRating";
import { Row, Col , Divider, Empty} from "antd";



function UpComAppoints() {
  let [ ComAppoints,setComAppoints] = useState('');
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     Appointments:[]
  //   };
  // }

  // componentDidMount() {

  //   gettAllAppointment(currentUser._id)
  //     .then((response) => {
  //       console.log("DATA: ", response.data);
  //       this.setState({ Appointments: response.data.app_id});
  //     })
  //     .catch((err) => {
  //       console.log("ERR: ", err);
  //     });
  // }

  // useEffect(() => {
      gettAllAppointment(currentUser._id)
      .then((response) => {
        console.log("DATA: ", response.data);
        // this.setState({ Appointments: response.data.app_id});
        setComAppoints(response.data.app_id)
        console.log("ComAppoints",ComAppoints)
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
// }, []);

  // render(){
  //   console.log(currentUser._id)
  //   console.log(this.state.Appointments)



       
    return (
      
      <div>
        <div>
          <Row>
            <Divider>
              <h2>Appointments</h2>
            </Divider>
          </Row>
        </div>
        <Row>
            <Col>
              <Add_appointment />
            </Col>
          </Row>
        <Row className="emptyCont">

          {ComAppoints.length==0 ? <Empty description={<h2>No Appointments yet</h2>}/> : ComAppoints.map((item, index) => {
        return (
          <AppointsCard
          title={item.title}
          description={item.description}
          data={item.date}
          time={item.time}
          item={item}
          />
        );
      })} 
        </Row>

        {/* <Track/> */}
        {/* <StarRating/> */}

      </div>
    );
  // }
}

export default UpComAppoints;