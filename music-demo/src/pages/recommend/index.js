import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/recommend.css'
import { recMusic, getBanner, getNewSong } from '../../util/axios'
import Swiper from 'swiper'

import axios from 'axios'

class Recommend extends React.Component {
    constructor() {
        super()
        this.state = {
            bannerList: [],
            songList: [],
            newSongList: []
        }
    }
    sliceStr(str) {
        let n = str.indexOf('.');
        if (str[n + 1] === '0') {
            return str.slice(0, n)
        } else {
            return str.slice(0, n + 2);
        }
    }
    componentDidMount() {
        axios.all([recMusic({
            limit: 6
        }), getBanner({
            type: 1
        }), getNewSong()]).then(
            axios.spread((recmusic, getbanner, getnewsong) => {

                this.setState({
                    songList: recmusic.data.result,
                    bannerList: getbanner.data.banners,
                    newSongList: getnewsong.data.result
                })
            })
        )
    }
    componentDidUpdate() {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 2000
            }
        });
    }
    render() {
        const { bannerList, songList, newSongList } = this.state
        return (
            <div className='recommend'>
                <div className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            bannerList.map((item, idx) => {
                                return (
                                    <div className="swiper-slide" key={idx}><img src={item.pic} alt=''></img></div>
                                )
                            })
                        }
                    </div>
                </div>
                <h2 className='title'>推荐歌单</h2>
                <div className="remd_songs">
                    <div className="remd_ul">
                        {songList.map(item => {
                            return (
                                <NavLink className="remd_li" to={`/list?id=${item.id}`} key={item.id}>
                                    <div className="remd_img">
                                        <img className="u-img" src={item.picUrl} alt="" />
                                        <span className="u-earp remd_lnum">{this.sliceStr((item.playCount / 10000+''))}万</span>
                                    </div>
                                    <p className="remd_text">{item.name}</p>
                                </NavLink>
                            )
                        })}
                    </div>
                </div>
                <h2 className="title">最新音乐</h2>
                <div className='remd_newsg'>
                    <div className='m-sglst'>
                        {
                            newSongList.map(item => {
                                return (
                                    <NavLink className="m-sgitem" to={`/play?id=${item.id}`} key={item.id}>
                                        <div className="sgfr">
                                            <div className="sgchfl">
                                                <div className="f-thide sgtl">{item.name}
                                                    <span className="sgalia">{item.song.alias ? item.song.alias.map(itemAlia => '(' + itemAlia + ')') : ''}</span>
                                                </div>
                                                <div className="f-thide sginfo">
                                                    <i className="u-hmsprt sghot"></i>
                                                    {item.song.artists ? item.song.artists.map(itemAr => itemAr.name).join('/') + ' - ' + item.name : ''}
                                                </div>
                                            </div>
                                            <div className="sgchfr">
                                                <span className="u-hmsprt sgchply"></span>
                                            </div>
                                        </div>
                                    </NavLink>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Recommend