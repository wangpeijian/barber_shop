/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import {Link} from 'react-router';

import '../../../css/home/StoreListItem';

export default class StoreListItem extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
		}
		
	}
	
	static defaultProps = {
	    data: {
            miId: "id",
            miStatus: 0,  //  0：失效（关店）1：正常 2：装修中 3：即将开业
            miName: "名称",
            miAddress: "地址",
            miMap1: "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
		    metres: 0,
        },
	}
	
	//页面加载完毕
	componentDidMount() {
		
	}
	
	getStatusInfo(){
		let statusMark = "";
		let statusInfo = "";
		
		switch(~~this.props.data.miStatus){
			case 0:
				statusMark = <span className="status-mark unable">暂停营业</span>;
				statusInfo = <span className="status-info unable">商家已打烊</span>;
				break;
			
			case 1:
				statusMark = <span className="status-mark able">营业中</span>;
				statusInfo = <span className="status-info able">商家营业中</span>;
				break;
			
			case 2:
				statusMark = <span className="status-mark unable">装修中</span>;
				statusInfo = <span className="status-info unable">商家装修中</span>;
				break;
			
			case 3:
				statusMark = <span className="status-mark unable">即将开业</span>;
				statusInfo = <span className="status-info unable">商家即将开业</span>;
				break;
		}
		
		return {
			statusMark: statusMark,
			statusInfo: statusInfo,
		}
	}
	
	getDistanceInfo(){
		if(this.props.data.metres == 0){
			return "未知";
		}else {
			
			if(this.props.data.metres >= 1000){
				return (this.props.data.metres / 1000).toFixed(1) + "KM";
			}else {
				return this.props.data.metres + "M";
			}
			
		}
	}
	
	render() {
		let {statusMark, statusInfo} = this.getStatusInfo();
		
		return <Link to={{pathname: "/storedetail" , query: {miId: this.props.data.miId}}}>
					<div className="component-store-list-item">
						{statusMark}
						<img className="image" src={this.props.data.miMap1}/>
						<div className="detail-info">
							<p className="name">
								{this.props.data.miName}
								
								<span className="distance">
									{this.getDistanceInfo()}
								</span>
							</p>
							<p className="local">{this.props.data.miAddress}</p>
							{statusInfo}
						</div>
					</div>
				</Link>
	}
}