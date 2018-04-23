/**
 * Created by peijian.wang on 2016/4/14.
 */
import React from 'react';
import '../../css/component/Dialog';

/**
 * 操作提示框
 *
 * text_title ： 对话框标题
 * ok ： 点击确认事件
 * text_ok ：确认按钮文字
 * cancel ： 点击取消事件
 * text_cancel ： 取消按钮文字
 * text_tip ： 对话框提示文字
 *
 * 备注：若只传ok则对话框展示一个按钮
 */
export default class Dialog extends React.Component{
    constructor(props){
        super(props);
    }

    render(){

        let button = '';
        //没有取消按钮（只有一个按钮）
        if(this.props.text_cancel == undefined){
            button = <div className = "big-btn" onClick={this.props.ok}>{this.props.text_ok}</div>
        }else{
            button = <div>
                <div className = "min-btn cancel-btn" onClick={this.props.cancel}>{this.props.text_cancel}</div>
                <div className = "min-btn ok-btn" onClick={this.props.ok}>{this.props.text_ok}</div>
            </div>
        }

        return <div className="component-dialog">
            <div className="dialog-mask"></div>
            <div className="dialogBg">
                <div className="dialog">
                    <div className="dialog-header">{this.props.text_title}</div>
                    <div className="dialog-tip">{this.props.text_tip}</div>
                    <div className="dialog-bottom">
                        {button}
                    </div>
                </div>
            </div>
        </div>
    }
}