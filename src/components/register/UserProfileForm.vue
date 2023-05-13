<template>
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto;">
        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="text" v-model="formData.profileName" label="Nazwa Profilu" lazy-rules
                :rules="[val => val && val.length > 0 || 'Nazwa użytkownika nie może być pusta!']" />
            <q-input filled type="text" v-model="formData.handle" label="Identyfikator Użytkownika" lazy-rules
                :rules="[val => val && val.length > 0 || 'Identyfikator Użytkownika nie może być pusty']" />
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
import { ref, reactive } from 'vue'
import { saveUserAvatar, setUserProfileData } from 'src/boot/firebase'
import { useUserDataStore } from 'src/stores/user-data-store'
export default {
    name: 'UserProfileForm',
    setup() {
        const userStore = useUserDataStore();

        const formData = reactive({
            profileName: '',
            handle: '',
            avatar: null,
            avatarPreview: null
        })




        const updatePreview = (val) => {
            formData.avatarPreview = URL.createObjectURL(val);
        }

        const onSubmit = async () => {
            const userId = userStore.loggedUserRef.uid;
            const avatarLink = await saveUserAvatar(formData.avatar);
            
            const userProfile = {
                name: formData.profileName,
                handle: formData.handle,
                avatarUrl: avatarLink
            };

            const user = await setUserProfileData(userId, userProfile);
            userStore.loggedUser = user;
        }

        return {
            formData,
            updatePreview,
            onSubmit
        }
    }
}
</script>

<style lang="sass" scoped>

</style>