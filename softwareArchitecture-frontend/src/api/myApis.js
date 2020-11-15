import request from '@/utils/request'

export function fetchDishes(query) {
  return request({
    url: '/getDishOnSale',
    method: 'post',
    params: query
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
