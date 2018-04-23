/**
 * Created by peijian.wang on 2016/11/29.
 */
import React from 'react';

import Stars from '../../component/Stars';

import '../../../css/me/HistoryListItem';

export default class HistoryListItem extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			
		}
		
	}
	
	static defaultProps = {
		data: {
			miName: "门店名称",
			evaContent: "评价内容",
			evaService: 3,  //服务
			evaEnvir: 2,    //环境,
			evaHealth: 1,   //卫生,
			evaDate: "2016-9-10 21:05",
			miMap1: "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
		},
	}
	
	//页面加载完毕
	componentDidMount() {
		
	}
	
	
	
	render() {
		
		return <div className="component-history-list-item">
			
			{/*<img src={this.props.data.miMap1} className="store-img"/>*/}
			
			<div className="assess-info">
				<div className="title">
					<p className="store-name">
						{this.props.data.miName}
					</p>
					
					<span className="time">{this.props.data.evaDate}</span>
				</div>
				
				<div className="star-line">
					<span className="label">务级</span>
					<Stars score={this.props.data.evaService} fixed={true}/>
				</div>
				
				<div className="star-line">
					<span className="label">环境</span>
					<Stars score={this.props.data.evaEnvir} fixed={true}/>
				</div>
				
				<div className="star-line">
					<span className="label">卫生</span>
					<Stars score={this.props.data.evaHealth} fixed={true}/>
				</div>
			</div>
			
			<p className="content">
				{this.props.data.evaContent}
			</p>
			
		</div>
	}
}