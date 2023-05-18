<template>
  <q-item class="qweet q-py-md">
    <q-item-section avatar top>
      <q-btn flat :to="`/${user.handle}`">
      <q-avatar size="xl">
        <img :src="user.avatarUrl">
      </q-avatar>
    </q-btn>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1">
        <strong>{{ user.name }}</strong>
        <span class="text-grey-7"> @{{ user.handle }}
          <br class="lt-md">&bull; {{ relativeDate(coo.date) }} temu
        </span>
      </q-item-label>

        <q-item-label class="qweet-content text-body1">
        {{ coo.content }}
      </q-item-label>


      <div class="qweet-icons row justify-around q-mt-md">
        <q-btn flat round color="grey" icon="far fa-comment" size="sm" :to="`/${user.handle}/${coo.id}`" :label="coo.comments" text-color="primary" />
        <q-btn flat round color="grey" icon="fas fa-retweet" size="sm" text-color="primary"/>
        <q-btn flat round :color="isLiked ? 'pink' : 'grey'" :icon="isLiked? 'fas fa-heart' : 'far fa-heart'"
          size="sm" @click="likeClicked" :label="coo.likes" text-color="primary" :disable="!loggedUserId"/>
        <q-btn flat round color="grey" :icon="loggedUserId === coo.userId ? 'fas fa-trash': ''" size="sm" @click="removeClicked" :disable="loggedUserId !== coo.userId" text-color="primary"/>
      </div>
    </q-item-section>

  </q-item>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import { useUserDataStore } from 'src/stores/user-data-store'
export default {
  name: 'Coo',
  props: {
    coo: {
      type: Object,
      required: true,
      default: () => { },
    }
  },
  setup(props, { emit }) {
    const userStore = useUserDataStore();
    const loggedUserId = userStore.loggedUserRef ? userStore.loggedUserRef.uid: null;
    const user = ref({})
    const isLiked = computed(() => userStore.loggedUserLikes.has(props.coo.id))
    const removeClicked = () => emit("removeClicked", props.coo.id)

    const likeClicked = () => emit("likeClicked", props.coo);

    const relativeDate = (value) => formatDistance(value, Date.now(), { locale: pl })

    onMounted(async() => {
      const userProfile = await userStore.getUser(props.coo.userId);
      user.value = userProfile;
    })
    return {
      user,
      loggedUserId,
      isLiked,
      removeClicked,
      likeClicked,
      relativeDate
    }
  }
}
</script>

<style lang="sass" scoped></style>