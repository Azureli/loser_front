import request from '@/utils/request'



export function fetchJobs(data) {
  return request({
    url: 'user/recruitment?position='+data.position+'&location='+data.location+'&offset=0&limit=20',
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

export function viewMyCompany(data){
  return request({
    url:'company/companyInfo/'+data,
    method:'get',
    data
  })
}

export function viewmyInfo(data){
  return request({
    url:'user/userInfo/'+data,
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

export function viewmypost(data){
  return request({
    url:'user/resumeRecruitment/'+data,
    method:'get',
    data
  })
}
export function viewmycv(data){
  return request({
    url:'user/resume/'+data,
    method:'get',
    data
  })
}
export function viewallpos(data){
  return request({
    url:'company/recruitment/'+data,
    method:'get',
    data
  })
}

export function changeUserInfo(data){
  return request({
    url:'user/userInfo?name='+data.name+'&birth='+data.birth+'&contact'+data.contact+'&introduction'+data.introduction,
    mothod:'put',
    data
  })
}
export function deletemycv(data){
  return request({
    url:'user/resumeRecruitment/'+data.resumeId+'/'+data.jobId,
    method:'delete',
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

export function updateRecruitment(data) {
  return request ({
    url: 'company/recruitment_info?recruitmentId='+data.id+'&position='+data.position+'&location='+data.location+
    '&task='+data.task+'&salary='+data.salary+'&requirement='+data.requirement+'&people='+data.people+
    '&hr='+data.hr+ '&endTime='+data.endTime,
    method: "put",
    data
  })
}

export function updateCompanyInfo(data) {
  return request ({
    url: 'company/companyInfo?companyId='+data.id+'&contact='+data.contact+'&icon='+data.icon+
    '&introduction='+data.introduction,
    method: "put",
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

export function Info(data) {
  return request ({
    url: '/editUserInfo',
    method: "post",
    data
  })
}

export function getPeopleList(id) {
  return request ({
    url: '/company/resume/' + id,
    method: "get"
  })
}

export function rejectResume(data) {
  return request ({
    url: '/company/resumeRecruitment?id=' + data.id+ '&status=' + data.status +"&message="+data.message,
    method: "put"
  })
}

export function acceptResume(data) {
  return request ({
    url: '/company/resumeRecruitment?id=' + data.id+ '&status=' + data.status +"&message="+data.message,
    method: "put"
  })
}

export function updateUserInfo(data) {
  return request ({
    url: 'user/userInfo?userId='+data.id+'&contact='+data.contact+
    '&introduction='+data.introduction+'&birth='+data.birth,
    method: "put"
  })
}
