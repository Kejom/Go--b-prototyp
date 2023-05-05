<template>
  <q-layout view="lHr lpR fFf">

    <q-header bordered class="bg-white text-black">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-weight-bold">
          <q-avatar class="q-mx-sm lt-md">
            <img src="../assets/golab-logo.jpg">
          </q-avatar>
          <span class="gt-sm q-ml-sm"> {{ route.name }}</span>
          
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-avatar class="q-mx-sm">
            <img src="../assets/golab-logo.jpg">
          </q-avatar>
      <navigation/>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container class="fit">
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
import { ref} from 'vue'
import { useRoute } from 'vue-router'
import Navigation from 'src/components/layout/Navigation.vue'

export default {
  components: {
    Navigation
  },
  setup () {
    const route = useRoute()
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      route
    }
  }
}
</script>