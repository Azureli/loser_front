import request from '@/utils/request'



export function fetchJobs(data) {
  return request({
    url: 'user/recruitment?position='+data.position+'&location'+data.location+'&offset=0&limit=20',
    method: 'get',
    data
  })
}
export function viewJob(data){
  return request({
    url:'company/recruitment_info/',
    method:'get',
    data
  })
}

export function addResume(data) {
  return request({
    url:'user/resume?userId='+data.id+'&pic='+data.avatar+'&education='+data.education+
    '&skill='+data.skill+'&experience='+data.experience+'&extra='+data.extra,
    method:'post',
    data
  })
}

export function submitResume(data){
  return request({
    url:'/user/resumeRecruitment/'+data.resumeId+'/'+data.jobId,
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

export function addRecruitment(data) {
  return request ({
    url: '/company/recruitment?companyId='+data.id+'&position='+data.position+'&location='+data.location+
    '&task='+data.task+'&salary='+data.salary+'&requirement='+data.requirement+'&people='+data.people+
    '&hr='+data.hr+ '&endTime='+data.endTime,
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
export function chefViewOrderNow(data) {
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


export function fetchCanteenList() {
  return request ({
    url: '/getCanteen',
    method: "post"
  })
}

export function registerUser(data) {
  return request ({
    url: '/user/register?name='+data.name+"&pwd="+data.pwd,
    method: "post",
    data
  })
}

export function registerChef(data) {
  return request ({
    url: '/company/register?name='+data.name+"&pwd="+data.pwd,
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

export function changeUserInfo(data) {
  return request ({
    url: '/editUserInfo',
    method: "post",
    data
  })
}
