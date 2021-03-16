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
let data = [
]
if(localStorage.getItem('trash title')== null){
  data.push('')
}
else{
  data.pop()
  let title1 =localStorage.getItem('trash title').split(' ')
  let  date1 = localStorage.getItem('trash date').split(' ')
  title1.map((item,i)=>{
    data.push({
      title:item,
      date : date1[i]
    })
  })
  console.log(title1[0])
  console.log(title1[1])
  }
class Trash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      appointments:this.props.array,
      };
  }
render (){
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
           dataSource={data}
        />
      </div>
    </div>
  );
}
}
export default Trash;