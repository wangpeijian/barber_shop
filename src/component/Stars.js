/**
 * Created by peijian.wang on 2016/11/24.
 */
import React from 'react';
import '../../css/component/Stars';

/**
 * 星星打分
 *
 */
export default class Stars extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            score: Number(props.score),
        }
    }

    componentDidMount(){

    }

    static defaultProps = {
        notice: score =>{},
	    score: 0,
	    fixed: false,
    }

    getStars(){
        let star = [];

        for(let i = 1; i <= 5; i++){

            let className = "";
            if(i <= this.state.score){
                className = "light";
            }

            star.push(
                <div className="box" key={i} onClick={this.lightStar.bind(this, i)}>
                    <span className={className}></span>
                </div>
            )
        }

        return star;
    }

    lightStar(index){

        if(this.state.score == index || this.props.fixed){
            return;
        }

        this.setState({
            score: index,
        }, ()=>{
            this.props.notice(index);
        })

    }

    render(){

        return <div className='component-stars'>
            <div className="star-bar">
                {this.getStars()}
            </div>
        </div>
    }
}