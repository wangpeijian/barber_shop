/**
 * Created by dx on 16-10-26.
 */
import React from 'react';
import {Link} from 'react-router';

import Slider from 'react-slick';
import Navigation from '../component/Navigation';
import Loading from '../component/Loading';
import StoreListItem from './home/StoreListItem';

import '../../css/Home';

export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            banner: [],

            stores: [],

	        loading: true,
        }

	    windowExtend.setPageTitle("首页");
    }

    //页面加载完毕
    componentDidMount() {
        this.getBannerData();
	
	    windowExtend.API.getUserLocation(this.getStoreData.bind(this))
    }

    getBannerData(){
        let Home = this;

        fetch(windowExtend.API.getUrl("/map/getmap.do?"), {
            method: 'get',
        }).then(function (response) {
            return response.json()
        }).then(function(res){

            let banner = [];

            for(let i = 1; i <= 5; i++){
                let img = res["cmMap" + i];
                let url = res["cmMapUrl" + i];

                if(img == ""){
                    break;
                }

                banner.push({
                    img: img,
                    url: url,
                })
            }

            Home.setState({
                banner: banner,
            })
        })
    }

	//生成轮播图HTML
	getBannerImages(){
		let data = this.state.banner;

		let array = [];

		for(let i in data){
			let item = data[i];

			array.push(
				<img src={item.img} key={i} onClick={()=>{
					if(!item.url){
						return;
					}
					window.location.href = item.url;
				}}/>
			)
		}

		if(array.length == 0){
            array.push(<div className="empty-img" key="-1"></div>)
        }

		return array;
	}

    getStoreData(latitude, longitude){
        let Home = this;

        fetch(windowExtend.API.getUrl(`/mecinfo/getmecs.do?latitude=${latitude}&longitude=${longitude}`), {
            method: 'get',
        }).then(function (response) {
            return response.json()
        }).then(function(res){

            if(res.code == 0){
                Home.setState({
                    stores: res.data,
                    loading: false,
                })
            }
        })
    }
	
	//生成门店列表
	getStoreList(){
		let data = this.state.stores;
		let array = [];

		for(let i in data){
		    let item = data[i];

            array.push(
                <StoreListItem key={i} data={item}/>
            )
        }
		
		return array;
	}

    render() {

        return <div className="page-home">
	
	        <div className="page-content">
		        <Slider {...windowExtend.helper.getCarouselConfig}>
			        {this.getBannerImages()}
		        </Slider>
		
		        <ul className="store-list">
			        {this.getStoreList()}
		        </ul>
	        </div>
			       

             <Navigation active={0}/>
	        
	        <Loading loading={this.state.loading}/>
        </div>
    }
}