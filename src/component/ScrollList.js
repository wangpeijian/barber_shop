/**
 * Created by peijian.wang on 2016/4/18.
 */
import React from 'react';

import '../../css/component/ScrollList';


export default class ScrollList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            //0：加载完成，1：正在加载，-1：没有更多数据，2：空列表
            listStatus : 0,
        }

        global.scrollPromise = true;
    }

    //默认加载数据
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        this.setState({
            listStatus: nextProps.listStatus,
        })
    }

    //当列表滚动时
    onScroll(e){
        let scrollList = this.refs.scrollList;

        if(scrollList.scrollHeight <= scrollList.scrollTop + scrollList.clientHeight + 50){
            if(this.state.listStatus == 0){

                if(global.scrollPromise == true){
                    global.scrollPromise = false;
                    setTimeout(()=>{global.scrollPromise = true},500);
                }else{
                    return;
                }

                this.props.getPageData();
            }
        }
    }

    render(){

        let listStatusHTML;
        if(this.state.listStatus == 0){
            listStatusHTML = '';
        }else if(this.state.listStatus == 1){
            listStatusHTML = <div className='list-loading-block'>
                <span className="loading-img"></span>
            </div>
        }else if(this.state.listStatus == -1){
            listStatusHTML = <div className='list-loading-block'>
                <p className="tip">没有更多数据了</p>
            </div>
        }else if(this.state.listStatus == 2){
            //列表中无数据显示图片提示
            listStatusHTML = this.props.defaultImage == undefined ? "" : this.props.defaultImage;
        }

        return <div className="component-scroll-list" ref="scrollList" style={this.props.style} onScroll={this.onScroll.bind(this)}>
            {this.props.children}
            {listStatusHTML}
        </div>
    }
}
