/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Loading from '../../component/Loading';

import '../../../css/home/ConfirmOrder';

export default class ConfirmOrder extends React.Component {
	constructor(props) {
		super(props);
		
		let {miId, price, appointmentTime} = this.props.location.query;
		
		if(!appointmentTime){
			appointmentTime = "";
		}
		
		this.state = {
            loading: true,
			miId: miId,

			storeInfo: {
				"miAddress": "门店地址",
				"miCloseDate": "21：30",
				"miFloatPrice": 32, //浮动价格，该价格在下午5点半后启用
				"miId": 1,
				"miMap1": "门店介绍图1",
				"miMap2": "门店介绍图2",
				"miMap3": "门店介绍图3",
				"miMap4": "门店介绍图4",
				"miName": "门店名称",
				"miOpenDate": "00：00",
				"miPrice": 30, //基础价格
				"miShowMap": "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
				"miStatus": 1,
			},
			
			appointmentTime: appointmentTime,
			price: price,
		}
		
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("用户结算");

		this.getStoreDetail();
	}

    //获取店铺详情内容
    getStoreDetail(){
        let ConfirmOrder = this;

        fetch(windowExtend.API.getUrl("/mecinfo/getmec.do?miId=" + this.state.miId), {
            method: 'get',
        }).then(function (response) {
            return response.json()
        }).then(function(res){

            if(res.code == 0){

                ConfirmOrder.setState({
                    storeInfo: res,
                    loading: false,
                })

            }
        })
    }
	
    //生成订单
	createOrder(openid, orderno){

        let form = new FormData();
        form.append("openid", openid);
        form.append("miId", this.state.miId);
        form.append("ordPayment", this.state.price);
        form.append("ordTotal", this.state.price);
        form.append("bespeakDate", this.state.appointmentTime);
        form.append("ordFav", 0);
        form.append("ordPayType", 1);
        form.append("orderno", orderno);
        form.append("miName", this.state.storeInfo.miName);
		form.append("miAddress", this.state.storeInfo.miAddress);

		fetch(windowExtend.API.getUrl("/ord/saveorder.do?"), {
			method: 'post',
            body: form,
		}).then(function (response) {
			return response.json()
		}).then(function(res){
			
			alert("支付成功！")
            history.replace("/order");
		}).catch(function(e){
			alert("支付失败！")
		})
	}
	
    //调起微信支付  //oq5Eut0Cz1CjR7KfqtyXFN4x8bUw
	callPay(){
		let ConfirmOrder = this;
		
        function onBridgeReady(){
	
	        let info = windowExtend.helper.getUserInfo();
	        if(!info){
		        alert("没有用户信息");
		        return;
	        }

            let form = new FormData();
            form.append("miId", ConfirmOrder.state.miId);
            form.append("ordPayment", ConfirmOrder.state.price);
            form.append("openid", info.openid);

            fetch(windowExtend.API.getUrl("/ord/placeorder.do?"), {
                method: 'post',
                body: form,
            }).then(function (response) {
                return response.json()
            }).then(function(res){

                let req = {
                    "debug": true,
                    "appId" : res.appid,     //公众号名称，由商户传入
                    "timeStamp": "" + res.timestamp,         //时间戳，自1970年以来的秒数
                    "nonceStr" : res.noncestr, //随机串
                    "package" : "prepay_id=" + res.prepayid,
                    "signType" : res.signtype,         //微信签名方式：
                    "paySign" : res.paysign //微信签名
                }

                WeixinJSBridge.invoke(
                    'getBrandWCPayRequest', req,
                    function(response){
                        if(response.err_msg == "get_brand_wcpay_request:ok" ) {
                            ConfirmOrder.createOrder(info.openid, res.orderno)
                        }else{
                            alert("取消支付");
                        }
                    }
                );

            }).catch(function(e){
                
            })
        }


        if (typeof WeixinJSBridge == "undefined"){
            if( document.addEventListener ){
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
            }else if (document.attachEvent){
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
            }
        }else{
            onBridgeReady();
        }

	}
	
	render() {
		
		let appointmentTime = "无限制";
		if(!!this.state.appointmentTime){
			appointmentTime = this.state.appointmentTime;
		}
		
		return <div className="component-confirm-order">
			<div className="page-content">
				
				<div className="store-name-bar">
					{this.state.storeInfo.miName}
				</div>
				
				<div className="appointment-info">
					<img className="store-img" src={this.state.storeInfo.miMap1}/>
					
					<div className="detail">
						<p>预约时段:{appointmentTime}</p>
						<p>等待人数:{0}</p>
						<p>预计等待:{0}分钟</p>
					</div>
				</div>
				
				<div className="gap"></div>
				
				<div className="pay-type">
					<span className="pay-label">支付方式</span>
					<span className="type-name">微信支付</span>
				</div>
				
				<div className="gap"></div>
				
				<div className="store-local">
					<span className="local-label">门店地址</span>
					
					<div className="local-info">
						<p className="item">
							{this.state.storeInfo.miAddress}
						</p>
						
						<p className="item">
							营业时间: {this.state.storeInfo.miOpenDate} - {this.state.storeInfo.miCloseDate}
						</p>
					</div>
				</div>
			</div>
			
			<div className="bottom-bar">
				<span className="money">合计{this.state.price}元</span>
				<span className="order-btn" onClick={this.callPay.bind(this)}>立即支付</span>
			</div>

            <Loading loading={this.state.loading}/>
		</div>
	}
}