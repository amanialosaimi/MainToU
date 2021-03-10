import React, { Component } from "react";
import "../../../src/App.css";
import { Layout } from "antd";
import { Menu } from "antd";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import {
  ClockCircleOutlined,
  DeleteOutlined,
  CheckOutlined,
  UserOutlined,
  CloudFilled,
} from "@ant-design/icons";
import SideMinue from "./SideMinue";
import ProfileContent from "./ProfileInfo";
import ProfileInfo from "./ProfileInfo";
import UpComAppoints from "./UpComAppoints";
import FinishedAppoints from "./FinishedAppoints";
import Trash from "./Trash";

const { Content, Sider } = Layout;

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showProfile: true,
      showUpcoming: false,
      showCompleted: false,
      showTrash: false,
      email:this.props.auth,
      trash : []


    };
  }

  show = (e) => {
    console.log(e.key);
    if (e.key == 1) {
      this.setState({ showProfile: true });
      this.setState({ showUpcoming: false });
      this.setState({ showCompleted: false });
      this.setState({ showTrash: false });
      console.log(this.state.showProfile);
    } else if (e.key == 2) {
      this.setState({ showProfile: false });
      this.setState({ showUpcoming: true });
      this.setState({ showCompleted: false });
      this.setState({ showTrash: false });
      console.log(this.state.showUpcoming);
    } else if (e.key == 3) {
      this.setState({ showProfile: false });
      this.setState({ showUpcoming: false });
      this.setState({ showCompleted: true });
      this.setState({ showTrash: false });
      console.log(this.state.showCompleted);
    } else if (e.key == 4) {
      this.setState({ showProfile: false });
      this.setState({ showUpcoming: false });
      this.setState({ showCompleted: false });
      this.setState({ showTrash: true });
      console.log(this.state.showTrash);
    } else {
      console.log(e);
    }
  };

  

  handleClick = (e) => {
    console.log("click ", e);
  };

  render() {
    console.log("infooooooo",this.state.email)
    return (
      <div class="curved-div">
        <h1>Profile</h1>
        <p>The place where all your tech issues will disappear!</p>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#fff"
            fill-opacity="1"
            d="M0,64L80,58.7C160,53,320,43,480,74.7C640,107,800,181,960,197.3C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>
        <Layout>
          <Content style={{ padding: "0 50px" }}>
            <Layout
              className="site-layout-background"
              style={{ padding: "24px 0" }}
            >
              <Sider className="site-layout-background" width={200}>
                <Layout>
                  <Sider
                    theme="light"
                    style={{
                      overflow: "auto",
                      height: "100vwh",
                      width:300,
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      left: 0,
                      padding: 0,
                    }}
                  >
                <div className ='sideMinue'>

                    <Menu
                      onClick={this.handleClick}
                    //   style={{ width: 260}}
                      defaultSelectedKeys={["1"]}
                      mode="inline"
                    >
                      <Menu.Item
                        key="1"
                        icon={<UserOutlined />}
                        onClick={this.show}
                      >
                         Information{" "}
                      </Menu.Item>

                      <Menu.Item
                        key="2"
                        icon={<ClockCircleOutlined />}
                        onClick={this.show}
                      >
                        Upcoming 
                      </Menu.Item>
                      <Menu.Item
                        key="3"
                        icon={<CheckOutlined />}
                        onClick={this.show}
                      >
                        Completed 
                      </Menu.Item>

                      <Menu.Item
                        key="4"
                        icon={<DeleteOutlined />}
                        onClick={this.show}
                      >
                        Trash
                      </Menu.Item>
                    </Menu>
                    </div>
                  </Sider>
                </Layout>
              </Sider>
              <Content style={{ padding: "0 24px", minHeight: 280 }}>
                {this.state.showProfile ? <ProfileInfo /> : null}
                {this.state.showUpcoming ? <UpComAppoints trash = {this.state.trash}/> : null}
                {this.state.showCompleted ? <FinishedAppoints /> : null}
                {this.state.showTrash ? <Trash trash = {this.state.trash}/> : null}
              </Content>
            </Layout>
          </Content>
        </Layout>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    );
  }
}
export default Profile;
