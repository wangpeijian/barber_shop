/**
 * Created by admin on 2016/12/6.
 */
import React from 'react';

import QRCode from 'qrcode.react';
import Loading from '../../component/Loading';

import '../../../css/push/Wait';

export default class Wait extends React.Component {
	constructor(props) {
		super(props);
		
		let {miId} = this.props.location.query;
		
		this.state = {
			loading: true,
			miId: miId,
			
			storeInfo: {
				"miAddress": "门店地址门店地址门店地址门店地址门店地址",
				miStationInfo: "店铺交通信息",
				"miCloseDate": "21：30",
				"miFloatPrice": 99, //浮动价格，该价格在下午5点半后启用
				"miId": 1,
				miLatitude: 0,
				miLongitude: 0,
				"miMap1": "门店介绍图1",
				"miMap2": "门店介绍图2",
				"miMap3": "门店介绍图3",
				"miMap4": "门店介绍图4",
				"miName": "门店名称门店名称门店名称",
				"miOpenDate": "00：00",
				"miPrice": 30, //基础价格
				"miShowMap": "",    //第一分页展示图片
				"miServiceMap": "", //第二分页展示图片
				"miStatus": 1,
			},
			
			price: 0,
			
			time: 0,
		}
		
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("");
		this.getStoreDetail();
		this.clockStart();
	}
	
	clockStart(){
		setInterval(()=>{
			
			let data = new Date();
			let price = this.state.storeInfo.miPrice;
			let selectTime = data.Format("hhmm");
			if(selectTime >= 1730){
				price = this.state.storeInfo.miFloatPrice;
			}
			
			this.setState({
				time: data.Format("hh:mm:ss"),
				price: price,
			})
			
		}, 1000)
	}
	
	//获取店铺详情内容
	getStoreDetail(){
		let Wait = this;
		
		fetch(windowExtend.API.getUrl("/mecinfo/getmec.do?miId=" + this.state.miId), {
			method: 'get',
		}).then(function (response) {
			return response.json()
		}).then(function(res){
			
			if(res.code == 0){
				Wait.setState({
					storeInfo: res,
					loading: false,
				})
				
			}
		})
	}
	
	getMoney(index){
		let price = this.state.price + "";
		
		let array = price.split(".");
		
		if(array.length == 1){
			array[1] = 0;
		}
		
		return array[index];
	}
	
	getQRCodeUrl(){
		//return location.href.replace(location.hash, `#/confirmorder?miId=${this.state.miId}&price=${this.state.price}`);
		
		let uri = windowExtend.API.getUrl("/ord/scanpay.do") + `?miId=${this.state.miId}`;  //&ordPayment=${this.state.price}&miAddress=${this.state.storeInfo.miAddress}&miName=${this.state.storeInfo.miName}
		uri = encodeURIComponent(uri);
		
		return `https://open.weixin.qq.com/connect/oauth2/authorize?&appid=wx60dafb3d36defc3e&redirect_uri=${uri}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
	}
	
	render() {
		
		return <div className="page-wait">
			<div className="top-bar">
				<span className="store-name">{this.state.storeInfo.miName}</span>
				<span className="logo">Musketeer</span>
				<span className="clock">{this.state.time}</span>
			</div>
			
			{/*<div className="service-info">
				<div className="item">
					<p className="top">排队号码</p>
					<p className="center">A201</p>
					<p className="bottom">号</p>
				</div>
				<div className="item with-line">
					<p className="top">预计等候约</p>
					 <p className="center">0</p>
					 <p className="bottom">分钟</p>
				</div>
				<div className="item">
					<p className="top">等候人数</p>
					 <p className="center">0</p>
					 <p className="bottom">人</p>
				</div>
			</div>*/}
			
			<div className="money">
				<span className="unit">￥</span>
				<span className="first">{this.getMoney(0)}</span>
				<span className="last">.{this.getMoney(1)}</span>
			</div>
			
			<div className="qrcode">
				<div className="left">
					<p>扫一扫完成支付</p>
					<QRCode value={this.getQRCodeUrl()} />
					<p>支持微信支付</p>
				</div>
				
				<div className="right">
					<p>关注微信公众号可</p>
					<div className="weichat-QRCode"></div>
					<p>免费获得预约功能</p>
				</div>
			</div>
			
			<div className="footer">
				营业时间: {this.state.storeInfo.miOpenDate} - {this.state.storeInfo.miCloseDate}
			</div>
			
			<Loading loading={this.state.loading}/>
		</div>
	}
}