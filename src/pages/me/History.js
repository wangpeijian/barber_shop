/**
 * Created by peijian.wang on 2016/11/26.
 */
import React from 'react';

import Loading from '../../component/Loading';
import HistoryListItem from './HistoryListItem';

import '../../../css/me/History';

export default class History extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			historyList: [],
			
			loading: true,
		}
		
	}
	
	static defaultProps = {
		
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("历史评价");
		this.getHistoryData();
	}
	
	getHistoryData(){
		let History = this;
		
		let info = windowExtend.helper.getUserInfo();
		if(!info){
			return;
		}
		
		fetch(windowExtend.API.getUrl(`/eva/history.do?openid=${info.openid}`), {
			method: 'get',
		}).then(function (response) {
			return response.json()
		}).then(function(res){
			
			if(res.code == 0){
				History.setState({
					historyList: res.data,
					loading: false,
				})
			}
			
		})
	}
	
	getHisToryList(){
		let array = [];
		
		for(let i in this.state.historyList){
			let item = this.state.historyList[i];
			
			array.push(
				<HistoryListItem data={item}  key={i}/>
			)
		}
		
		if(array.length == 0){
			array.push(
				<div key={0} className="empty-history-list">
					<span className="empty-img"></span>
					<p className="empty-tip">暂无数据</p>
				</div>
			);
		}
		
		return array;
	}
	
	render() {
		
		return <div className="page-history">
			
			{this.getHisToryList()}
			
			<Loading loading={this.state.loading}/>
			</div>
	}
}