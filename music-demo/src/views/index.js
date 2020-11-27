import React from 'react'
import '../assets/css/index.css'
// 引入组件
import Recommend from '../pages/recommend'
import Rank from '../pages/rank'
import Search from '../pages/search'
// 引入路由
import { Switch, Route, Redirect, NavLink } from 'react-router-dom'

class Index extends React.Component {
    render() {
        return (
            <div className='index'>
                <div className='navTitle'>优音乐</div>
                <div className='navBar'>
                    <NavLink to='/index/recommend' activeClassName='active'><span>推荐音乐</span></NavLink>
                    <NavLink to='/index/rank' activeClassName='active'><span>热歌榜</span></NavLink>
                    <NavLink to='/index/search' activeClassName='active'><span>搜索</span></NavLink>
                </div>
                <Switch>
                    <Route path='/index/recommend' component={Recommend}></Route>
                    <Route path='/index/rank' component={Rank}></Route>
                    <Route path='/index/search' component={Search}></Route>
                    <Redirect to='/index/recommend'></Redirect>
                </Switch>
            </div>
        )
    }
}

export default Index