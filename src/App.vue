<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useUserDataStore } from 'src/stores/user-data-store';
import { onAuthStateChangedListener, getUserProfileData } from 'src/boot/firebase';
import {collection, query, onSnapshot, orderBy, where, getDocs} from 'firebase/firestore'
import {db } from 'src/boot/firebase';
import {useCooStore} from 'src/stores/coo-store'

export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserDataStore();
    const cooStore = useCooStore();

    const authStateChangeHandler = async (user) => {
      userStore.setCurrentUser(user);
      userStore.setCurrentUserLikes(new Set());
      if(!user)
        return;
      const userProfile = await getUserProfileData(user.uid);
      userStore.loggedUser = userProfile;

      const q = query(collection(db, 'likes'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q)
      const likes = new Set();
      snapshot.forEach(doc => {
        let like = doc.data();
        likes.add(like.cooId)
      });
      userStore.setCurrentUserLikes(likes);
    }

    const watchCoos = () => {
      console.log("watch started");
      const q = query(collection(db, 'coos'), orderBy('date'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let changedCoo = change.doc.data();
          changedCoo.id = change.doc.id;

          if (change.type === "added") {
            cooStore.addCoo(changedCoo);
          }
          if (change.type === "modified") {
            cooStore.editCoo(changedCoo);
          }
          if (change.type === "removed") {
            cooStore.removeCoo(changedCoo);
          }
        })
      })
    }
    onMounted(() => {
      onAuthStateChangedListener((user) => authStateChangeHandler(user));
      watchCoos();
    })
  }
})
</script>
