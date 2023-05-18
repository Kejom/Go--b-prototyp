<template>
  <q-item>
    <q-item-section avatar>
      <q-avatar>
        <img :src="user.avatarUrl">
      </q-avatar>
    </q-item-section>

    <q-item-section>
      <q-item-label lines="1">{{ user.name }} <span class="text-grey-7">@{{ user.handle }}</span></q-item-label>
      <q-item-label>

        {{ comment.text }}
      </q-item-label>
    </q-item-section>

    <q-item-section side top>
      <q-item-label>{{ relativeDate(comment.date) }} temu</q-item-label>
      <q-btn flat round color="grey" :icon="comment.userId === loggedUserId ? 'fas fa-trash' : ''" size="sm"
        @click="removeClicked" :disable="comment.userId !== loggedUserId" />
    </q-item-section>
  </q-item>
</template>

<script>
import { onMounted, ref } from 'vue';
import { useUserDataStore } from 'src/stores/user-data-store';
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
export default {
  name: "Comment",
  props: {
    comment: {
      type: Object,
      required: true,
      default: () => { },
    }
  },
  setup(props, { emit }) {
    const userStore = useUserDataStore();
    const user = ref({});
    const loggedUserId = userStore.loggedUserRef ? userStore.loggedUserRef.uid : null;
    const relativeDate = (value) => formatDistance(value, Date.now(), { locale: pl });

    const removeClicked = () => emit("removeClicked", props.comment.id);


    onMounted(async () => {
      const userData = await userStore.getUser(props.comment.userId);
      user.value = userData;
    })

    return {
      user,
      userStore,
      loggedUserId,
      relativeDate,
      removeClicked
    }
  }
}
</script>

<style lang="sass" scoped>

</style>