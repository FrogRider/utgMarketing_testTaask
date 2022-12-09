<template>
  <div class="pagination" v-if="totalNumberOfPages > 1">
    <div
      class="pagination__items"
      :class="{ disabledPagination: isPreviousPageEnabled }"
    >
      <span
        class="pagination__item pagination__item_arrow"
        title="Перейти до першої сторінки"
        @click="goToFirstPage"
      >
      </span>
      <span
        class="pagination__item pagination__item_arrow"
        title="Перейти до попередньої сторінки"
        @click="goToPreviousPage"
      >
      </span>
    </div>

    <div class="pagination__items">
      <div
        class="pagination__item"
        v-for="page in pagination"
        :key="page"
        :class="{ pagination__item_active: isCurrent(page) }"
        @click="changePage(page - 1)"
      >
        {{ page }}
      </div>
    </div>

    <div
      class="pagination__items"
      :class="{ disabledPagination: isNextPageEnabled }"
    >
      <span
        class="pagination__item pagination__item_arrow"
        title="Перейти до наступної сторінки"
        @click="goToNextPage"
      >
      </span>
      <span
        class="pagination__item pagination__item_arrow"
        title="Перейти до останньої сторінки"
        @click="goToLastPage"
      >
      </span>
    </div>
  </div>
</template>

<script setup>
import {
  defineProps, toRefs, defineEmits, computed,
} from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalNumberOfPages: {
    type: Number,
    required: true
  }
});

const extraNumbersForPagination = 1;

const { currentPage, totalNumberOfPages } = toRefs(props);

const emit = defineEmits(['change-page']);

const changePage = (pageNumber) => {
  emit("change-page", pageNumber);
};

const goToPreviousPage = () => {
  if (currentPage.value > 0) {
    changePage(currentPage.value - 1);
  }
};
const goToNextPage = () => {
  if (currentPage.value < totalNumberOfPages.value - 1) {
    changePage(currentPage.value + 1);
  }
};
const goToFirstPage = () => {
  changePage(0);
};
const goToLastPage = () => {
  changePage(totalNumberOfPages.value - 1);
};

const isCurrent = (page) => {
  return page - 1 === currentPage.value;
};

const isPreviousPageEnabled = computed(() => {
  return currentPage.value == 0;
});
const isNextPageEnabled = computed(() => {
  return totalNumberOfPages.value - currentPage.value == 1;
});
const pagination = computed(() => {
  if (totalNumberOfPages.value == 2) return [1, 2];
  let range = Array(totalNumberOfPages.value)
    .fill()
    .map((_, index) => index + 1)
    .reduce((pages, page) => {
      // if within delta range add page
      if (
        page - extraNumbersForPagination <= currentPage.value + 1 &&
        page + extraNumbersForPagination >= currentPage.value + 1
      ) {
        return [...pages, page];
      }

      return pages;
    }, []);

  if (range.length == 2 && currentPage.value + 1 == 1) range.push(3);
  if (range.length == 2 && currentPage.value + 1 == totalNumberOfPages.value)
    range.unshift(totalNumberOfPages.value - 2);

  return range;
});
</script>

<style scoped lang="scss">

$double-arrow-icon: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cg%3E%3Cg%3E%3Cpath d='M505.496,240.307l-194.59-194.59c-8.672-8.671-22.714-8.671-31.386,0c-8.671,8.664-8.671,22.722,0,31.386L458.418,256 L279.521,434.897c-8.671,8.664-8.671,22.722,0,31.386c4.336,4.336,10.011,6.504,15.693,6.504s11.365-2.168,15.693-6.504 l194.59-194.59C514.168,263.029,514.168,248.971,505.496,240.307z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3Cg%3E%3Cpath d='M232.479,240.307L37.889,45.717c-8.664-8.671-22.722-8.671-31.386,0c-8.671,8.664-8.671,22.722,0,31.386L185.393,256 L6.504,434.897c-8.671,8.664-8.671,22.722,0,31.386c4.328,4.336,10.011,6.504,15.693,6.504s11.365-2.168,15.693-6.504 l194.59-194.59C241.15,263.029,241.15,248.971,232.479,240.307z'/%3E%3C/g%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  &__items {
    display: flex;
    &:nth-last-of-type(3) {
      & .pagination__item {
        transform: rotate(180deg);
      }
      
    }
  }

  &__item {
    min-width: 50px;
    height: 50px;
    background-color: #fff;
    margin: 0 20px;
    display: grid;
    place-items: center;
    border: 1px solid #5bc4f1;
    background-color: rgba(91, 196, 241, 0.15);
    cursor: pointer;

    &_active {
      border: 2px solid #005faa;
      background: #007fc7;
      color: #fff;
      // border: none;
    }

    &_arrow {
      background-image: $double-arrow-icon;
      background-position: center;
      background-size: 30%;
      background-repeat: no-repeat;
    }
  }

  .disabledPagination {
    opacity: 0.6;
    cursor: disabled;
    pointer-events: none;
    position: relative;
    filter: grayscale(90%);
  }
}
</style>
