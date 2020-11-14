import request from '@/utils/request'

export function fetchDishes(query) {
  return request({
    url: '/getDishOnSale',
    method: 'post',
    params: query
  })
}
