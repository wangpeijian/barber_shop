/**
 * Created by dx on 16-10-26.
 */
import React from 'react';
import {Link} from 'react-router';

import Loading from '../component/Loading';

import Navigation from '../component/Navigation';

import '../../css/Me';

export default class Me extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            headimgurl: "http://ww4.sinaimg.cn/mw690/66134906jw1f7v6739nfdj20n40pywjd.jpg",
            nickname: "sb355",
	        loginInfo: "",
        }

	    windowExtend.setPageTitle("个人中心");
    }

    //页面加载完毕
    componentDidMount() {
        this.getUserData()
    }

    getUserData(){
	    let Me = this;
		
    	try {
    		let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    		
    		if(userInfo.headimgurl && userInfo.nickname){
			    this.setState({
				    headimgurl: userInfo.headimgurl,
				    nickname: userInfo.nickname,
			    })
			    
			    fetch(windowExtend.API.getUrl(`/ord/distance.do?openid=${userInfo.openid}`), {
				    method: 'get',
			    }).then(function (response) {
				    return response.json()
			    }).then(function(res){
				
			    	if(res.day != 0){
					    Me.setState({
						    loginInfo: `距离上次服务${res.day}天`
					    })
				    }
				   
			    })
		    }
	    }catch (e){
    		
	    }
    	
    }
	
    render() {
        return <div className="page-me">
	        
	        <div className="user-banner">
		        <img className="user-head" src={this.state.headimgurl}/>
		        <span className="user-name">{this.state.nickname}</span>
		        <p className="login-info">{this.state.loginInfo}</p>
	        </div>

	        <div className="button-group">
		        <div className="button-item share">
			        分享好友
		        </div>
		        
		        <Link to={{pathname: "/history", query:{}}}>
			        <div className="button-item history">
				        历史评价
			        </div>
		        </Link>
			        
		        <a href={"tel:" + windowExtend.helper.getTelephone}>
			        <div className="button-item phone">
				        投诉建议
			        </div>
		        </a>
	        </div>
	        
	        <Navigation active={2}/>
            <Loading loading={this.state.loading}/>
        </div>
    }
}