/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import {Link} from 'react-router';

import '../../../css/order/OrderItem';

export default class OrderItem extends React.Component {
	constructor(props) {
		super(props);

        //props = props.data;
		
		this.state = {
			
		}
		
	}
	
	static defaultProps = {
        data : {
            "ordId": "reasdfdsfsdf",//订单id,
            "ordPayment": "14",     //支付金额,
            "ordDate": "2015-6-11", //下单时间,
            "openidUser": "",       //用户opendid,
            "ordStatus": 1,         //状态1：已付款未做服务2：服务进行中3：服务完成未评价4：服务已经评价,
            "miName": "",           //门店名称,
            "miAddress": "",        //门店地址,
            "miId": "",              //门店id
            "miMap1": "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
        }
	}
	
	//页面加载完毕
	componentDidMount() {
		
	}

	getOrderStatus(){
        let name = "";

        switch (Number(this.props.data.ordStatus)){
            case 1:
                name = "已付款";
                break;
            case 2:
                name = "服务中";
                break;
            case 3:
                name = "未评价";
                break;
            case 4:
                name = "已完成";
                break;
        }

        return <span className="order-status">{name}</span>
    }

    getScoreBtn(){
        if(this.props.data.ordStatus == 3){
            return <div className="btn-bar">
                <Link to={{pathname: "/assess", query: {ordId: this.props.data.ordId,
										                miId: this.props.data.miId,
										                openId: this.props.data.openidUser}}}>
                    <span className="score-btn">
                        立即评价
                    </span>
                </Link>
            </div>
        }

        return "";
    }
	
	render() {

		return <div className="component-order-item">
		    <div className="head">
                <span className="store-name">{this.props.data.miName}</span>
                {this.getOrderStatus()}
            </div>

            <div className="store-info">
                <img className="store-img" src={this.props.data.miMap1}/>

                <div className="detail">
                    <p>预约时段:无限制</p>
                    <p>下单时间:{this.props.data.ordDate}</p>
                    <p>门店地址:{this.props.data.miAddress}</p>
                </div>
            </div>

            <div className="pay-info">
                <span className="label">合计</span>
                <span className="money">{this.props.data.ordPayment}元</span>
            </div>

            {this.getScoreBtn()}
		</div>
	}
}