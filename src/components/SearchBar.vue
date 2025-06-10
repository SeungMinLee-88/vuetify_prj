<template>
<div class="container">
  <v-card flat>
  <v-card-title class="d-flex align-center pe-2">
    <v-spacer></v-spacer>
      <v-select
        v-model="model"
        :items="items"
        width="10"
        density="compact"
      variant="underlined"
        flat
      hide-details
      single-line
      @update:modelValue="selectFiled"
      ></v-select>

    <v-card-text>
      <v-text-field
        :loading="loading"
        append-inner-icon="mdi-magnify"
        density="compact"
        label="Search templates"
        variant="solo"
        hide-details
        single-line
        @click:append-inner="userSearch"
        @update:modelValue="inputSearch"
        @userSearch="userSearch"
      ></v-text-field>
    </v-card-text>
  </v-card-title>
  <v-divider></v-divider>
  </v-card>
</div>
</template>

<script setup>
import { shallowRef  } from 'vue'
const emit = defineEmits(['pageClick', 'selectFiled', 'inputSearch', 'mainPageClick']);

const model = shallowRef('')
const items = [{title: 'Id', value: "loginId"}, {title: 'Name', value: "userName"}];

const selectFiled = (selectSearchFiled) => {
  emit('selectFiled', selectSearchFiled);
}

const inputSearch = (inputSearch) => {
  emit('inputSearch', inputSearch);
}

const userSearch = () => {
  emit('userSearch');
  emit('mainPageClick', 1);
}
</script>