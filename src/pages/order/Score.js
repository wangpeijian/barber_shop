/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Stars from '../../component/Stars';
import Loading from '../../component/Loading';

import '../../../css/order/Score';

export default class Score extends React.Component {
	constructor(props) {
		super(props);
		
		let {ordId} = this.props.location.query;
		
		this.state = {
			star : 0,
			
			loading: false,
			
			ordId: ordId,
			
			storeInfo: {
				"miAddress": "门店地址",
				"miCloseDate": "21：30",
				"miFloatPrice": 32, //浮动价格，该价格在下午5点半后启用
				"miId": 1,
				"miMap1": "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
				"miMap2": "门店介绍图2",
				"miMap3": "门店介绍图3",
				"miMap4": "门店介绍图4",
				"miName": "门店名称",
				"miOpenDate": "00：00",
				"miPrice": 30, //基础价格
				"miShowMap": "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
				"miStatus": 1,
			},
		}
		
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("订单评价");
	}
	
	setStars(star){
		this.setState({
			star: star,
		})
	}
	
	goBack(){
		history.go(-1)
	}
	
	submit(){
		
		if(this.state.loading){
			return false;
		}
		
		this.setState({
			loading: true,
		})
		
		let req = {
			star: this.state.star,
			option: this.refs.opinion.value,
			phone: this.refs.phone.value,
		}
		
		
		console.log(req);
		
		history.go(-1)
	}
	
	render() {
		
		return <div className="page-score">

            <div className="page-content">
				<div className="store-info">
					<img className="store-img" src={this.state.storeInfo.miMap1}/>
					
					<div className="detail">
						<p className="store-name">{this.state.storeInfo.miName}</p>
						<p className="store-slogan">将头发剪成帅气摸样，因为余生想要配得上你的漂亮</p>
					</div>
				</div>
	            
	            <div className="form-title">
		            <span className="title">匿名评价</span>
	            </div>
	            
	            <Stars notice={this.setStars.bind(this)} />
	            
	            <textarea maxLength="140" className="opinion" ref="opinion" placeholder="其他意见和建议（内容匿名，可放心填写）"></textarea>
	            
	            <input type="phone" className="phone" ref="phone" placeholder="请留下您的电话号码，方便我们更好地为您服务"/>
		            
            </div>

            <div className="footer-bar">
                <div className="cancel-btn" onClick={this.goBack.bind(this)}>取消</div>
                <div className="submit-btn" onClick={this.submit.bind(this)}>确定</div>
            </div>
			
			<Loading loading={this.state.loading}/>
		</div>
	}
}