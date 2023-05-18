import { defineStore } from 'pinia';
import { getUserProfileData } from 'src/boot/firebase';

export const useUserDataStore = defineStore('userData', {
state : () => ({
    loggedUserRef: null,
    loggedUser: null,
    userCache: {},
    loggedUserLikes: new Set()
}),
actions: {
    setCurrentUser(user) {this.loggedUserRef = user},
    setCurrentUserLikes(likes) {this.loggedUserLikes = new Set(likes)},
    async getUser(userId){
        if(Object.hasOwn(this.userCache, userId))
            return this.userCache[userId];

        const user = await getUserProfileData(userId);
        this.userCache[userId] = user;
        return user;
    },
    updateUserInCache(user) { this.userCache = {...this.userCache, [user.id] : user}}
}
})