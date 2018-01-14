// 音乐列表项组件
import React from 'react';
import './musiclistItem.less';
import { Link } from 'react-router';
import PubSub from 'pubsub-js';

let MusicListItem = React.createClass({
    playMusic(musicItem) {
        PubSub.publish('PLAY_MUSIC', musicItem);
    },
    deleteMusic(musicItem, e) {
        e.stopPropagation();
        PubSub.publish('DELETE_MUSUC', musicItem);
    },
    render() {
        let musicItem = this.props.musicItem;
        return (
            <li onClick={this.playMusic.bind(this, musicItem)} className={`components-listitem row${this.props.focus ? ' focus' : ''}`}>
                <p><strong>{musicItem.title}</strong> - {musicItem.artist}</p>
                <p className="-col-auto"><Link to='/details'>&nbsp;&nbsp;详情&gt;</Link></p>
                <p onClick={this.deleteMusic.bind(this, musicItem)} className="-col-auto delete"></p>
            </li>
        );
    }
});

export default MusicListItem;