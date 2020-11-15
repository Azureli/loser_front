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
export function orderDish(data){
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

export function updateDish(data) {
  return request ({
    url: '/editDish',
    method: "post",
    data
  })
}

export function fetchCanteenList() {
  return request ({
    url: '/getCanteen',
    method: "post"
  })
}

export function register(data) {
  return request ({
    url: '/register',
    method: "post",
    data
  })
}

export function deleteDish(data) {
  return request ({
    url: '/deleteDish',
    method: "post",
    data
  })
}

export function searchDish(data) {
  return request ({
    url: '/searchDish',
    method: "post",
    data
  })
}