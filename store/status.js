export const state = () => ({
  notifcations: {
    github: false,
    gitlab: false,
    slack: false,
    email: false,
  },
  kintai: 0,
  message: "Hello!",
  messages: []
})

export const mutations = {
  set(state, t) {
    state.notifcations = t.notifcations
    state.message = t.message
  },
  notifcations(state, t) {
    state.notifcations.github = t.github
    state.notifcations.gitlab = t.gitlab
    state.notifcations.slack = t.slack
    state.notifcations.email = t.email
  },
  message(state, t){
    state.message = t
  }
}

export const actions = {
}
