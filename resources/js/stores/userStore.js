import { defineStore } from "pinia";

export const userStore = defineStore('user', {
    state: () => ({
      user: null,
      access_token : null,
      cart_count: 0,
      subscription: false,
    }),

    getters: {
      authUser: (state) => {
        return state.user
      },

      accessToken: (state) => {
        return state.access_token
      },

    },

    persist: true,
});
