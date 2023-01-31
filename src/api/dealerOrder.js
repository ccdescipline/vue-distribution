import request from '@/utils/request'

export function queryGoodsOrder(params){
    return request({
        url: '/dealerOrder/queryGoodsOrder',
        method: 'get',
        params
    })
}

export function receiveGoodsOrder(data){
    return request({
        url: '/dealerOrder/receiveGoodsOrder',
        method: 'post',
        data
    })
}

export function cancleGoodsOrder(data){
    return request({
        url: '/dealerOrder/cancleGoodsOrder',
        method: 'post',
        data
    })
}

