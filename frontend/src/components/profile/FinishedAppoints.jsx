import React, { Component } from "react";
import { TrashAppointments, currentUser } from "../API/Api";
import { Row, Divider, Card, Col, Tooltip, Empty } from "antd";
import Star from "./AppointmentsCard/StarRating";
import {
  EditOutlined,
  NodeIndexOutlined,
  DeleteOutlined,
  CalendarOutlined,
  StarOutlined,
} from "@ant-design/icons";
const { Meta } = Card;

class FinishedAppoints extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Appointments: [],
    };
  }

  componentDidMount() {
    // ************** add id client */
    TrashAppointments(currentUser._id)
      .then((response) => {
        console.log("DATA: ", response.data);
        this.setState({ Appointments: response.data.app_id });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  render() {
    console.log(currentUser._id);
    console.log(currentUser);
    console.log("@@@@", this.state.Appointments);

    return (
      <div>
        <Row>
          <Divider>
            <h2>Finished Appointments</h2>
          </Divider>
        </Row>

        <Row className="emptyCont">
          {this.state.Appointments.length == 0 ? (
            <Empty description={<h2>No Appointments Yet!</h2>} />
          ) : (
            this.state.Appointments.map((element, index) => {
              return (
                <div className="Cardscolumn">
                  <div className="Cardsrow">
                    <Card
                      style={{ width: 300 }}
                      actions={[
                        <Tooltip placement="bottom" title="Rate">
                          <Star item={element} />
                        </Tooltip>,
                      ]}
                    >
                      <Meta
                        avatar={<CalendarOutlined className="AppAvatar" />}
                        title={`Title: ${element.title}`}
                        description={` Your Issue: ${
                          element.description
                        } ${"\n"} Your Rate: ${
                          element.rate ? ` ${element.rate}` : ` Not Rated Yet!`
                        }`}
                        style={{ whiteSpace: "break-spaces" }}
                      />
                    </Card>
                  </div>
                </div>
              );
            })
          )}
        </Row>
      </div>
    );
  }
}

export default FinishedAppoints;
