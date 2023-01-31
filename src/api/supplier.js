import request from '@/utils/request'

export function getgoodsinfo(params){
    return request({
        url: '/inStorage/getgoodsinfo',
        method: 'get',
        params
    })
}

export function insertGoods(data){
    return request({
        url: '/inStorage',
        method: 'post',
        data
    })
}

export function updateGoods(data){
    return request({
        url: '/inStorage',
        method: 'put',
        data
    })
}


export function queryGoodsOrder(params){
    return request({
        url: '/supplierOrder/queryGoodsOrder',
        method: 'get',
        params
    })
}   

export function orderCancle(data){
    return request({
        url: '/supplierOrder/orderCancle',
        method: 'post',
        data
    })
}  

export function orderSend(data){
    return request({
        url: '/supplierOrder/orderSend',
        method: 'post',
        data
    })
}  

export function confirmOrder(data){
    return request({
        url: '/supplierOrder/confirmOrder',
        method: 'post',
        data
    })
}  
