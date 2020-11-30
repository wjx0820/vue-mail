<template>
  <div class="modal">
    <div class="overlay" @click="emit('close-modal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import useKeydown from "@/composition/useKeydown";

export default {
  setup(props, { emit }) {
    useKeydown([
      {
        key: "Escape",
        fn: () => {
          emit("close-modal");
        },
      },
    ]);

    return {
      emit,
    };
  },
};
</script>

<style scoped>
</style>