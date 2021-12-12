import { createStore } from 'vuex'
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3001/api'
})

export default createStore({
  state: {
    responseSuccessMessage: null,
    responseErrorMessage: null
  },
  mutations: {
      SUCCESS_MESSAGE(state, message) {
      state.responseSuccessMessage = message
    },
    ERROR_MESSAGE(state, message) {
      state.responseErrorMessage = message
      setTimeout(() => {
        state.responseErrorMessage = null
      }, 3000)
    }
  },
  actions: { 
    async creatAccount({ context, commit, }, user) {
      try {
        let result = await instance.post('/auth/signup', {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          password: user.password
        })
        if (result.status === 201) {
          commit('SUCCESS_MESSAGE', result.data.message)
          // state.responseSuccessMessage = result.data.message
        }
      } catch (err) {
        if (err.response.status === 409) {
          context, // Put this line to avoid eslint errors!
          commit('ERROR_MESSAGE', err.response.data.message)
        } else {
          console.log(err)
        }
      }
    }
  },
  modules: {}
})
