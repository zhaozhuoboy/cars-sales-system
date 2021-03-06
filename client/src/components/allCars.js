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
      tiaoshu:0,//所有的数据条数
      allCarData:[],
      loadData:true,
      pageSize:10,//显示几条
      current:1
    }
  }
  onChange(page){
    axios.post(`${SiteConfig.host}/getallcars`,{
      pageNum:page,
      pageSize:this.state.pageSize
    }).then((res)=>{
      this.setState({
        tiaoshu:res.data.tiaoshu,
        allCarData:res.data.cars,
        loadData:false
      })
    })
    this.setState({
      current: page
    });
  }
//分页功能，初始化时 将 第1页  1  和显示条数  10  提交到后台，
//后台查询  跳过 1*10-10 之后的10条 skip(pageNum*pageSize-pageSize).limit(10)
  componentWillMount(){
    axios.post(`${SiteConfig.host}/getallcars`,{
      pageNum:this.state.current,
      pageSize:this.state.pageSize
    }).then((res)=>{
      console.log(res.data);
      this.setState({
        tiaoshu:res.data.tiaoshu,
        allCarData:res.data.cars,
        loadData:false
      })
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
          <table style={{width:"100%",
    }}>
            <thead>
              <tr style={{fontSize:"16px",background:"#eee"}}>
                <th style={{width:"200px", padding: '8px'}}>汽车名称</th>
                <th style={{width:"100px",padding: '8px'}}>库存</th>
                <th style={{width:"200px",padding: '8px'}}>价格</th>
                <th style={{width:"200px",padding: '8px'}}>负责人</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              {this.state.loadData ? null :allcars}
            </tbody>
          </table>
          {/*分页器*/}
          <Pagination
            style={{float:"right",marginTop:"10px"}}
            current={this.state.current}
            defaultCurrent={1}
            showQuickJumper
            onChange={this.onChange.bind(this)} total={this.state.tiaoshu} />
        </div>


      </div>
    )
  }
}

export default AllCars;
