<template>
  <q-item class="qweet q-py-md">
    <q-item-section avatar top>
      <q-avatar size="xl">
        <img src="../../assets/golab-default-avatar.jpg">
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-item-label class="text-subtitle1">
        <strong>User Name</strong>
        <span class="text-grey-7"> @user_handle
          <br class="lt-md">&bull; {{ relativeDate(coo.date) }}
        </span>
      </q-item-label>
      <q-item-label class="qweet-content text-body1">
        {{ coo.content }}
      </q-item-label>
      <div class="qweet-icons row justify-around q-mt-lg">
        <q-btn flat round color="grey" icon="far fa-comment" size="sm" />
        <q-btn flat round color="grey" icon="fas fa-retweet" size="sm" />
        <q-btn flat round :color="coo.liked ? 'pink' : 'grey'" :icon="coo.liked ? 'fas fa-heart' : 'far fa-heart'"
          size="sm" @click="likeClicked"/>
        <q-btn flat round color="grey" icon="fas fa-trash" size="sm" @click="removeClicked" />
      </div>
    </q-item-section>

  </q-item>
</template>

<script>
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
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
  
    const removeClicked = () => emit("removeClicked", props.coo.id)


    const likeClicked = () => emit("likeClicked", props.coo);

    const relativeDate = (value) => formatDistance(value, Date.now(), { locale: pl })
    return {
      removeClicked,
      likeClicked,
      relativeDate
    }
  }
}
</script>

<style lang="sass" scoped></style>