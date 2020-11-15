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
