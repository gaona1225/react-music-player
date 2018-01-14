// 音乐详情组件
import React from 'react';

let Details = React.createClass({
    render() {
        let details = this.props.currentMusicItem;
        return (
            <div>
                <p>我是详情页</p>
                <p>歌名：{details.title}</p>
                <p>作者：{details.artist}</p>
                <p>歌曲：{details.file}</p>
            </div>
        );
    }
});

export default Details;