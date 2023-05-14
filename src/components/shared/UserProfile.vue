<template>
      <q-card class="my-card" flat >
      <q-item>
        <q-item-section avatar>
          <q-avatar size="6em" class="gt-sm">
            <img :src="user.avatarUrl">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label >{{ user.name }}</q-item-label>
          <q-item-label caption>
            @{{ user.handle }}
          </q-item-label>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-card-section horizontal>
        <q-card-section v-if="user.description">
          {{user.description}}
        </q-card-section>



      </q-card-section>
    </q-card>
</template>

<script>
export default {
name: 'UserProfile',
props: {
    user: {
      type: Object,
      required: true,
      default: () => { },
    }
  },
setup(){

}
}
</script>

<style lang="sass" scoped>

</style>