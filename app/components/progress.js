// 进度条组件
import React from 'react';
import './progress.less';

let Progress = React.createClass({
    getDefaultProps() {
        return {
            barColor: '#2f9842'
        }
    },
    changeProgress(e) {
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth; // 获取鼠标点击的位置占比
        // 同步位置到父组件 －－ 通过时间订阅完成
        this.props.onProgressChange && this.props.onProgressChange(progress);
    },
    render() {
        return (
            <div className = "components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className = "progress" style={{width: `${this.props.progress}%`, background: this.props.barColor}}></div>
            </div>
        );
    }
});

export default Progress;