<template>
  <q-list>      
        <q-item clickable v-ripple to="/" exact>
          <q-item-section avatar>
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Strona Główna</q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/about" exact>
          <q-item-section avatar>
            <q-icon name="help" size="md" />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Informacje o Aplikacji</q-item-section>
        </q-item>

    </q-list>
</template>

<script>
export default {
    name: 'Navigation'
}
</script>

<style lang="sass">

</style>