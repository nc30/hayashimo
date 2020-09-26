export const state = () => ({
  notifcations: {
    github: false,
    gitlab: false,
    slack: false,
    email: false,
  },
  kintai: 0,
  messages: [
    {
      type: 'normal',
      message: ''
    }
  ]
})

export const mutations = {
  set(state, t) {
  },
}

export const actions = {
}
