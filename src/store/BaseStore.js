import { defineStore } from 'pinia';

const useBaseStore = defineStore('BaseStore', {
  state: () => ({
    loggedIn: false,
  }),
  getters: {
  },
  actions: {
    setLoggedIn(value) {
      this.loggedIn = value;
    },
  },
});

export default useBaseStore;
