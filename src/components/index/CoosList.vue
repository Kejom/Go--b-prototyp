<template>
        <q-separator class="divider" size="10px" color="accent" />
      <q-list>
        <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
          <coo v-for="coo in coos" :key="coo.id" :coo="coo" class="coo" @removeClicked="removeCoo" @likeClicked="toggleLike"/>
        </transition-group>
      </q-list>
</template>

<script>
import Coo from './Coo.vue'
import { db } from 'src/boot/firebase';
import { deleteDoc, updateDoc, doc } from 'firebase/firestore';

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
setup(){
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
        removeCoo,
        toggleLike
    }
}
}
</script>

<style lang="sass" scoped>

</style>