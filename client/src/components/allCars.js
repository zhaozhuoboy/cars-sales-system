import React, { PropTypes } from 'react'
import AddCar from './qicheguanli/addCar'
import CarItem from './qicheguanli/carItem'
import axios from 'axios';
import isEmpty from 'lodash/fp/isEmpty';
import { notification ,Pagination ,Table, Icon  } from 'antd'
import SiteConfig from '../config';

class AllCars extends React.Component {
  constructor(){
    super()
    this.state={
      allCarData:[],//所有的数据
      loadData:true,
      pageSize:10,//显示几条
      pageNum:1
    }
  }
  onChange(page){
    this.setState({
      pageNum: page
    });
  }
//分页功能，初始化时 将 第1页  1  和显示条数  10  提交到后台，
//后台查询  跳过 1*10-10 之后的10条 skip(pageNum*pageSize-pageSize).limit(10)
  componentWillMount(){
    axios.get(`${SiteConfig.host}/getallcars`)
         .then((res)=>{
           this.setState({
             allCarData:res.data.cars,
             loadData:false,
           });
         })

  }
  del(car_id){
    axios.delete(`${SiteConfig.host}/delcar/${car_id}`)
         .then( (res) =>{
           console.log(res.data);
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
    var allcars = this.state.allCarData.map( (item , i) => <CarItem
    key={item._id}
    id={item._id}
    name={item.name}
    carName={item.carName}
    carStock={item.carStock}
    carPrice={item.carPrice}
    del={this.del.bind(this)}
    /> );
    return(
      <div>
        <AddCar loadnew={this.componentWillMount.bind(this)}/>
        <div className='all-cars-container'>
          <table style={{width:"100%"}}>
            <thead>
              <tr style={{fontSize:"16px",background:"#eee"}}>
                <th style={{width:"200px"}}>汽车名称</th>
                <th style={{width:"100px"}}>库存</th>
                <th style={{width:"200px"}}>价格</th>
                <th style={{width:"200px"}}>负责人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.loadData ? '暂无数据':allcars}
            </tbody>
          </table>
        </div>
        <Pagination current={this.state.current}
            defaultCurrent={1}
           onChange={this.onChange.bind(this)} total={this.state.allCarData.length} />

      </div>
    )
  }
}

export default AllCars;