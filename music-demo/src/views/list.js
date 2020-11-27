import React from 'react'
import { NavLink } from 'react-router-dom'
import '../assets/css/list.css'
import { playlistdetail } from '../util/axios'
import queryStr from 'querystring'
class List extends React.Component {
    constructor() {
        super()
        this.state = {
            playListDetail: [],
            playList: {},
            imgUrl:''
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
        let url = this.props.location.search.slice(1)
        playlistdetail({
            id: queryStr.parse(url).id
        }).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    playListDetail: res.data.playlist.tracks,
                    playList: res.data.playlist,
                    imgUrl:res.data.playlist.coverImgUrl
                })
            }
        })
    }
    render() {
        const { playListDetail, playList,imgUrl } = this.state
        return (
            <div className='list'>
                <div className='m-vplaylist'>
                    <section className="u-plhead pylst_header">
                        <div className="plhead_bg" style={{ backgroundImage: `url(${imgUrl})` }}>
                        </div>
                        <div className="plhead_wrap">
                            <div className="plhead_fl lsthd_fl">
                                <img className="u-img" src={imgUrl} alt='' />
                                <span className="lsthd_icon">歌单</span>
                                <i className="u-earp lsthd_num">{this.sliceStr((playList.playCount / 10000 + ''))}万</i>
                            </div>
                            <div className="plhead_fr">
                                <h2 className="f-thide2 f-brk lsthd_title">{playList.name}</h2>
                                <div className="lsthd_auth f-thide">
                                    <NavLink className="lsthd_link" to='/index'>
                                        <div className="u-avatar lsthd_ava">
                                            <img className="u-img" src={playList.creator ? playList.creator.avatarUrl : ''} alt="" />
                                            {playList.creator&&playList.creator.authStatus === 1 ? <span className="ava-icon ava-icon-yyr">
                                            </span> : ''}
                                        </div>{playList.creator ? playList.creator.nickname : ''}
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className="pylst_list">
                        <h3 className="u-smtitle">歌曲列表</h3>
                        <div className='m-sglst'>
                            {
                                playListDetail.map((item, idx) => {
                                    return (
                                        <NavLink className="m-sgitem" to={`/play?id=${item.id}`} key={idx}>
                                            <div className="sgfl">{idx + 1}</div>
                                            <div className="sgfr">
                                                <div className="sgchfl">
                                                    <div className="f-thide sgtl">{item.name}
                                                        <span className="sgalia"></span>
                                                    </div>
                                                    <div className="f-thide sginfo">
                                                        {item.ar.map(ar => ar.name).join(' / ')} - {item.al.name}
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

                    <div className="u-ft u-ft-fixed f-bd f-bd-top u-ft-sgl">
                        <div className="footer-wrap">
                            <span className="u-btn u-btn-circle u-btn-red footer-btn">收藏歌单</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default List