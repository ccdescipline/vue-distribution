import request from '@/utils/request'

export function getgoodsinfo(params){
    return request({
        url: '/goods',
        method: 'get',
        params
    })
}

export function updategoodsinfo(data){

    return request({
        url: '/goods',
        method: 'put',
        data
    })
}