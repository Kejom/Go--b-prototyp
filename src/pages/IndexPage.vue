<template>
  
  <q-page class="flex flex-center">
    <q-scroll-area class="absolute full-width full-height">
      <coo-form @add-clicked="addCoo"/>
      <q-separator class="divider" size="10px" color="accent" />
      <q-list>
        <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
          <coo v-for="coo in coos" :key="coo.id" :coo="coo" class="coo" @removeClicked="removeCoo" />
        </transition-group>
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
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

    const addCoo = ({ cooText }) => {
      coos.value.unshift({
        id: Date.now(),
        content: cooText,
        date: Date.now(),
      })
    }

    const removeCoo = (id) => {
      coos.value = coos.value.filter(c => c.id !== id)
    }

    return {
      coos,
      addCoo,
      removeCoo
    }
  }
})
</script>
<style lang="sass">
.coo:not(:first-child)
  border-top: 5px solid $accent
</style>
