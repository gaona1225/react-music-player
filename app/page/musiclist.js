// 音乐列表组件
import React from 'react';
import MusicListItem from '../components/musiclistItem'

let MusicList = React.createClass({
    render () {
        let listEle = null;
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus={item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={item}
                >{item.title}
                </MusicListItem>)
        });

        return (
            <ul>
                { listEle }
            </ul>
        )
    }
});


export default MusicList;