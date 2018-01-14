// 组件demo测试
import React from 'react';
import './hello.less';

let Hello = React.createClass({
    render () {
        return (
            <div className = "hello-component">
                Hello, world!
            </div>
        );
    }
})

export default Hello;