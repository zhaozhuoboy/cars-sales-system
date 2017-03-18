import React, { PropTypes } from 'react';
import axios from 'axios';
import isEmpty from 'lodash/fp/isEmpty';
import { notification ,Pagination ,Table, Icon  } from 'antd'
import SiteConfig from '../../config';
import NewItem from './NewItem';

class AllNews extends React.Component {
  constructor(){
    super()
    this.state={
      dataLength:0,
      data:[],
      loadData:true,
      pageSize:10,//显示几条
      current:1
    }
  }
  componentWillMount(){
    axios.post(`${SiteConfig.host}/getnews`,{
      pageNum:this.state.current,
      pageSize:this.state.pageSize
    }).then((res)=>{
      console.log(res.data);
      this.setState({
        dataLength:res.data.dataLength,
        data:res.data.news,
        loadData:false
      })
    })
  }
  onChange(page){
    console.log(page);
    axios.post(`${SiteConfig.host}/getnews`,{
      pageNum:page,
      pageSize:this.state.pageSize
    }).then((res)=>{
      this.setState({
        dataLength:res.data.dataLength,
        data:res.data.news,
        loadData:false
      })
    })
    this.setState({
      current: page
    });
  }
  del(news_id){
    axios.delete(`${SiteConfig.host}/deleteNews/${news_id}`)
         .then( (res) =>{
           if(res.status == 200){
             const args = {
               message: '提示：',
               description:"删除成功!",
               duration:2
             };
             notification.info(args);
           }
           this.componentWillMount();
         })
  }
  render () {
    var newList = this.state.data.map( (item , i) => <NewItem
    key={item._id}
    id={item._id}
    title={item.title}
    author={item.author}
    createTime={item.createdAt}
    del={this.del.bind(this)}
    /> );
    return(
      <div>
        <div className='all-news-container'>
          <table style={{width:"100%",
    }}>
            <thead>
              <tr style={{fontSize:"16px",background:"#eee"}}>
                <th style={{width:"300px",padding: '8px',overflow:"hidden"}}>新闻标题</th>
                <th style={{width:"80px",padding: '8px'}}>发布人</th>
                <th style={{padding: '8px'}}>发布时间</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              { this.state.loadData?null:newList }
            </tbody>
          </table>
          {/*分页器*/}
          <Pagination
            style={{float:"right",marginTop:"10px"}}
            current={this.state.current}
            defaultCurrent={1}
            showQuickJumper
            onChange={this.onChange.bind(this)} total={this.state.dataLength} />
        </div>
      </div>
    )
  }
}

export default AllNews;
