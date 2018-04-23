/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';

import QRCode from 'qrcode.react';
import Loading from '../../component/Loading';

import '../../../css/push/Voucher';

export default class Voucher extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			loading: true,
		}
		
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("订单信息");
	}
	
	refresh(){
		this.setState({
			loading: true,
		})
	}
	
	render() {
		
		return <div className="page-voucher">
			<div className="top-bar">
				<span className="store-name">未来店</span>
				
				<span className="refresh-btn" onClick={this.refresh.bind(this)}>刷新</span>
			</div>
			
			<div className="service-info">
				<div className="item">
					<p className="top">排队号码</p>
					<p className="center">A201</p>
					<p className="bottom">号</p>
				</div>
				<div className="item with-line">
					{/*<p className="top">预计等候约</p>
					<p className="center">0</p>
					<p className="bottom">分钟</p>*/}
				</div>
				<div className="item">
					{/*<p className="top">等候人数</p>
					<p className="center">0</p>
					<p className="bottom">人</p>*/}
				</div>
			</div>
			
			<div className="qrcode">
				<QRCode value={"123123"} />
			</div>
			
			<div className="order-info">
				<p>下单时间: 2016.11.11 08:09</p>
				<p>支付方式: 微信公众平台支付</p>
				{/*<p>验票码: 3123</p>*/}
				<p className="mark">服务时请向发型设计师出示此二维码</p>
				<p>请耐心等待，等待叫号</p>
			</div>
			
			<Loading loading={this.state.loading}/>
		</div>
	}
}