<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from 'vue'
import { useUserDataStore } from 'src/stores/user-data-store';
import { onAuthStateChangedListener, getUserProfileData } from 'src/boot/firebase';
export default defineComponent({
  name: 'App',
  setup() {
    const userStore = useUserDataStore();
    const authStateChangeHandler = async (user) => {
      userStore.setCurrentUser(user);
      if(!user)
        return;
      const userProfile = await getUserProfileData(user.uid);
      userStore.loggedUser = userProfile;
    }
    onMounted(() => {
      onAuthStateChangedListener((user) => authStateChangeHandler(user));
    })
  }
})
</script>
