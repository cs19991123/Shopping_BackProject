import http from './axios'

// 推荐歌单
export function recMusic(params){
    return http.get('/personalized',{
        params
    })
}
// banner轮播图
export function getBanner(params){
    return http.get('/banner',{
        params
    })
}
// 最新音乐
export function getNewSong(){
    return http.get('/personalized/newsong')
}
// 歌单详情
export function playlistdetail(params){
    return http.get('/playlist/detail',{
        params
    })
}
// 搜索
export function getSearch(params){
    return http.get('/search/suggest',{
        params
    })
}
// 热搜关键词
export function getHot(){
    return http.get('/search/hot')
}


//获取歌曲详情
export function songDetail(params){
    return http.get('/song/detail',{
        params
    })
}

//获取音乐URL
export function playUrl(params){
    return http.get('/song/url',{
        params
    })
}

//获取歌词
export function getLyric(params){
    return http.get('/lyric',{
        params
    })
}