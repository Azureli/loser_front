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

export function viewOrderNow(data) {
  return request ({
    url: '/viewOrderNow',
    method: "post",
    data
  })
}


export function viewOrderHistory(data) {
  return request ({
    url: '/viewOrderHistory',
    method: "post",
    data
  })
}

export function confirmOrder(data) {
  return request ({
    url: '/confirmOrder',
    method: "post",
    data
  })
}

export function addComment(data) {
  return request ({
    url: '/addComment',
    method: "post",
    data
  })
}
export function chefViewOrder(data) {
  return request ({
    url: '/chefViewOrderNow',
    method: "post",
    data
  })
}
export function chefViewOrderHistory(data) {
  return request ({
    url: '/chefViewOrderHistory',
    method: "post",
    data
  })
}

