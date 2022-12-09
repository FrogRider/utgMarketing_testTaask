<template>
<div class="postPreview">
  <div class="postPreview__title postPreview__row">
    {{ post.postName }}
  </div>
  <div class="postPreview__text postPreview__row">
    {{ post.post }}
  </div>
  <div class="postPreview__date postPreview__row">
    {{ getDateFromTimestamp(post.date, false) }}
  </div>
  <div class="postPreview__commentsQuantity postPreview__row">
    comments: {{ commentsQuantity }}
  </div>
  <div class="postPreview__buttons postPreview__row">
    <button class="postPreview__openPost" @click="openPost(post.id)">
      open
    </button>
  </div>
</div>
</template>

<script setup>
import { getDateFromTimestamp } from '@/utils/timestampToDate';
import {
  defineProps, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  post: {
    default: () => {},
  },
  commentsQuantity: {
    default: 0
  }
});

const { post, commentsQuantity } = toRefs(props);

const openPost = (postId) => {
  router.push({name: 'specificPost', params: { postId }})
}
</script>

<style lang="scss">

.postPreview {
  border: 1px solid red;
  padding: 10px;
  // width: 300px;

  &__text {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  &__openPost {

  }

  &__row {
    & + & {
      margin-top: 10px;
    }
  }
}
</style>
