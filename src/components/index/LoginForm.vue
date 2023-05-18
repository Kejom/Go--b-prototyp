<template>
    <div class="q-pa-md" style="max-width: 400px; margin: 0 auto;">

        <q-form @submit="onSubmit" class="q-gutter-md">
            <q-input filled type="email" v-model="email" label="Email" lazy-rules
                :rules="[val => val && val.length > 0 || 'Email nie może być pusty!']" />

            <q-input filled type="password" v-model="password" label="Hasło" lazy-rules
                :rules="[val => val && val.length > 0 || 'Hasło nie może być puste!']" />


            <div class="column">
                <q-btn label="Zaloguj" type="submit" color="primary" text-color="accent" class="q-ma-sm" />
                    <q-btn label="Zaloguj z Google" type="button" color="red" @click="onGoogleLogin" class="q-ma-sm"/>

                    <q-btn label="Zarejestruj Nowe Konto" color="accent" text-color="primary"  to="/register" class="q-ma-sm" />



            </div>
        </q-form>

    </div>
</template>

<script>
import { ref } from 'vue'
import { logInWithGoogle, logInWithEmailAndPassword } from 'src/boot/firebase';
export default {
    name: 'LoginForm',
    setup() {
        const email = ref("");
        const password = ref("");
        const onSubmit = () => {
            logInWithEmailAndPassword(email.value, password.value);
        }

        const onGoogleLogin = async() => {
            await logInWithGoogle();
            window.location.reload();
        }   

        return {
            email,
            password,
            onSubmit,
            onGoogleLogin
        }
    }
}
</script>

<style lang="sass" scoped>

</style>