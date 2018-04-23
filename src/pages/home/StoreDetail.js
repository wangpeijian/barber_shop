/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import {Link} from 'react-router';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Slider from 'react-slick';
import TogglableTabs from '../../component/TogglableTabs';
import MultiplePage from '../../component/MultiplePage';
import SelectTime from './SelectTime';
import Loading from '../../component/Loading';

import '../../../css/home/StoreDetail';

export default class StoreDetail extends React.Component {
	constructor(props) {
		super(props);
		
		let {miId} = this.props.location.query;
		
		this.state = {
            loading: true,
			miId: miId,
			currentPage: 0,
			
			storeInfo: {
				"miAddress": "门店地址",
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
				"miName": "门店名称",
				"miOpenDate": "00：00",
				"miPrice": 30, //基础价格
				"miShowMap": "",    //第一分页展示图片
				"miServiceMap": "", //第二分页展示图片
				"miStatus": 1,
			},

            banner: [],
			
			showSelectTime: status == "time",
			appointmentTime: null,
		}
		
	}
	
	static defaultProps = {
	
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("店铺详情");
		
		window.onpopstate = (e) => {
			setTimeout(() => {
				
				if(location.hash.indexOf("/storedetail") == -1){
					return;
				}
				
				let {status} = this.props.location.query;
				
				if(!status){
					this.setState({
						showSelectTime : false,
					})
					windowExtend.setPageTitle("店铺详情");
				}
			}, 16);
		};

		this.getStoreDetail();

		/*windowExtend.API.callWeixin(
		    ["openLocation"], function(){
		    	alert("调用成功")
			}
        );*/
	}

	//页面退出时
	componentWillUnmount(){
		window.onpopstate = () => {};
	}

    //获取店铺详情内容
    getStoreDetail(){
        let StoreDetail = this;

        fetch(windowExtend.API.getUrl("/mecinfo/getmec.do?miId=" + this.state.miId), {
            method: 'get',
        }).then(function (response) {
            return response.json()
        }).then(function(res){

            if(res.code == 0){

                let banner = [];

                for(let i = 1; i <= 4; i++){
                    let img = res["miMap" + i];

                    if(img == ""){
                        break;
                    }

                    banner.push(img)
                }

                StoreDetail.setState({
                    storeInfo: res,
                    banner: banner,
                    loading: false,
                })

            }
        })
    }
	
	getStoreImages(){
		let data = this.state.banner;
		
		let array = [];
		
		for(let i in data){
			let item = data[i];
			
			array.push(
				<img src={item} key={i}/>
			)
		}

        if(array.length == 0){
            array.push(<div className="empty-img" key="-1"></div>)
        }

		return array;
	}
	
	//切换头部分页
	changeTab(index){
		this.setState({
			currentPage: index,
		})
	}
	
	//页面滚动完毕
	changePage(current){
		this.setState({
			currentPage: current,
		})
	}
	
	//生成店铺介绍信息
	getInfoPages(){
		let　array = [];
	
		array.push(
			<div className="store-notes">
				<div className="info-line">
					<span className="time-info">
						{this.state.storeInfo.miOpenDate + " - " + this.state.storeInfo.miCloseDate}
					</span>
				</div>
				
				<div className="info-line select-item" onClick={this.showWeixinMap.bind(this)}>
					<span className="local-info">
						{this.state.storeInfo.miAddress}
					</span>
				</div>
				
				<div className="info-line select-item" onClick={this.showWeixinMap.bind(this)}>
					<span className="map-info">
						{this.state.storeInfo.miStationInfo}
					</span>
				</div>
				
				<div className="gap"></div>
				<img className="info-img" src={this.state.storeInfo.miShowMap}/>
				
				<div className="service-info">
					<a href={"tel:" + windowExtend.helper.getTelephone}></a>
					<span className="tel-icon"></span>
					
					<p>全国客服热线:09:30－21:00</p>
				</div>
				
			</div>
		)
		
		array.push(
			<img className="info-img" src={this.state.storeInfo.miServiceMap}/>
		)
		
		array.push(
			<div className="user-notes">
				用户须知：
			</div>
		)
		
		return array;
	}
	
	//切换页面为选择时间的界面
	showSelectTime(){
		history.push("/storedetail?status=time");
		
		this.setState({
			showSelectTime: true,
		})
	}
	
	submitTime(time){
		history.go(-1);
		this.setState({
			showSelectTime: false,
			appointmentTime: time,
		})
	}
	
	clearTime(){
		history.go(-1);
		this.setState({
			showSelectTime: false,
			appointmentTime: null,
		})
	}

    showWeixinMap(){
        wx.openLocation({
            latitude: this.state.storeInfo.miLatitude, // 纬度，浮点数，范围为90 ~ -90
            longitude: this.state.storeInfo.miLongitude, // 经度，浮点数，范围为180 ~ -180。
            name: this.state.storeInfo.miName, // 位置名
            address: this.state.storeInfo.miAddress, // 地址详情说明
            scale: 20, // 地图缩放级别,整形值,范围从1~28。默认为最大
            infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
        });
    }
	
	checkStatus(e){
    	if(this.state.storeInfo.miStatus == 2 || this.state.storeInfo.miStatus == 3){
		    e.stopPropagation();
		    e.preventDefault();
		    
		    if(this.state.storeInfo.miStatus == 2){
			    alert("目前店铺正在装修中，敬请期待")
		    }
		
		    if(this.state.storeInfo.miStatus == 3){
			    alert("店铺即将开业，敬请期待")
		    }
	    }
	}
	
	render() {
		
		if(this.state.showSelectTime){
			return <SelectTime selectedTime={this.state.appointmentTime}
						submit={this.submitTime.bind(this)}
						cancel={this.clearTime.bind(this)}
			/>
		}
		
		let price = this.state.storeInfo.miPrice;
		let selectTime = new Date().Format("hhmm");
		// if(!!this.state.appointmentTime){
		// 	selectTime = new Date(this.state.appointmentTime).Format("hhmm");
		// }
		if(selectTime >= 1730){
			price = this.state.storeInfo.miFloatPrice;
		}
		
		return <div className="page-store-detail">
			
			<div className="page-content">
				<Slider {...windowExtend.helper.getCarouselConfig}>
					{this.getStoreImages()}
				</Slider>
				
				<div className="store-info">
					<p className="name">{this.state.storeInfo.miName}</p>
					<p className="price">￥{price}</p>
					<p className="wait">预计等待{0}分钟</p>
				</div>
				
				<div className="gap"></div>
				
				<div className="select-time" onClick={this.showSelectTime.bind(this)}>
					<label className="time">预约时间</label>
					<span className="option-value">{this.state.appointmentTime}</span>
				</div>
					
				<div className="tip-block"></div>
				
				<TogglableTabs tabs={["门店信息","服务内容","用户须知"]}
				               selectCallback={this.changeTab.bind(this)}
				               active={this.state.currentPage}
				/>
				
				<div className="gap"></div>
				
				<MultiplePage pages={this.getInfoPages()}
				              slideCallback={this.changePage.bind(this)}
				              current={this.state.currentPage}
				              autoHeight={true}
				/>
			</div>
			
			<div className="bottom-bar">
				<span className="money">合计{price}元</span>
				<Link to={{pathname: "/confirmorder", query:{miId: this.state.miId,
																price: price,
																appointmentTime: this.state.appointmentTime}
							}}>
					<span className="order-btn" onClick={this.checkStatus.bind(this)}>立即下单</span>
				</Link>
			</div>

            <Loading loading={this.state.loading}/>
		</div>
	}
}