import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/css/search.css'
import { getSearch, getHot } from '../../util/axios'
import axios from 'axios'
class Search extends React.Component {

    constructor() {
        super()
        this.state = {
            isShow: 0,
            title: '',
            searchList: [],
            hotList: []
        }
        this.InputText = React.createRef()
    }
    inputChange(e) {
        this.setState({
            isShow: 1,
            title: e.target.value
        })
        if (!e.target.value) {
            this.setState({
                isShow: 0,
                title: e.target.value
            })
        } else {
            getSearch({
                keywords: this.InputText.current.value,
                type: 'mobile'
            }).then(res => {
                if (res.data.code === 200) {
                    this.setState({
                        searchList: res.data.result.allMatch
                    })
                }

            })
        }

    }
    closeInput(e) {
        this.setState({
            isShow: 0
        })
        this.InputText.current.value = ''
    }
    componentDidMount() {
        axios.all([getHot()]).then(
            axios.spread((gethotlist) => {
                if (gethotlist.data.code === 200) {
                    this.setState({
                        hotList: gethotlist.data.result.hots
                    })
                }
            })
        )
    }
    render() {
        const { isShow, title, searchList, hotList } = this.state
        return (
            <div className='search'>
                <form className="m-input f-bd-btm" method="get" action="#">
                    <div className="inputcover">
                        <i className="u-svg u-svg-srch"></i>
                        <input type="search" name="search" className="input" autoComplete='off' placeholder="搜索歌曲、歌手、专辑" onChange={this.inputChange.bind(this)} ref={this.InputText} />
                        <figure className="closeInput">
                            <i className={isShow === 0 ? "u-svg u-svg-empty" : 'u-svg u-svg-empty z-show'} onClick={this.closeInput.bind(this)}></i>
                        </figure>
                    </div>
                </form>
                <div className={isShow === 0 ? 'm-hotlist' : 'close'}>
                    <h3 className="title">热门搜索</h3>
                    <ul className="list">
                        {
                            hotList.map((item, idx) => {
                                return (
                                    <li className="item" key={idx}>
                                        <NavLink className="link" to='/list'>{item.first}</NavLink>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={isShow === 0 ? 'm-recom' : 'm-recom show'}>
                    <h3 className="title f-thide">搜索“{title}”</h3>
                    <ul>
                        {
                            searchList ?
                                searchList.map((item, idx) => {
                                    return (
                                        <li className="recomitem" key={idx}>
                                            <i className="u-svg u-svg-search"></i>
                                            <span className="f-thide">{item.keyword}</span>
                                        </li>
                                    )
                                }) : ''
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Search