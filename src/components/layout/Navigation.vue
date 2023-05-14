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

        <q-item v-if="userProfileNotFilled" clickable v-ripple to="/editprofile" exact>
          <q-item-section avatar>
            <q-icon name="person_add" size="md"  />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Uzupełnij Profil</q-item-section>
        </q-item>

        <q-item v-if="userStore.loggedUser" clickable v-ripple :to="`/${userStore.loggedUser.handle}`" exact>
          <q-item-section avatar>
            <q-icon name="person" size="md"  />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Profil</q-item-section>
        </q-item>

        <q-item v-if="userStore.loggedUser" clickable v-ripple to="/editprofile" exact>
          <q-item-section avatar>
            <q-icon name="manage_accounts" size="md"  />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Edytuj Profil</q-item-section>
        </q-item>

        <q-item v-if="userStore.loggedUserRef" clickable v-ripple @click="onLogout" exact>
          <q-item-section avatar>
            <q-icon name="logout" size="md"  />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Wyloguj</q-item-section>
        </q-item>

        <q-item v-else clickable v-ripple to="/register" exact>
          <q-item-section avatar>
            <q-icon name="person_add" size="md"  />
          </q-item-section>

          <q-item-section class="text-h6 text-weight-bold">Zarejestruj Konto</q-item-section>
        </q-item>

    </q-list>
</template>

<script>
import { computed } from 'vue';
import { useUserDataStore } from 'src/stores/user-data-store';
import { logOut } from 'src/boot/firebase';
export default {
    name: 'Navigation',
    setup(){
      const userStore = useUserDataStore();
      const userProfileNotFilled = computed(() =>  userStore.loggedUserRef && !userStore.loggedUser)

      const onLogout = async() => {
        await logOut();
        userStore.loggedUser = null;
      }

      return {
        userStore,
        userProfileNotFilled,
        onLogout
      }
    }
}
</script>

<style lang="sass">

</style>