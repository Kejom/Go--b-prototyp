<template>
    <user-profile v-if="user" :user="user"/>
    <coos-list :coos="coos"/>
</template>

<script>
import { ref, onActivated, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { getCoosByUserId, getUserProfileDataByHandle } from 'src/boot/firebase';
import UserProfile from 'src/components/shared/UserProfile.vue';
import CoosList from 'src/components/index/CoosList.vue';
export default {
    components: {
        UserProfile,
        CoosList
    },
    name: 'UserProfilePage',
    setup() {
        const route = useRoute();
        const router = useRouter();
        const user = ref(null);
        const coos = ref([]);



        onActivated(async () => {
            const userData = await getUserProfileDataByHandle(route.params.userHandle);

            if (!userData)
                router.go(-1);


            user.value = userData;

            const coosData = await getCoosByUserId(userData.id);
            coos.value = coosData;
        })

        return {
            user,
            coos
        }

    }
}
</script>

<style lang="sass" scoped>

</style>