<template>
    <register-form v-if="!userStore.loggedUserRef" />
    <user-profile-form v-else />
</template>

<script>
import RegisterForm from 'src/components/register/RegisterForm.vue';
import UserProfileForm from 'src/components/register/UserProfileForm.vue';
import { useUserDataStore } from 'src/stores/user-data-store';
import { onActivated } from 'vue';
import { useRouter } from 'vue-router';

export default {
    components: {
        RegisterForm,
        UserProfileForm
    },
    name: 'RegisterPage',
    setup() {
        const userStore = useUserDataStore();
        const router = useRouter();

        onActivated(() => {
            if(userStore.loggedUserRef)
                router.push("/");
        })

        return {
            userStore
        }
    }
}
</script>

<style lang="sass" scoped>

</style>