import { defineStore } from 'pinia';

const useDataStore = defineStore('DataStore', {
  state: () => ({
    posts: [],
    comments: []
  }),
  getters: {
    getPostById(state) {
      return (postId) => {
        return state.posts.find((post) => post.id == postId);
      }
    },
    getCommentsById(state) {
      return (postId) => {
        return state.comments.filter((comment) => comment.postId == postId);
      }
    },
    getCommentsLength(state) {
      return state.comments.length;
    },
    getPostsLength(state) {
      return state.posts.length;
    },
    getCommentsQuantityForPost(state) {
      return (postId) => {
        return state.comments.filter((comment) => comment.postId == postId).length;
      }
    },
    getLastCommentDate(state) {
      return (postId) => {
        return state.comments.filter((comment) => comment.postId == postId).reverse()[0].date;
      }
    }
  },
  actions: {
    setPosts(posts) {
      this.posts = posts;
    },
    setComments(comments) {
      this.comments = comments;
    },
    addComment(comment) {
      this.comments.push(comment);
    },
    addPost(post) {
      this.posts.push(post);
    },

    sortPostsByTimeFirstToLast() {
      console.log(this.getLastCommentDate('post0'));
      this.posts.sort((a, b) => b.date - a.date);
    },
    sortPostsByTimeLastToFirst() {
      this.posts.sort((a, b) => a.date - b.date);
    },
    sortByCommentsDecreasing() {
      this.posts.sort((a, b) => {
        return this.getCommentsQuantityForPost(b.id) - this.getCommentsQuantityForPost(a.id)
      });
    },
    sortByCommentsDates() {
      this.posts.sort((a, b) => {
        return this.getLastCommentDate(b.id) - this.getLastCommentDate(a.id)
      });
    }
  },
});

export default useDataStore;
