import request from '@/utils/request'

export function getcurrentReceiveAdress(){
    return request({
        url: 'dealerMarket/receiveaddress',
        method: 'get',
    })
}

export function insetReceiveAdress(data){
    return request({
        url: 'dealerMarket/receiveaddress',
        method: 'post',
        data
    })
}

export function updateReceiveAdress(data){
    return request({
        url: 'dealerMarket/receiveaddress',
        method: 'put',
        data
    })
}

export function removeReceiveAdress(data){
    return request({
        url: 'dealerMarket/receiveaddress',
        method: 'delete',
        data
    })
}