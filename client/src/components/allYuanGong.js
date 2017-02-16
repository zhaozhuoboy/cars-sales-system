import React, { PropTypes } from 'react';
import { Table, Icon ,Button} from 'antd';
import { Link } from 'react-router';
import AddYuanGong from './addYuanGong';

class AllYuanGong extends React.Component {
  onhandleClick(e,text){
    console.log(text)
  }
  render () {

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      render: text => <a href="#">{text}</a>,
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <Link href="/">修改</Link>
          <span className="ant-divider" />
          <Button>删除</Button>
          <span className="ant-divider" />

        </span>
      ),
    }];

    const data = [{
      key: '1',
      name: 'John Brown',
      username: 'zhaozhuoboy',
      password: 'aaaapasorrk',
    }, {
      key: '2',
      name: 'Jim Green',
      username: 'zhaozhuoboy',
      password: 'aaaapasor',
    }, {
      key: '3',
      name: 'Joe Black',
      username: 'zhaozhuoboy',
      password: 'aaaapasor',
    }];
    return(
      <div>
      <AddYuanGong />
        <Table columns={columns} dataSource={data} onCellClick={this.onhandleClick.bind(this)}/>
      </div>
    )
  }
}

export default AllYuanGong;
