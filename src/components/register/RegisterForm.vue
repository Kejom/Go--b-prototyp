<template>
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto;">

        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="email" v-model="formData.email" label="Email" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email nie może być pusty!']" />

            <q-input filled type="password" v-model="formData.password" label="Hasło" lazy-rules
                :rules="[val => val && val.length > 0 || 'Hasło nie może być puste!']" />

            <q-input filled type="password" v-model="formData.confirmPassword" label="Potwierdź Hasło" lazy-rules
                :rules="[val => val && val.length > 0 || 'Hasło nie może być puste!']" />


            <q-btn-group spread>
                <q-btn label="Stwórz Konto" type="submit" color="primary" text-color="accent" />
            </q-btn-group>
        </q-form>

    </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { reactive } from 'vue'
import {useRouter} from  'vue-router'
import { createUserAccount } from 'src/boot/firebase'
export default {
    name: "RegisterForm",
    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const formData = reactive({
            email: '',
            password: '',
            confirmPassword: '',
        })

        const onSubmit = async () => {
            if (formData.password != formData.confirmPassword)
                return $q.notify({
                    color: 'red-5',
                    textColor: 'white',
                    icon: 'warning',
                    message: 'pola hasło oraz potwierdź hasło zawierają różne wartości'
                })

            await createUserAccount(formData.email, formData.password);
            router.push("/");
        }
        return {
            formData,
            onSubmit
        }
    }
}
</script>

<style lang="sass" scoped>

</style>