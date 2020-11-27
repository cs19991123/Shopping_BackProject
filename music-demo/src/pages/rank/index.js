import React from 'react'
import '../../assets/css/rank.css'
import { NavLink } from 'react-router-dom'
import { playlistdetail } from '../../util/axios'
class Rank extends React.Component {
    constructor() {
        super()
        this.state = {
            hotSongList: [],
            upDataTime: 0
        }
    }
    componentDidMount() {
        playlistdetail({
            id: 3778678
        }).then(res => {
            if (res.data.code === 200) {
                this.setState({
                    hotSongList: res.data.playlist.tracks.filter((item, i) => i < 20),
                    upDataTime: res.data.playlist.updateTime
                })
            }

        })
    }
    render() {
        const { hotSongList } = this.state
        return (
            <div className='rank'>
                <div className="hotop">
                    <div className="hotopct">
                        <div className="u-hmsprt hoticon">
                        </div>
                        <div className="hottime">更新日期：11月19日
                        </div>
                    </div>
                </div>
                <div className='hotcont'>
                    <div className='m-sglst'>
                        {
                            hotSongList.map((item, idx) => {
                                return (
                                    <NavLink className="m-sgitem" to={`/play?id=${item.id}`} key={idx}>
                                        <div className={idx < 3 ? 'sgfl sgfl-cred' : 'sgfl'}>{(idx + 1+'').padStart(2, '0')}</div>
                                        <div className="sgfr">
                                            <div className="sgchfl">
                                                <div className="f-thide sgtl">{item.name}
                                                    <span className="sgalia">{item.alia ? item.alia.map(itemAlia => '(' + itemAlia + ')') : ''}</span>
                                                </div>
                                                <div className="f-thide sginfo">
                                                    <i className="u-hmsprt sghot"></i>
                                                    {item.ar ? item.ar.map(itemAr => itemAr.name).join('/') + ' - ' + item.name : ''}
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
                <div className="hotdn">
                    <span className="hotview">查看完整榜单</span>
                </div>
            </div>
        )
    }
}

export default Rank