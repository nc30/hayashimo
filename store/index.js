export const state = () => ({
  loading: false,
  connected: false,
})

export const mutations = {
  loader(state, flag) {
    state.loading = flag
  },
  connection(state, flag){
    state.connected = flag
  }
}

