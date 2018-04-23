/**
 * Created by admin on 2016/11/19.
 */
import React from 'react';
import moment from 'moment';

import '../../../css/home/SelectTime';

export default class SelectTime extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			selectedTime: props.selectedTime,
		}
		
	}
	
	static defaultProps = {
		selectedTime: null,
		submit: (time)=>{console.log(time)},
		cancel: ()=>{},
	}
	
	//页面加载完毕
	componentDidMount() {
		windowExtend.setPageTitle("预约时间");
	}
	
	//生成日期列表
	getDayListHTML(){
		
		let data = [
			{
				day: moment().date(),
				title: "今天",
			},
			{
				day: moment().add(1, 'd').date(),
				title: "明天",
			},
			{
				day: moment().add(2, 'd').date(),
				title: "后天",
			},
			{
				day: moment().add(3, 'd').date(),
				title: windowExtend.helper.getWeekName(moment().add(3, 'd').day()),
			},
			{
				day: moment().add(4, 'd').date(),
				title: windowExtend.helper.getWeekName(moment().add(4, 'd').day()),
			},
		];
		
		let array = [];
		
		data.forEach(function(item, index){
			array.push(
				<div className="date-item" key={index}>
					<span className="day">{item.day}</span>
					<span className="title">{item.title}</span>
				</div>
			)
		});
		
		return array;
	}
	
	//生成时间列表
	getTimeList(){
		//10:20 - 21:20
		let time = (function(){
			let time = [];
			for(let t = 10; t <= 21; t++){
				if(t != 10){
					time.push(t + ":" + "00");
				}
				
				time.push(t + ":" + 20);
				
				if(t != 21){
					time.push(t + ":" + 40);
				}
			}
			
			return time;
		})()
		
		let data = [];
		
		for(let d = 0; d < 5; d++){
			let item = {
				day: moment().add(d, 'd'),
				time: time,
			};
			data.push(item);
		}
		
		let array = [];
		let unableMark = true;
		let SelectTime = this;
		
		data.forEach(function(dayObj, dayIndex){
			let list = [];
			
			dayObj.time.forEach(function(timeObj, timeIndex){
				
				let itemClass= "item";
				let itemAbleMark = false;
				let yearMonthDay = dayObj.day.format("YYYY/MM/DD");
				
				if(unableMark){
					let timeArray = timeObj.split(":");
					let itemTime = Number(timeArray[0]) * 100 + Number(timeArray[1]);
					
					if(itemTime >= moment().hours() * 100 + moment().minutes()){
						unableMark = false;
					}
				}
				
				if(!unableMark){
					itemAbleMark = true;
					
					itemClass = "item able";
					
					//判断是否是选中的时间selectedTime
					if(yearMonthDay+ " " +  timeObj == SelectTime.state.selectedTime){
						itemClass = "item able selected";
					}
				}
				
				list.push(
					<div className={itemClass}
					     key={"t"+timeIndex}
					     onClick={()=>{
					     	if(itemAbleMark){
						   
						        SelectTime.setState({
							        selectedTime: yearMonthDay + " " +  timeObj,
						        })
					     		
					        }else{
						        alert("该时段已经无法预约了，请选择其他时间段~")
					        }
					     }}
					
					>{timeObj}</div>
				)
			})
			
			array.push(
				<div className="time-line" key={"d"+dayIndex}>
					{list}
				</div>
			)
		})
		
		return array;
	}
	
	submitTime(){
		this.props.submit(this.state.selectedTime);
	}
	
	render() {
		
		return <div className="page-select-time">
		
			<div className="top-block">
				<p className="title-text">选择预约时间</p>
				
				<div className="time-box">
					<span className="selected-time">
						{this.state.selectedTime ? this.state.selectedTime: "请选择时间"}
					</span>
				</div>
				
				<p className="remark">
					选号时段在此期间到店体验，过号需重排
				</p>
				
				<div className="day-list">
					{this.getDayListHTML()}
				</div>
			</div>
			
			<div className="page-content">
				{this.getTimeList()}
			</div>
			
			<div className="footer-bar">
				<div className="cancel-btn" onClick={this.props.cancel}>不预约</div>
				<div className="submit-btn" onClick={this.submitTime.bind(this)}>选择</div>
			</div>
			
		</div>
	}
}