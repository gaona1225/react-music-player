// 音乐播放器组件
import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import { MUSIC_LIST } from './config/musiclist';
import Details from './page/Details';
import { Router, IndexRoute, Link, Route, hashHistory} from 'react-router';
import PubSub from 'pubsub-js';

let App = React.createClass({
    getInitialState() {
        return {
            musicList: MUSIC_LIST,
            currentMusicItem: MUSIC_LIST[0]
        }
    },
    playMuisc(musicItem) {
        console.log(musicItem);
        $('#player').jPlayer('setMedia', {
            mp3: musicItem.file
        }).jPlayer('play');

        this.setState({
            currentMusicItem: musicItem
        });
    },
    playNext(type='next') {
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let len = this.state.musicList.length;
        if (type === 'next') {
            index = (index + 1) % len;
        } else {
            index = (index + len - 1) % len;
        }
        let musicItem = this.state.musicList[index];
        this.playMuisc(musicItem);
        this.setState({
            currentMusicItem: musicItem
        });
    },
    // 找到当前播放index
    findMusicIndex(musicItem) {
        let index = this.state.musicList.indexOf(musicItem);
        return Math.max(0, index);
    },
    componentDidMount() {
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode: 'window'
        });
        this.playMuisc(this.state.currentMusicItem);
        $('#player').bind($.jPlayer.event.ended, (e) => {
            this.playNext();
        });
        PubSub.subscribe('PLAY_MUSIC', (msg, musicItem) => {
            this.playMuisc(musicItem);
        });
        PubSub.subscribe('DELETE_MUSUC', (msg, musicItem) => {
            this.setState({
                musicList: this.state.musicList.filter(item => {
                    return item !== musicItem;
                }) 
            });
        });
        PubSub.subscribe('PLAY_PREV', (msg, musicItem) => {
            this.playNext('prev');
        });
        PubSub.subscribe('PLAY_NEXT', (msg, musicItem) => {
            this.playNext();
        });
    },

    componentWillUnmount() {
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSUC');
        $('#player').unbind($.jPlayer.event.ended);
        PubSub.unsubscribe('PLAY_PREV');
        PubSub.unsubscribe('PLAY_NEXT');
    },

    progressChangeHandler(progress) {
    },

    render() {
        return (
            <div>
                <Header />
                { React.cloneElement(this.props.children, this.state) }
            </div>
        );
    }
});

let Root = React.createClass({
    render() {
        return (
            // 路由配置
            <Router history={hashHistory}>
            <Route path="/" component = {App}>
                <IndexRoute component={Player}></IndexRoute>
                <Route path="/list" component={MusicList}></Route>
                <Route path="/details" component={Details}></Route>
            </Route>
        </Router>
        )
    }
});

export default Root;