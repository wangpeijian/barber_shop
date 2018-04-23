/**
 * Created by dx on 16-10-26.
 */
import React from 'react';
import createHistory from 'history/createHashHistory';
const history = createHistory();

import Navigation from '../component/Navigation';
import TogglableTabs from '../component/TogglableTabs';
import MultiplePage from '../component/MultiplePage';
import Loading from '../component/Loading';
import OrderItem from './order/OrderItem';

import "../../css/Order"

export default class Order extends React.Component {
    constructor(props) {
        super(props);

        let {index = 0} = this.props.location.query;
	
        this.state = {
			currentPage: index,
	        
	        loading: true,
	        all: [],  //所有
            wait: [], //等待
            eva: [],  //待评价
	        end: [],  //已完成
        }

	    windowExtend.setPageTitle("订单列表");
    }

    //页面加载完毕
    componentDidMount() {
		this.getOrderData();
    }
    
    //获取订单列表数据
    getOrderData(){
    	let Order = this;
	
	    let info = windowExtend.helper.getUserInfo();
	    
	    if(!info){
		    return;
	    }
	    
	    fetch(windowExtend.API.getUrl(`/ord/getords.do?openid=${info.openid}`), {
		    method: 'get',
	    }).then(function (response) {
		    return response.json()
	    }).then(function(res){
		
		    Order.setState({
			    all: res.all,
			    end: res.end,
			    eva: res.eva,
			    wait: res.wait,
			    loading: false,
		    })
	    })
    }
	
    //切换头部分页
	changeTab(index){
    	this.setState({
		    currentPage: index,
	    }, this.markPage)
	}

	//页面滚动完毕
	changePage(current){
		this.setState({
			currentPage: current,
		}, this.markPage)
	}

	//记录当前页面标签位置
    markPage(){
        history.replace(`/order?index=${this.state.currentPage}`)
    }
	
	//根据类型获取列表HTML
	getOrderListHTMLByCode(code){
		let data = this.state[code];
		let array = [];

		for(let i in data){
			let item = data[i];
			
			array.push(
				<div className="gap" key={"g-" + i}></div>
			);
			
			array.push(
				<OrderItem data={item} key={i}/>
			);
		}

		if(array.length == 0){
			array.push(
				<div key={0} className="empty-order-list">
                    <span className="empty-img"></span>
                    <p className="empty-tip">暂无数据</p>
                </div>
			);
		}

		return array;
	}
	
	//获取订单列表的HTML
	getOrderPages(){
		let array = [
			this.getOrderListHTMLByCode("all"),
			this.getOrderListHTMLByCode("wait"),
			this.getOrderListHTMLByCode("eva"),
			this.getOrderListHTMLByCode("end"),
			];
		
		return array;
	}

    render() {
        return <div className="page-order">
					<TogglableTabs tabs={["全部","等待中","待评价","已完成"]}
					               selectCallback={this.changeTab.bind(this)}
					               active={this.state.currentPage}
					/>

	                <MultiplePage pages={this.getOrderPages()}
	                              slideCallback={this.changePage.bind(this)}
	                              current={this.state.currentPage}
	                              autoHeight={true}
	                />

	                <Navigation active={1}/>
	        
	                <Loading loading={this.state.loading}/>
        </div>
    }
}