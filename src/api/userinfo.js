import request from '@/utils/request'

export function getUserinfo(params){
    return request({
        url: '/User',
        method: 'get',
        params
    })
}

export function resetpwd(username){
    return request({
        url: '/User/resetpwd',
        method: 'post',
        data:{
            username
        }
    })
}

export function updateuserinfo(data){
    return request({
        url: '/User',
        method: 'post',
        data
    })
}