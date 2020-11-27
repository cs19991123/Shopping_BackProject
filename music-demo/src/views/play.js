import React from "react";
import qsString from "querystring";
import axios from "axios";
import $ from "jquery";
import '../assets/css/play.css'
import { playUrl, getLyric, songDetail } from "../util/axios";
import Img from "../assets/images/needle-ip6.png";

class Play extends React.Component {
    constructor() {
        super();
        this.state = {
            img: Img,
            songUrl: "",
            songDetail: {},
            lyric: "",
            playTime: "00:00",
            flag: false,
        };
        //创建一个播放器的ref
        this.audio = React.createRef();
        //创建一个播放图表的ref
        this.playIcon = React.createRef();
    }
    componentDidMount() {
        let query = this.props.location.search.slice(1);
        //axios并发处理
        axios
            .all([
                playUrl({
                    id: qsString.parse(query).id,
                }),
                getLyric({
                    id: qsString.parse(query).id,
                }),
                songDetail({
                    ids: qsString.parse(query).id,
                }),
            ])
            .then(
                axios.spread((songUrl, lyric, songDetail) => {
                    if (songUrl.data.code === 200) {
                        this.setState({
                            songUrl: songUrl.data.data[0].url,
                        });
                    }
                    if (lyric.data.code === 200) {

                        let lyricInfo = "";
                        lyricInfo = lyric.data.lrc.lyric;
                        //设定一个正则 取出 []
                        let reg = /\[(.*?)](.*)/g;
                        //设定一空对象
                        let obj = {};
                        //替换 replace
                        lyricInfo.replace(reg, (a, b, c) => {
                            b = b.slice(0, 5);
                            obj[b] = c;
                        });
                        this.setState(
                            {
                                lyric: obj,
                            },
                            () => {
                                //实时监听播放器的变化 ontimeupdate属性
                                let audio = this.audio.current;
                                audio.ontimeupdate = () => {
                                    let nowTime = this.formateTime(audio.currentTime);
                                    //剔除掉没有歌词的播放器时间
                                    if (nowTime in this.state.lyric) {
                                        //去设置播放时间
                                        this.setState(
                                            {
                                                playTime: nowTime,
                                            },
                                            () => {
                                                //调取歌词滚动的方法
                                                this.moveLyric();
                                            }
                                        );
                                    }
                                };
                            }
                        );
                    }
                    if (songDetail.data.code === 200) {
                        this.setState({
                            songDetail: songDetail.data.songs[0],
                        });
                    }
                })
            );
    }

    //封装一个事件格式化的方法
    formateTime(timer) {
        let minutes = (Math.floor(timer / 60) + "").padStart(2, "0");
        let seconds = (Math.floor(timer % 60) + "").padStart(2, "0");
        return `${minutes}:${seconds}`;
    }
    //歌词滚动
    moveLyric() {
        /* 
          一、知道那一句歌词是高亮
          二、查找高亮所有在位置
          三、比较 offsetTop 
          四、发现上移改变translateY
           */
        let active = document.getElementsByClassName("active")[0];
        let index = $(".geci_box").children().index(active);
        let offSet = 31;
        if (active.offsetTop > 31) {
            //更改它位置
            $(".geci_box").css("transform", `translateY(-${index * offSet}px)`);
        }
    }
    //创建一个播放事件
    toPlay() {
        this.setState(
            {
                flag: !this.state.flag,
            },
            () => {
                if (this.state.flag) {
                    //如果flag是真 代表暂停 出现图标 ，音乐停止
                    this.playIcon.current.style.display = "block";
                    this.audio.current.pause();
                } else {
                    //如果flag是假 代表播放 没有图标 ，音乐正在播放
                    this.playIcon.current.style.display = "none";
                    this.audio.current.play();
                }
            }
        );
    }
    render() {
        const { songUrl, songDetail, lyric, img, playTime } = this.state;
        return (
            <div className="play">
                <div className="play_top">
                    <img src={img} alt='' />
                </div>
                <div className="play_img_all" onClick={this.toPlay.bind(this)}>
                    <i ref={this.playIcon} className="play_icon"></i>
                    <div className="play_img_box">
                        <div className="small_img">
                            <img
                                src={
                                    songDetail.al
                                        ? songDetail.al.picUrl
                                        : ""
                                }
                                alt=""
                            />
                        </div>
                    </div>
                </div>
                <div className="play_txt">
                    <div className="play_txt_name">
                        <span>{songDetail.name}</span>-
            {songDetail.ar
                            ? songDetail.ar.map((arInfo) => {
                                return <span key={arInfo.id}>{arInfo.name}</span>;
                            })
                            : ""}
                    </div>
                    <div className="play_txt_geci">
                        <div className="geci_box">
                            {
                                //把对象转化成数组去循环  Object.entries把对象转化成枚举型的数组，类似于for in
                                Object.entries(lyric).map((item, idx) => {
                                    if (playTime === item[0]) {
                                        return (
                                            <p key={idx} className="active">
                                                {item[1]}
                                            </p>
                                        );
                                    } else {
                                        return <p key={idx}>{item[1]}</p>;
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
                <div className="audio_box">
                    <audio ref={this.audio} src={songUrl} autoPlay></audio>
                </div>
            </div>
        );
    }
}

export default Play;
