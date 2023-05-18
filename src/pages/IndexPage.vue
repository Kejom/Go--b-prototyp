<template>
  <q-page class="flex flex-center">
    <q-scroll-area class="absolute full-width full-height">
      <login-form class="lt-md" v-if="!userStore.loggedUserRef"/>
      <coo-form v-else-if="userStore.loggedUser" @add-clicked="addCoo" />
      <q-btn-group v-else spread class="q-ma-md">
                <q-btn label="Aby dodawać gruchnięcia musisz uzupełnić swój profil"  color="primary" text-color="accent" to="/editprofile" />
            </q-btn-group>
<coos-list :coos="cooStore.getCoos"/>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, computed } from 'vue';
import { collection, doc, addDoc, deleteDoc, updateDoc } from "firebase/firestore";
import {db } from 'src/boot/firebase';
import CooForm from 'src/components/index/CooForm.vue';
import Coo from 'src/components/index/Coo.vue';
import CoosList from 'src/components/index/CoosList.vue';
import LoginForm from 'src/components/index/LoginForm.vue';
import { useUserDataStore } from 'src/stores/user-data-store';
import { useCooStore } from 'src/stores/coo-store';


export default defineComponent({
  name: 'IndexPage',
  components: {
    CooForm,
    Coo,
    CoosList,
    LoginForm
  },
  setup() {
    const cooStore = useCooStore();
    const userStore = useUserDataStore();

    const addCoo = async ({ cooText }) => {
      let newCoo = {
        content: cooText,
        date: Date.now(),
        userId: userStore.loggedUserRef.uid,
        comments: 0,
        likes: 0
      }
      const newCooRef = await addDoc(collection(db, 'coos'), newCoo);
    }




    return {
      cooStore,
      addCoo,
      userStore
    }
  }
})
</script>
<style lang="sass">
.coo:not(:first-child)
  border-top: 5px solid $accent
</style>
