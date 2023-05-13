import { defineStore } from 'pinia';
import { getUserProfileData } from 'src/boot/firebase';

export const useUserDataStore = defineStore('userData', {
state : () => ({
    loggedUserRef: null,
    loggedUser: null,
    userCache: {}
}),
actions: {
    setCurrentUser(user) {this.loggedUserRef = user},
    async getUser(userId){
        if(Object.hasOwn(this.userCache, userId))
            return this.userCache[userId];

        const user = await getUserProfileData(userId);
        this.userCache[userId] = user;
        return user;
    }
}
})