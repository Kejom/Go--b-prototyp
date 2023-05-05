<template>
  <q-page class="flex flex-center">
    <q-scroll-area class="absolute full-width full-height">
      <new-coo-form/>
    </q-scroll-area>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import NewCooForm from 'src/components/index/NewCooForm.vue';

export default defineComponent({
  name: 'IndexPage',
  components: {
    NewCooForm
  }
})
</script>
