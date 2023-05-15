<template>
  <q-page class="flex flex-center">
    <q-scroll-area class="absolute full-width full-height">
      <login-form v-if="!userStore.loggedUserRef"/>
      <coo-form v-else-if="userStore.loggedUser" @add-clicked="addCoo" />
      <q-btn-group v-else spread class="q-ma-md">
                <q-btn label="Aby dodawać gruchnięcia musisz uzupełnić swój profil"  color="primary" text-color="accent" to="/editprofile" />
            </q-btn-group>
<coos-list :coos="cooStore.coos"/>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
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
        liked: false,
        userId: userStore.loggedUserRef.uid
      }
      const newCooRef = await addDoc(collection(db, 'coos'), newCoo);
    }

    const removeCoo = async (id) => {
      await deleteDoc(doc(db, 'coos', id));
    }

    const toggleLike = async(coo) => {
      const cooRef = doc(db, 'coos', coo.id);
      await updateDoc(cooRef, {
        liked: !coo.liked
      })
    }



    return {
      cooStore,
      addCoo,
      removeCoo,
      toggleLike,
      userStore
    }
  }
})
</script>
<style lang="sass">
.coo:not(:first-child)
  border-top: 5px solid $accent
</style>
