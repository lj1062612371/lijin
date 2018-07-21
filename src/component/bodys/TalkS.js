import React from 'react';
import '../../static/TalkS.css';
import axios from 'axios';
import qs from 'qs';

import{
  // BrowserRouter as Router,
  // Route,
  Link
}from 'react-router-dom'

class TalkS extends React.Component {

  constructor(props){
    super(props);
    this.state={
      arrPL:[],
      page:1
    }
  }

  render(){
    return(
      <div className="Talks">
        <div className="Theads">
          <Link to={'/Mains'}>👈</Link>
          司机之家
        </div>
        <div className="Tbodys">
          {
            this.state.arrPL.map((vals,index)=>{
              return(
                <ul key={index}>
                  <li>
                    <img src="http://localhost:3000/Ama.jpg"/>
                    <span>某司机</span>
                  </li>
                  <li>{vals.content}</li>
                </ul>
              )
            })
          }
        </div>
        <div className="TFoots">
          <input type="text" ref="PLun" placeholder="请评论"/>
          <button onClick={this.plBtn.bind(this)}>评论</button>
        </div>
      </div>
    )
  }

  //渲染数据
  componentDidMount(){

    console.log(this.props.match.params.id)

    const urlp = 'http://guoxiao158.top/joke/getpl.php?id='+this.props.match.params.id;

    axios.get(urlp).then(res=>{
      console.log(res.data.dataList);
      this.setState({
        arrPL:res.data.dataList
      })
    })

  }

  //添加评论
  plBtn(){

    // console.log(this.refs.PLun.value);
    let ids = this.props.match.params.id;
    let plInput = this.refs.PLun.value;
    const urls = 'http://guoxiao158.top/joke/addpl.php';

    const data = {
      uid:ids,
      pinglun:plInput
    }

    axios.post(urls,qs.stringify(data)).then(res=>{
      console.log(res);
      this.componentDidMount();
    })

    this.refs.PLun.value = '';


  }

}

export default TalkS;