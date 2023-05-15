<template>
    <user-profile-form />
</template>

<script>
import UserProfileForm from 'src/components/register/UserProfileForm.vue'
import { useUserDataStore } from 'src/stores/user-data-store'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
export default {
    components: {
        UserProfileForm
    },
    name: 'UserProfileEditPage',
    setup() {
        const userStore = useUserDataStore();
        const router = useRouter();

        onMounted(() => {
            if(!userStore.loggedUserRef)
                router.push("/");
        })
    }
}
</script>

<style lang="sass" scoped>

</style>