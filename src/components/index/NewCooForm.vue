<template>
    <div class="q-py-lg q-px-md row items-end q-col-gutter-md">
        <div class="col">
            <q-input class="new-Qweet" bottom-slots v-model="newCooText" placeholder="Podziel się czymś ciekawym."
                counter maxlength="280" autogrow>
                <template v-slot:before>
                    <q-avatar size="100px">
                        <img src="../../assets/golab-default-avatar.jpg">
                    </q-avatar>
                </template>
            </q-input>
        </div>
        <div class="col col-shrink">
            <q-btn unelevated rounded color="primary" label="Gruchnij" no-caps :disable="!newCooText" class="q-mb-lg"
                @click="addNewCoo" />
        </div>
    </div>
</template>

<script>
import {ref} from 'vue'
export default {
    name: 'NewCooForm',
    setup(){
        const newCooText = ref('');

        const addNewCoo = () => {
            console.log(newCoo);
        }

        return {
            newCooText,
            addNewCoo
        }
    }
}
</script>

<style></style>