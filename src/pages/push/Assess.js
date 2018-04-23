/**
 * Created by admin on 2016/11/20.
 */
import React from 'react';

import createHistory from 'history/createHashHistory';
const history = createHistory();

import Stars from '../../component/Stars';
import Loading from '../../component/Loading';

import '../../../css/push/Assess';

export default class Assess extends React.Component {
	constructor(props) {
		super(props);
		
		let {ordId, miId, openId} = this.props.location.query;
		
		this.state = {
			star: [0, 0, 0],
			
			loading: true,
			
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
			
			words: 0,
			
			ordId: ordId,
			miId: miId,
			openId: openId,
		}
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("推送-服务评价");
		
		this.getStroeData();
	}
	
	getStroeData(){
		let Assess = this;
		
		fetch(windowExtend.API.getUrl("/mecinfo/getmec.do?miId=" + this.state.miId), {
			method: 'get',
		}).then(function (response) {
			return response.json()
		}).then(function(res){
			
			if(res.code == 0){
				Assess.setState({
					storeInfo: res,
					loading: false,
				})
				
			}
		})
	}
	
	markWords(){
		this.setState({
			words: this.refs.opinion.value.length,
		})
	}
	
	setStars(type, index){
		let star = this.state.star;
		star[type] = index;
		
		this.setState({
			star: star,
		})
	}
	
	submit(){
		let error = false;
		for(let i in this.state.star){
			if(this.state.star[i] == 0){
				
				if(i == 0){
					error = "请对服务评价";
					break;
				}else if(i == 1){
					error = "请对环境评价";
					break;
				}else if(i == 2){
					error = "请对卫生评价";
					break;
				}
			}
		}
		
		if(error){
			alert(error);
			return;
		}
		
		if(this.state.loading){
			return false;
		}
		
		this.setState({
			loading: true,
		});
		
		let Assess = this;
		
		let form = new FormData();
		form.append("evaContent", this.refs.opinion.value);
		form.append("evaService", this.state.star[0]);
		form.append("evaEnvir", this.state.star[1]);
		form.append("evaHealth", this.state.star[2]);
		form.append("miId", this.state.miId);
		form.append("openId", this.state.openId);
		form.append("wechatOrdId", this.state.ordId);
		
		fetch(windowExtend.API.getUrl("/eva/saveevaluate.do?"), {
			method: 'post',
			body: form,
		}).then(function (response) {
			return response.json()
		}).then(function(res){
			Assess.setState({
				loading: false,
			}, ()=>{
				alert("提交成功！");
				history.go(-1);
			});
		})
	}
	
	render() {
		
		return <div className="page-assess">
		
			<div className="page-content">
				<div className="page-title">
					服务评价
				</div>
				
				<div className="store-info">
					<img className="store-img" src={this.state.storeInfo.miMap1}/>
					
					<div className="detail">
						<p className="store-name">{this.state.storeInfo.miName}</p>
						<p className="store-slogan">没有什么烦恼是剃头解决不了的，如果有那就剃光头</p>
					</div>
				</div>
				
				<textarea maxLength="140"
				          className="opinion"
				          ref="opinion"
				          placeholder="点击输入..."
				          onChange={this.markWords.bind(this)}
				></textarea>
				<div className="count-bar">
					<span>已输入{this.state.words}字</span>
				</div>
				
				<div className="value-block">
					<div className="type-line">
					<span className="label">
						服务
					</span>
						
						<div className="value">
							<Stars notice={this.setStars.bind(this, 0)} />
						</div>
					</div>
					
					<div className="type-line">
					<span className="label">
						环境
					</span>
						
						<div className="value">
							<Stars notice={this.setStars.bind(this, 1)} />
						</div>
					</div>
					
					<div className="type-line">
					<span className="label">
						卫生
					</span>
						
						<div className="value">
							<Stars notice={this.setStars.bind(this, 2)} />
						</div>
					</div>
				</div>
				
				{/*<input type="phone" className="phone" ref="phone" placeholder="请留下您的电话号码，方便我们更好地为您服务"/>*/}
			</div>
			
			<div className="footer-bar">
				<div className="submit-btn" onClick={this.submit.bind(this)}>
					立即评价
				</div>
			</div>
			
			<Loading loading={this.state.loading}/>
		</div>
	}
}