import { Table, Row, Divider } from "antd";
import React, {  Component } from "react";
const columns = [
  {
    title: "Appointments",
    dataIndex: "title",
  },
  {
    title: "Date",
    dataIndex: "date",
    sorter: {
      compare: (a, b) => a.math - b.math,
      multiple: 2,
    },
  },
];
class Trash extends Component {
  constructor(props) {
    super(props);
    console.log('TR',props.trash)
    this.state = {
      appointments:this.props.array
    };
  }
  
render (){
  console.log("delete11111",this.props.array)
 
  return (
    <div>
      <Row>
        <Divider>
          <h2>Trash</h2>
        </Divider>
      </Row>
      <div>
      <Table
          className="TMtable"
          size="middle"
          style={{textAlign:"center"}}
           columns={columns}
           dataSource={this.props.trash}
        />
      </div>
    </div>
  );
}
}

export default Trash;
