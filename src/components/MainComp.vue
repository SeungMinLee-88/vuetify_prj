<template>
  <div class="container">
    <v-card flat>
    <SearchBar
      @selectFiled="selectFiled"
      @inputSearch="inputSearch"
      @userSearch="userSearch"
      @mainPageClick="mainPageClick"
    />
    <UserList :userList=userList
      :currentPage=currentPage
      :pageLength=pageLength
      @mainPageClick="mainPageClick"
    />
    <ModifyModal
    :showModifyModal="store.state.showModifyModal"/>

    <RoleListModal
    :showRoleListModal="store.state.showModifyModal"/>

  </v-card>

  <div>
</div>
  </div>
</template>

<script setup>

import SearchBar from './SearchBar.vue'
import UserList from './UserList.vue'
import ModifyModal from './ModifyModal.vue'
import RoleListModal from './RoleListModal.vue'
import { useStore } from 'vuex'
const store = useStore()

const emit = defineEmits(['pageClick', 'selectFiled', 'inputSearch', 'showModalPop'])

const selectFiled = (selectSearchFiled) => {
  emit('selectFiled', selectSearchFiled);
}

const inputSearch = (inputSearch) => {
  emit('inputSearch', inputSearch);
}
const mainPageClick = (pageVal) => {
  emit('pageClick', pageVal);
}
const userSearch = () => {
  emit('userSearch');

}

const props = defineProps(['userList', 'currentPage', 'pageLength', 'modelValue', 'searchFiled', 'searchTxt', 'showModifyModal'])

</script>