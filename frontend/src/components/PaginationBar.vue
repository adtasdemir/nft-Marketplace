<template>
  <v-pagination
    v-model="internalPage"
    :length="totalPages"
    @input="onPageChange"
    class="custom-pagination"
  />
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      required: true,
    },
    totalPages: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      internalPage: this.currentPage, 
    };
  },
  watch: {
    currentPage(newPage) {
      this.internalPage = newPage;
    },
    internalPage(newPage) {
      if (newPage !== this.currentPage) {
        this.$emit('page-changed', newPage);
      }
    },
  },
  methods: {
    onPageChange(page) {
      this.$emit('page-changed', page); 
    },
  },
};
</script>




















<style scoped>
.custom-pagination .v-btn {
  background-color: #2C3E50;
  color: white;
}

.custom-pagination .v-btn:hover {
  background-color: #34495E;
}

.custom-pagination .v-btn:focus {
  outline: none;
}

.custom-pagination .v-btn--active {
  background-color: #34495E;
}
</style>
