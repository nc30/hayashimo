export const state = () => ({
  loading: false,
})

export const mutations = {
  loader(state, flag) {
    state.loading = flag
  }
}

