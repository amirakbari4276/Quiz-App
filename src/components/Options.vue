<template>
  <div class="options">
    <button
      v-for="(option, index) in options"
      :key="index"
      @click="selectOption(index)"
      class="option-button"
    >
      {{ option }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
  },
  methods: {
    selectOption(index) {
      this.$emit("optionSelected", index);
    },
  },
};
</script>


