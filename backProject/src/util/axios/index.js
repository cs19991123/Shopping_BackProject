// 引入重新封装的axios
import http from './axios'

// 导出

// -----------------------------------------菜单接口------------------------------------

// 菜单添加
export function menuAdd(data){
    return http.post('api/menuadd',data)
}
// 菜单列表
export function menuList(params){
    return http.get('api/menulist',{
        params
    })
}
// 菜单获取（一条）
export function menuInfo(params){
    return http.get('api/menuinfo',{
        params
    })
}
// 菜单修改
export function menuEdit(data){
    return http.post('api/menuedit',data)
}
// 菜单删除
export function menuDelete(data){
    return http.post('api/menudelete',data)
}

// -----------------------------------------------角色接口-----------------------------------

// 角色添加
export function roleadd(data){
    return http.post('api/roleadd',data)
}
// 角色列表
export function rolelist(){
    return http.get('api/rolelist')
}
// 角色获取（一条）
export function roleinfo(params){
    return http.get('api/roleinfo',{
        params
    })
}
// 角色修改
export function roleedit(data){
    return http.post('api/roleedit',data)
}
// 角色删除
export function roledelete(data){
    return http.post('api/roledelete',data)
}

// -----------------------------------------------管理员接口---------------------------------------

// 管理员添加
export function useradd(data){
    return http.post('api/useradd',data)
}
// 管理员总数
export function usercount(){
    return http.get('api/usercount')
}
// 管理员列表（分页）
export function userlist(params){
    return http.get('api/userlist',{
        params
    })
}
// 管理员获取（一条）
export function userinfo(params){
    return http.get('api/userinfo',{
        params
    })
}
// 管理员修改
export function useredit(data){
    return http.post('api/useredit',data)
}
// 管理员删除
export function userdelete(data){
    return http.post('api/userdelete',data)
}
// 登录
export function userlogin(data){
    return http.post('api/userlogin',data)
}

// ---------------------------------------------------商品分类接口---------------------------

// 商品分类添加
export function cateadd(data){
    return http.post('api/cateadd',data)
}
// 商品分类列表
export function catelist(params){
    return http.get('api/catelist',{
        params
    })
}
// 商品分类获取
export function cateinfo(params){
    return http.get('api/cateinfo',{
        params
    })
}
// 商品分类修改
export function cateedit(data){
    return http.post('api/cateedit',data)
}
// 商品分类删除
export function catedelete(data){
    return http.post('api/catedelete',data)
}

// ----------------------------------------------------商品规格接口-----------------------------

// 商品规格添加
export function specsadd(data){
    return http.post('api/specsadd',data)
}
// 商品规格总数
export function specscount(){
    return http.get('api/specscount')
}
// 商品规格列表（分页）
export function specslist(params){
    return http.get('api/specslist',{
        params
    })
}
// 商品规格获取（一条）
export function specsinfo(params){
    return http.get('api/specsinfo',{
        params
    })
}
// 商品规格修改
export function specsedit(data){
    return http.post('api/specsedit',data)
}
// 商品规格删除
export function specsdelete(data){
    return http.post('api/specsdelete',data)
}

// -----------------------------------------------------商品管理接口----------------------------

// 商品添加
export function goodsadd(data){
    return http.post('api/goodsadd',data)
}
// 商品总数
export function goodscount(){
    return http.get('api/goodscount')
}
// 商品列表（分页）
export function goodslist(params){
    return http.get('api/goodslist',{
        params
    })
}
// 商品获取（一条）
export function goodsinfo(params){
    return http.get('api/goodsinfo',{
        params
    })
}
// 商品修改
export function goodsedit(data){
    return http.post('api/goodsedit',data)
}
// 商品删除
export function goodsdelete(data){
    return http.post('api/goodsdelete',data)
}

// -----------------------------------------------------会员管理接口--------------------

// 会员列表
export function memberlist(){
    return http.get('api/memberlist')
}
// 会员获取（一条）
export function memberinfo(params){
    return http.get('api/memberinfo',{
        params
    })
}
// 会员修改
export function memberedit(data){
    return http.post('api/memberedit',data)
}

// ------------------------------------------------轮播图接口-----------------------------------

// 轮播图添加
export function banneradd(data){
    return http.post('api/banneradd',data)
}
// 轮播图列表
export function bannerlist(){
    return http.get('api/bannerlist')
}
// 轮播图获取（一条）
export function bannerinfo(params){
    return http.get('api/bannerinfo',{
        params
    })
}
// 轮播图修改
export function banneredit(data){
    return http.post('api/banneredit',data)
}
// 轮播图删除
export function bannerdelete(data){
    return http.post('api/bannerdelete',data)
}

// ---------------------------------------------限时秒杀接口---------------------------

// 限时秒杀添加
export function seckadd(data){
    return http.post('api/seckadd',data)
}
// 限时秒杀列表
export function secklist(){
    return http.get('api/secklist')
}
// 限时秒杀获取（一条）
export function seckinfo(params){
    return http.get('api/seckinfo',{
        params
    })
}
// 限时秒杀修改
export function seckedit(data){
    return http.post('api/seckedit',data)
}
// 限时秒杀删除
export function seckdelete(data){
    return http.post('api/seckdelete',data)
}