/**
 * Created by dx on 16-10-26.
 */
import React from 'react';
import {Link} from 'react-router';

import Navigation from '../component/Navigation';

import '../../css/Home';

export default class More extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

	    windowExtend.setPageTitle("更多");
    }

    //页面加载完毕
    componentDidMount() {

    }

    render() {
        return <div className="page-more">

	        <Navigation active={3}/>
        </div>
    }
}