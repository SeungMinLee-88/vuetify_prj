<template>
      <button @click="$emit('increase-by', 1)">
      Increase by 1
      </button>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
}
</style>
