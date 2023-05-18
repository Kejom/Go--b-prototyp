<template>
    <q-page class="flex flex-center">
        <q-scroll-area class="absolute full-width full-height">
            <q-card flat v-if="coo && user">
                <q-card-section horizontal>
                    <q-card class="col" flat>
                        <q-item>
                            <q-item-section avatar>
                                <q-avatar size="4em" class="gt-sm">
                                    <img :src="user.avatarUrl">
                                </q-avatar>
                            </q-item-section>

                            <q-item-section>
                                <q-item-label><span class="text-subtitle1">{{ user.name }}</span> <br class="lt-md">&bull;
                                    {{ relativeDate(coo.date) }} temu</q-item-label>
                                <q-item-label caption>
                                    @{{ user.handle }}
                                </q-item-label>
                            </q-item-section>
                        </q-item>

                        <q-separator />

                        <q-card-section horizontal>
                            <q-card-section>
                                {{ coo.content }}
                            </q-card-section>



                        </q-card-section>
                    </q-card>

                    <q-card-actions vertical class="justify-around q-px-md">

                        <q-btn flat round :color="coo.liked ? 'pink' : 'grey'"
                            :icon="coo.liked ? 'fas fa-heart' : 'far fa-heart'" size="md" :label="coo.likes"
                            text-color="primary" />
                        <q-btn v-if="userStore.loggedUserRef.uid === coo.userId" flat round color="grey" icon="fas fa-trash" size="md" text-color="primary" />
                    </q-card-actions>
                </q-card-section>
            </q-card>
            <q-separator class="divider" size="5px" color="accent" />
            <login-form class="lt-md" v-if="!userStore.loggedUserRef" />
            <comment-form v-else-if="userStore.loggedUser" @addClicked="addComment" />
            <q-btn-group v-else spread class="q-ma-md">
                <q-btn label="Aby dodawać komentarze musisz uzupełnić swój profil" color="primary" text-color="accent"
                    to="/editprofile" />
            </q-btn-group>
            <q-separator class="divider" size="5px" color="accent" />
            <comment-list :comments="comments" @commentDeleted="updateCooOnCommentDelete"/>
        </q-scroll-area>
    </q-page>
</template>

<script>
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { db } from 'src/boot/firebase';
import { collection, query, orderBy, where, onSnapshot, addDoc, updateDoc, doc, increment } from "firebase/firestore";
import { useUserDataStore } from 'src/stores/user-data-store';
import { useCooStore } from 'src/stores/coo-store';
import { formatDistance } from 'date-fns'
import { pl } from 'date-fns/locale'
import CommentForm from 'src/components/shared/CommentForm.vue';
import CommentList from 'src/components/shared/CommentList.vue';
import LoginForm from 'src/components/index/LoginForm.vue';
export default {
    name: 'CooPage',
    components: {
        CommentForm,
        CommentList,
        LoginForm
    },
    setup() {
        const route = useRoute();
        const userStore = useUserDataStore();
        const cooStore = useCooStore();
        const coo = computed(() => cooStore.getCooById(route.params.cooId))
        const user = ref({});
        const comments = ref([]);
        let unsubscribeComments = null;

        watch(coo, () => {
            initUser()
        })

        const initUser = async () => {
            const cooData = cooStore.getCooById(route.params.cooId);
            if (!cooData)
                return;
            const userData = await userStore.getUser(cooData.userId);

            if (userData)
                user.value = userData;
        }
        const addComment = async ({ commentText }) => {
            const newComment = {
                text: commentText,
                date: Date.now(),
                userId: userStore.loggedUserRef.uid,
                cooId: route.params.cooId
            }
            await addDoc(collection(db, 'comments'), newComment);

            const cooRef = doc(db, 'coos', route.params.cooId);

            await updateDoc(cooRef, {
                comments : increment(1)
            })
        }

        const updateCooOnCommentDelete = async() => {
            const cooRef = doc(db, 'coos', route.params.cooId);

            await updateDoc(cooRef, {
                comments : increment(-1)
            })
        }

        const relativeDate = (value) => formatDistance(value, Date.now(), { locale: pl })

        const watchComment = () => {
            const q = query(collection(db, 'comments'), where('cooId', '==', route.params.cooId), orderBy('date'));
            unsubscribeComments = onSnapshot(q, (snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    let changedComment = change.doc.data();
                    changedComment.id = change.doc.id;
                    if (change.type === "added") {
                        comments.value.unshift(changedComment);
                    }
                    if (change.type === "modified") {
                        const index = comments.value.findIndex(c => c.id === changedComment.id);
                        let newComments = [...comments.value];
                        newComments[index] = changedComment;
                        comments.value = newComments;
                    }
                    if (change.type === "removed") {
                        comments.value = comments.value.filter(c => c.id !== changedComment.id);
                    }
                })
            })
        }

        onMounted(async () => {
            initUser()
            watchComment();
        })

        onUnmounted(() => {
            if (unsubscribeComments instanceof Function)
                unsubscribeComments();
        })

        return {
            coo,
            user,
            comments,
            userStore,
            addComment,
            relativeDate,
            updateCooOnCommentDelete
        }
    }
}
</script>

<style></style>