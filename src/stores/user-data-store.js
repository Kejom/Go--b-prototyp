import { defineStore } from 'pinia';

export const useUserDataStore = defineStore('userData', {
state : () => ({
    loggedUserRef: null,
    loggedUser: null
}),
actions: {
    setCurrentUser(user) {this.loggedUserRef = user}
}
})