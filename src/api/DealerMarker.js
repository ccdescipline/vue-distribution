import request from '@/utils/request'

export function getGoodsinfo(params){
    return request({
        url: '/dealerMarket/getgoodinfo',
        method: 'get',
        params
    })
}

export function submitGoodsCart(data){
    return request({
        url: '/dealerMarket/submitGoodcartPrice',
        method: 'post',
        data
    })
}

export function queryGoodcartPrice(data){
    return request({
        url: '/dealerMarket/queryGoodcartPrice',
        method: 'post',
        data
    })
}