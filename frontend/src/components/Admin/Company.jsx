import React, { useEffect ,useState } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography , Space , Button} from 'antd';
import Highlighter from 'react-highlight-words';
import { EditOutlined , DeleteOutlined  , SearchOutlined} from "@ant-design/icons";
import NewCompany from "./NewCompany";
import { getAllmintsCompany , deleteCompany , editCompany } from "../API/Api";

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};



const Company = () => {
  
  let [searchText,setSearchText] = useState('');
  let [ searchedColumn,setSearchedColumn] = useState('');

  const getColumnSearchProps = dataIndex => ({
     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchText = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchText.select(), 100);
      }
    },
    render: text =>
        searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
      setSearchText(selectedKeys[0])
      setSearchedColumn(dataIndex)
    
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('') 
    
  };

  const [form] = Form.useForm();
  const [data, setData] = useState("");

//*******====================== */
//  useEffect(()=>{
 getAllmintsCompany()
  .then((response) => {
    setData(response.data)
  })
  .catch((error) => {
    console.log("API ERROR:", error);
  });
// } ,[]);


  // ****** delete company
  const handleDelete = (key) => {
    
    const dataSource = [...data];
    setData( dataSource.filter((item) => item._id !== key))
    console.log("hiiii",key)

    deleteCompany(key)
    .then((response) => {
      console.log("Deleted Succcfully !!!!!!!!",response)
    })
    .catch((error) => {
      console.log("API ERROR:", error);
    });

  };

  // ****** Edit company
  const [editingKey, setEditingKey] = useState('');

  const isEditing = (record) => record._id === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      companyName: '',
      email: '',
      phoneNumber: '',
      description:'',
      ...record,
    });
    setEditingKey(record._id);
    console.log(record)
    console.log(record._id)
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item._id);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        console.log("item",newData[index])
        console.log("item",newData[index]._id)
        editCompany(newData[index],newData[index]._id)
        .then((response) => {
          console.log("Updated Succcfully !!!!!!!!",response)
  
        })
        .catch((error) => {
          console.log("API ERROR:", error);
        });
    
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'companyName',
      width: '25%',
      editable: true,
      ...getColumnSearchProps('companyName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      width: '15%',
      editable: true,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      width: '40%',
      editable: true,
      ...getColumnSearchProps('FullName'),
    },
    {
      title: 'Update',
      dataIndex: 'Update',
      
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record._id)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        
        ) : (
          <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
            <EditOutlined className="edit"/>
          </Typography.Link>
          

        );
      },
  },
  {
    title: 'Delete',
    dataIndex: 'Delete',
    width: '10%',
    render: (_, record) =>
      data.length >= 1 ? (
        <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record._id)}>
          <a><DeleteOutlined className="edit"/></a>
        </Popconfirm >
      ) : null,
  },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        // inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
        
      }),
    };
  });

  return (
    // <div className="TMtable">
    <Form form={form} component={false}>
      <h2>Maintenance Companies</h2>
      <NewCompany rowClassName ='addBtn' />
      <Table 
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        // bordered
        dataSource={data}
        columns={mergedColumns}
        className="TMtable"
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    // </div>
  );
};



export default Company;