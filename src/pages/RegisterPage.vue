<template>
    <register-form v-if="!userStore.loggedUserRef" />
    <user-profile-form v-else-if="!userStore.loggedUser" />
</template>

<script>
import RegisterForm from 'src/components/register/RegisterForm.vue';
import UserProfileForm from 'src/components/register/UserProfileForm.vue';
import { useUserDataStore } from 'src/stores/user-data-store';
import { onMounted } from 'vue';
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

        onMounted(() => {
            if (userStore.loggedUserRef && userStore.loggedUser)
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