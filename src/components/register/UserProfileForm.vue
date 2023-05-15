<template>
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto;">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="text" v-model="formData.profileName" label="Nazwa Profilu" lazy-rules
                :rules="[val => val && val.length > 0 || 'Nazwa użytkownika nie może być pusta!']" />
            <q-input filled type="text" v-model="formData.handle" label="Identyfikator Użytkownika" lazy-rules
                :rules="[val => val && val.length > 0 || 'Identyfikator Użytkownika nie może być pusty']" :disable="!!userStore.loggedUser" />
            <q-input v-model="formData.profileDescription" label="Opis Profilu" filled autogrow />
            <div class="row">
                <div class="col">
                    <q-avatar v-if="formData.avatarPreview" size="5rem">
                        <img :src="formData.avatarPreview">
                    </q-avatar>
                </div>
                <div class="col-8">

                    <q-file v-model="formData.avatar" label="Dodaj zdjecie profilowe" @update:model-value="updatePreview" />
                </div>
            </div>
            <q-btn-group spread class="q-ma-md">
                <q-btn label="Zapisz Zmiany" type="submit" color="primary" text-color="accent" />
            </q-btn-group>
        </q-form>
    </div>
</template>

<script>
import { reactive, onMounted } from 'vue'
import { saveUserAvatar, setUserProfileData } from 'src/boot/firebase'
import { useUserDataStore } from 'src/stores/user-data-store'
import { useRouter } from 'vue-router';
export default {
    name: 'UserProfileForm',
    setup() {
        const router = useRouter();
        const userStore = useUserDataStore();

        const formData = reactive({
            profileName: '',
            handle: '',
            profileDescription: '',
            avatar: null,
            avatarPreview: null
        })

        onMounted(() => {
            if (userStore.loggedUser) {
                formData.profileName = userStore.loggedUser.name;
                formData.handle = userStore.loggedUser.handle;
                formData.profileDescription = userStore.loggedUser.description;
                formData.avatarPreview = userStore.loggedUser.avatarUrl;
            }
        })




        const updatePreview = (val) => {
            formData.avatarPreview = URL.createObjectURL(val);
        }

        const onSubmit = async () => {
            const userId = userStore.loggedUserRef.uid;
            let avatarLink = "";

            if(userStore.loggedUser && !formData.avatar)
                avatarLink = userStore.loggedUser.avatarUrl;
            else
                avatarLink = await saveUserAvatar(formData.avatar);

            const userProfile = {
                name: formData.profileName,
                handle: formData.handle,
                avatarUrl: avatarLink,
                description: formData.profileDescription
            };

            const user = await setUserProfileData(userId, userProfile);
            user.id = userId;
            userStore.loggedUser = user;
            userStore.updateUserInCache(user);
            router.push("/");
        }


        return {
            formData,
            updatePreview,
            onSubmit,
            userStore
        }
    }
}
</script>

<style lang="sass" scoped>

</style>