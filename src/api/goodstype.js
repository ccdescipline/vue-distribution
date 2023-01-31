import request from '@/utils/request'

/**
 * 获取商品类型信息
 * @returns 
 */
export function getgoodsinfo() {
    return request({
        url: '/goodstype',
        method: 'get',
    })
}

export function getactivegoods(){
    return request({
        url: '/goodstype/active',
        method: 'get',
    })
}

/**
 * 添加用户信息
 * @param {} data 
 * @returns 
 */
export function insertgoodstypeinfo(data){
    return request({
        url: '/goodstype',
        method: 'post',
        data
    })
}


export function updategoodstypeinfo(data){
    return request({
        url: '/goodstype',
        method: 'put',
        data
    })
}