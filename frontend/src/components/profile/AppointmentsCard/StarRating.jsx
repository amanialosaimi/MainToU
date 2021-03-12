// import React, { Component } from 'react'
// import { Modal, Button,Rate  } from "antd";
// import {StarOutlined} from "@ant-design/icons";
// import {rate} from '../../API/Api';

// export default class StarRating extends Component  {
//   state = {
//     loading: false,
//     visible: false,
//     value: 0,
//   };
//   handleChange = value => {
//     this.setState({ value });
//     //console.log(value)
//   };

//   showModal = () => {
//     this.setState({
//       visible: true,
//     });
//   };

//   handleOk = () => {
//     this.setState({ loading: true });
//     setTimeout(() => {
//       this.setState({ loading: false, visible: false });
//     }, 3000);
//     this.rating()
//   };

//   rating = () =>{
//     //console.log(this.state.value)
//     let info = {rate:this.state.value}
//     rate(info)
//     .then((response) => {
//     })
//     .catch((error) => {
//       console.log("API ERROR:", error);
//     });
    
//   }
//   handleCancel = () => {
//     this.setState({ visible: false });
//   };

//   render() {
//     const { visible, loading, value } = this.state;
//     return (
//       <>
       
// <StarOutlined onClick={this.showModal}>
//    </StarOutlined>
//         <Modal
//           visible={visible}
//           title="Rating"
//           onOk={this.handleOk}
//           onCancel={this.handleCancel}
//           footer={[
//             <Button key="back" onClick={this.handleCancel}>
//               Return
//             </Button>,
//             <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
//               Submit
//             </Button>,
//           ]}
//         >
//          <Rate onChange={this.handleChange} value={value} />
//         </Modal>
//       </>
//     );
//   }
// }

import React, { Component } from 'react'
import { Modal, Button,Rate  } from "antd";
import {StarOutlined} from "@ant-design/icons";
import {rate} from '../../API/Api';

export default class StarRating extends Component  {
  state = {
    loading: false,
    visible: false,
    value: 0,
  };
  handleChange = value => {
    this.setState({ value });
    console.log("handleChange",value)
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
    console.log("showModal")
  };
  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
    this.rating()
  };
  rating = () =>{
    console.log(this.props.item._id)
    let id=this.props.item._id
    let info = {rate:this.state.value}
    console.log(this.state.value)
    console.log(info)
    rate(info,id)
    .then((response) => {
      console.log("response",response.data)
    })
    .catch((error) => {
      console.log("API ERROR:", error);
    });

    console.log(this.props.item.rate)

  }
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
   
    const { visible, loading, value } = this.state;
    return (
      <>
<StarOutlined onClick={this.showModal}>
   </StarOutlined>
        <Modal
          visible={visible}
          title="Rating"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
         <Rate onChange={this.handleChange} value={value} />
        </Modal>
      </>
    );
  }
}
