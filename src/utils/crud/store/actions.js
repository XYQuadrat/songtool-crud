import Vue from 'vue'

const actions = {
  // table data
  getItems ({ commit, getters, dispatch }) {
    Vue.http.get(getters.path('i'))
      .then((response) => {
        commit('setItems', response.body)
      }, (error) => {
        dispatch('openAlertBox', [
          'alertError',
          error.statusText,
        ], { root: true })
      })
  },
  // item details
  getItem ({ commit, getters, dispatch }, [id]) {
    return new Promise((resolve, reject) => {
      Vue.http.get(`${getters.path('sh')}/${id}`)
        .then((response) => {
          commit('setItem', response.body)
          resolve()
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            error.statusText,
          ], { root: true })
          reject(error)
        })
    })
  },
  updateItem ({
    getters, dispatch,
  }, [
    id,
    params,
    successText,
    errorText,
  ]) {
    return new Promise((resolve, reject) => {
      Vue.http.put(`${getters.path('u')}/${id}`, params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            dispatch('runItemsViewRefreshing')
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            errorText,
          ], { root: true })
          reject(error)
        })
    })
  },
  storeItem ({
    commit, state, getters, dispatch,
  }, [
    params,
    successText,
    errorText,
  ]) {
    return new Promise((resolve, reject) => {
      Vue.http.post(getters.path('st'), params)
        .then((response) => {
          if (response.body.status === 0) {
            dispatch('openAlertBox', [
              'alertSuccess',
              successText,
            ], { root: true })
            dispatch('runItemsViewRefreshing')
            resolve()
          } else if (response.body.status === -1) {
            dispatch('openAlertBox', [
              'alertError',
              response.body.msg,
            ], { root: true })
          } else if (response.body.status === -2) {
            dispatch('openAlertBox', [
              'alertValidationError',
              response.body.msg,
            ], { root: true })
          }
        }, (error) => {
          dispatch('openAlertBox', [
            'alertError',
            errorText,
          ], { root: true })
          reject(error)
        })
    })
  },
  deleteItem ({
    getters, dispatch,
  }, [
    id,
    successText,
    errorText,
  ]) {
    Vue.http.delete(`${getters.path('d')}/${id}`)
      .then(() => {
        dispatch('openAlertBox', [
          'alertSuccess',
          successText,
        ], { root: true })
        dispatch('runItemsViewRefreshing')
      }, () => {
        dispatch('openAlertBox', [
          'alertError',
          errorText,
        ], { root: true })
      })
  },
  runItemsViewRefreshing ({ commit }) {
    commit('refreshTable', true)
    setTimeout(() => {
      commit('refreshTable', false)
    }, 2000)
  },
}

export default actions
