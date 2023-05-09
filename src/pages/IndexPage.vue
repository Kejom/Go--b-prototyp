<template>
  <q-page class="flex flex-center">
    <q-scroll-area class="absolute full-width full-height">
      <coo-form @add-clicked="addCoo" />
      <q-separator class="divider" size="10px" color="accent" />
      <q-list>
        <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
          <coo v-for="coo in coos" :key="coo.id" :coo="coo" class="coo" @removeClicked="removeCoo" @likeClicked="toggleLike"/>
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue';
import { collection, doc, addDoc, query, onSnapshot, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import db from 'src/boot/firebase';
import CooForm from 'src/components/index/CooForm.vue';
import Coo from 'src/components/index/Coo.vue';


export default defineComponent({
  name: 'IndexPage',
  components: {
    CooForm,
    Coo
  },
  setup() {
    let coos = ref([]);

    const addCoo = async ({ cooText }) => {
      let newCoo = {
        content: cooText,
        date: Date.now(),
        liked: false
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

    onMounted(() => {
      const q = query(collection(db, 'coos'), orderBy('date'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          let changedCoo = change.doc.data();
          changedCoo.id = change.doc.id;
          if (change.type === "added") {
            coos.value.unshift(changedCoo);
          }
          if (change.type === "modified") {
            let index = coos.value.findIndex(c => c.id === changedCoo.id);
            Object.assign(coos.value[index], changedCoo);
          }
          if (change.type === "removed") {
            coos.value = coos.value.filter(c => c.id !== changedCoo.id);
          }
        })
      })
    })

    return {
      coos,
      addCoo,
      removeCoo,
      toggleLike
    }
  }
})
</script>
<style lang="sass">
.coo:not(:first-child)
  border-top: 5px solid $accent
</style>
