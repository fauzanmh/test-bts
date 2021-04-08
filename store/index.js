import Vue from 'vue'

export const state = () => ({
  errors: {},
  snackbar: false,
  text: "",
  isLoading: false,
})

export const mutations = {
  setSnackbar(state, payload) {
    state.snackbar = payload
  },

  setIsLoading(state, payload) {
    state.isLoading = payload
  },

  setText(state, payload) {
    state.text = ""
      state.text = payload;
      },

}