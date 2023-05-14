<template>
        <q-card class="my-card" flat v-if="coo && user">
      <q-card-section horizontal>
        <q-card class="my-card2 col" flat>
        <q-item>
            <q-item-section avatar>
                <q-avatar size="4em" class="gt-sm">
                    <img :src="user.avatarUrl">
                </q-avatar>
            </q-item-section>

            <q-item-section>
                <q-item-label>{{ user.name }}</q-item-label>
                <q-item-label caption>
                    @{{ user.handle }}
                </q-item-label>
            </q-item-section>
        </q-item>

        <q-separator />

        <q-card-section horizontal>
            <q-card-section>
                {{ coo.content}}
            </q-card-section>



        </q-card-section>
    </q-card>

        <q-card-actions vertical class="justify-around q-px-md">
            <q-btn flat round :color="coo.liked ? 'pink' : 'grey'" :icon="coo.liked ? 'fas fa-heart' : 'far fa-heart'"
          size="sm"/>
        <q-btn flat round color="grey" icon="fas fa-trash" size="sm"  />
        </q-card-actions>
      </q-card-section>
    </q-card>


</template>

<script>
import { ref, onActivated } from 'vue'
import { useRoute } from 'vue-router'
import { getCooById } from 'src/boot/firebase';
import { useUserDataStore } from 'src/stores/user-data-store';
export default {
    name: 'CooPage',
    setup() {
        const route = useRoute();
        const userStore = useUserDataStore();
        const userHandle = ref(route.params.userHandle);
        const cooId = ref(route.params.cooId);
        const coo = ref(null);
        const user = ref(null)

        onActivated(async () => {
            const cooData = await getCooById(cooId.value);
            coo.value = cooData
            if(!coo.value)
                return;

            const userData = await userStore.getUser(coo.value.userId);
            console.log(userData);
            if(userData)
                user.value = userData;
        })

        return {
            coo,
            user
        }
    }
}
</script>

<style></style>