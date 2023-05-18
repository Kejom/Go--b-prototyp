<template>
    <q-list>
        <transition-group appear enter-active-class="animated fadeIn slow" leave-active-class="animated fadeOut slow">
            <comment v-for="comment in comments" :key="comment.date" :comment="comment" class="comment" @removeClicked="deleteComment"/>
        </transition-group>
    </q-list>
</template>

<script>
import Comment from './Comment.vue'
import { db } from 'src/boot/firebase';
import { deleteDoc, doc } from 'firebase/firestore';
export default {
    name: "CommentList",
    components: {
        Comment
    },
    props: {
    comments: {
      type: Array,
      required: true,
      default: () => [],
    }
  },
    setup(props, { emit }) {
        const deleteComment = async(id) => {
            await deleteDoc(doc(db, 'comments', id));
            emit("commentDeleted");

        }

        return {
            deleteComment
        }
    }
}
</script>

<style lang="sass" scoped>
.comment:not(:first-child)
  border-top: 5px solid $accent
</style>