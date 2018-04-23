/**
 * Created by admin on 2016/11/16.
 */

import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

/*安装polyfill*/
import "babel-polyfill";

//全局安装promise
import {install} from 'promise-es6'
install();

/*生成全局函数的方法*/
import WindowExtend from './public/WindowExtend';
window.windowExtend = new WindowExtend();

class App extends React.Component{

    constructor(props) {
        super(props);

        let {user_id} = this.props.location.query;

        fetch(windowExtend.API.getUrl("/wechat/info.do?user_id=" + user_id), {
            method: 'get',
        }).then(function (response) {
            return response.json()
        }).then(function(res){
            sessionStorage.setItem("userInfo", JSON.stringify(res));
        })
    }
    
	render(){
		
		//隐藏头部菜单栏
		windowExtend.API.callWeixin(
			[
				"hideOptionMenu",
				"openLocation"
			],
			
			function(){
				wx.hideOptionMenu();
			}
		);
    	
		return (<div>
			{this.props.children}
		</div>)
	}
}

import '../css/Index'

import Home from './pages/Home'
import Me from './pages/Me'
import Order from './pages/Order'
import More from './pages/More'

import StoreDetail from './pages/home/StoreDetail'
import ConfirmOrder from './pages/home/ConfirmOrder'

import History from './pages/me/History'

/*import Score from './pages/order/Score'*/

import Voucher from './pages/push/Voucher'
import Assess from './pages/push/Assess'
import Wait from './pages/push/Wait'

try{
	render((
		<Router history={hashHistory}>
			<Route path="/" component={App}>
				<IndexRoute component={Home}/>
				<Route path="order" component={Order}/>
				<Route path="me" component={Me}/>
				<Route path="more" component={More}/>
				
				<Route path="storedetail" component={StoreDetail}/>
				<Route path="confirmorder" component={ConfirmOrder}/>
				
				<Route path="history" component={History}/>
				
				{/*<Route path="score" component={Score}/>*/}
				
				<Route path="voucher" component={Voucher}/>
				<Route path="assess" component={Assess}/>
				<Route path="wait" component={Wait}/>
			</Route>
		</Router>
	),document.getElementById('react'));
}catch (e){
	alert(e);
}







