/**
 * Created by peijian.wang on 2016/8/2.
 */
/**
 * Created by peijian.wang on 2016/7/7.
 */
import React from 'react';

import '../../css/component/TabHeader';

/**
 * 页面头部中有切换页面操作的、普通页面头部
 *
 * 2016-08-05
 * 王佩剑
 *
 * tab : 数组类型，标识页面有几个分类栏目
 * choose : 切换分类后的回调函数
 * btn : 页面右上角的按钮
 * activeTab : 当前选中的分类
 * beforeGoBack : 执行页面回退之前的回调
 */
export default class TabHeader extends React.Component{
    constructor(props){
        super(props);

        let activeTab = props.activeTab || 0;

        this.state = {
            //被激活的tab
            activeTab : activeTab,
        }
    }

    //默认加载数据
    componentDidMount(){

    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps.activeTab || nextProps.activeTab == 0){
            this.setState({
                activeTab : nextProps.activeTab,
            })
        }
    }


    chooseTab(index){
        this.setState({
            activeTab : index,
        }, () => {
            this.props.choose(index);
        })
    }

    //页面后退操作
    pageGoBack(){
        if(!!this.props.beforeGoBack){
            this.props.beforeGoBack();
        }

        history.go(-1);
    }

    //获取标题处的HTML
    getTabHTML(){

        let tab = this.props.tab;
        let array = [];

        if(tab.length == 1){
            array.push(
                <span className="tab-btn" key="0" style={{'lineHeight': '42px', 'fontSize': '16px'}}>{tab[0]}</span>
            )
        }else{
            for(let i in tab){
                let item = tab[i];
                let className = "tab-btn";

                if(i == this.state.activeTab){
                    className = "tab-btn active";
                }

                array.push(
                    <span className={className} key={i} onClick={this.chooseTab.bind(this, i)}>{item}</span>
                )
            }
        }

        return array;
    }

    render(){
        let tab = this.getTabHTML();

        return <div className='component-tab-header'>
                <span className="goBack-btn" onClick={this.pageGoBack.bind(this)}></span>

            <div className="tab-group">
                {tab}
            </div>

            {this.props.btn}
        </div>
    }
}