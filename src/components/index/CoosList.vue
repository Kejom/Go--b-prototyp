<template>
  <q-separator class="divider" size="10px" color="accent" />
  <q-list>
    <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
      <coo v-for="coo in coos" :key="coo.id" :coo="coo" class="coo" @removeClicked="removeCoo"
        @likeClicked="toggleLike" />
    </transition-group>
  </q-list>
</template>

<script>
import Coo from './Coo.vue'
import { db } from 'src/boot/firebase';
import { deleteDoc, updateDoc, doc, increment, addDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useUserDataStore } from 'src/stores/user-data-store';

export default {
  components: {
    Coo
  },
  props: {
    coos: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
  name: 'CoosList',
  setup() {
    const userStore = useUserDataStore();
    const removeCoo = async (id) => {
      await deleteDoc(doc(db, 'coos', id));
    }

    const toggleLike = async (coo) => {
      const liked = userStore.loggedUserLikes.has(coo.id);

      const incVal = liked? -1 : 1;

      const cooRef = doc(db, 'coos', coo.id);
      await updateDoc(cooRef, {
        likes: increment(incVal)
      })

      if(liked)
        removeUserLike(coo);
      else
        addUserLike(coo);
    }

    const addUserLike = async(coo) =>{
      const newLike = {
        userId : userStore.loggedUserRef.uid,
        cooId: coo.id
      }

      await addDoc(collection(db, 'likes'), newLike);
      userStore.loggedUserLikes.add(coo.id);
    }

    const removeUserLike = async(coo) =>{
      const q = query(collection(db, 'likes'), where('userId', '==', userStore.loggedUserRef.uid), where('cooId', '==', coo.id));
      const snapshot = await getDocs(q)

      snapshot.forEach(doc => deleteDoc(doc.ref));
      userStore.loggedUserLikes.delete(coo.id);
    }

    return {
      removeCoo,
      toggleLike
    }
  }
}
</script>

<style lang="sass" scoped>
.coo:not(:first-child)
  border-top: 5px solid $accent
</style>