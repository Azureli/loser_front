import { loginUser,loginChef, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import viewDishDetail from './app.js'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  birth:'',
  contract:'',
  id: '',
  canteen: ''
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET_CANTEEN: (state, canteen) => {
    state.canteen = canteen
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_BIRTH: (state, birth) => {
    state.birth = birth
  },
  SET_CONTRACT: (state, contract) => {
    state.contract = contract
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password,role } = userInfo
    // let fd = new FormData();
    // fd.append('username', username);
    // fd.append('password', password)
    if(role === 1){//求职者
      return new Promise((resolve, reject) => {
        loginUser({ username: username, password: password }).then(response => {
          console.log(response)
          commit('SET_ID', response.data.userId)
          commit('SET_NAME', response.data.name)
          commit('SET_ROLES', ['admin', 'user'])
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_TOKEN', 'token')
          commit('SET_BIRTH', response.data.birth)
          commit('SET_CONTRACT', response.data.contract)
          commit('SET_INTRODUCTION', response.data.introduction)
          setToken('token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
    else{//公司
      return new Promise((resolve, reject) => {
        loginChef({ username: username, password: password }).then(response => {
          console.log(response)
          commit('SET_ID', response.data.companyId)
          commit('SET_NAME', response.data.name)
          commit('SET_ROLES', ['admin', 'chef'])
          commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
          commit('SET_TOKEN', 'token')
          setToken('token')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }

  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      let fd = new FormData();
      fd.append('id', state.id)
      getInfo(fd).then(response => {
        console.log(response)
        const { roles, username } = response

        // roles must be a non-empty array
        if (!roles) {
          reject('getInfo: roles must be a non-null array!')
        }
        if (response.roles[0] === 'chef')
          commit('SET_CANTEEN', response.canteen)

        commit('SET_ROLES', roles)
        commit('SET_NAME', username)
        commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif')
        // commit('SET_INTRODUCTION', 'introduction')
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // login({ commit }, userInfo) {
  //   const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login({ username: username.trim(), password: password }).then(response => {
  //       const { data } = response
  //       console.log(data)
  //       commit('SET_TOKEN', data.token)
  //       setToken(data.token)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // // get user info
  // getInfo({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo(state.token).then(response => {
  //       const { data } = response
  //       console.log(data)

  //       if (!data) {
  //         reject('Verification failed, please Login again.')
  //       }

  //       const { roles, name, avatar, introduction } = data

  //       // roles must be a non-empty array
  //       if (!roles || roles.length <= 0) {
  //         reject('getInfo: roles must be a non-null array!')
  //       }

  //       commit('SET_ROLES', roles)
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', avatar)
  //       commit('SET_INTRODUCTION', introduction)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },


  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  async changeRoles({ commit, dispatch }, role) {
    const token = role + '-token'

    commit('SET_TOKEN', token)
    setToken(token)

    const { roles } = await dispatch('getInfo')

    resetRouter()

    // generate accessible routes map based on roles
    const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })
    // dynamically add accessible routes
    router.addRoutes(accessRoutes)

    // reset visited views and cached views
    dispatch('tagsView/delAllViews', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
