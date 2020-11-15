import request from '@/utils/request'

export function fetchDishes(query) {
  return request({
    url: '/getDishOnSale',
    method: 'post',
    params: query
  })
}
export function viewDishDetail(data) {
  return request({
    url:'/viewDishDetail',
    method:'post',
    data
  })
}

export function viewComment(data){
  return request({
    url:'/viewComment',
    method:'post',
    data
  })
}
export function orderDish(query){
  return request({
    url:'/orderDish',
    method:'post',
    data
  })
}

export function addDish(data) {
  return request ({
    url: '/addDish',
    method: "post",
    data
  })
}
