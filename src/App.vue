<template>

      <MainComp
        :userList=userList
        :currentPage=currentPage
        :pageLength=pageLength
        @pageClick='pageClick'
        @selectFiled='selectFiled'
        @inputSearch='inputSearch'
        :searchFiled='searchFiled'
        :searchTxt='searchTxt'
        @userSearch='userSearch'
        @showModalPop='showModalPop'
      />

  </template>

<script setup>
import { ref, onMounted  } from 'vue'
import Axios from 'axios';
import { useStore } from 'vuex'

import MainComp from './components/MainComp.vue'

const store = useStore()

  function showModalPop(showModalVal) {
    store.state.showModifyModal = showModalVal;
}

  const userList = ref([]);
  const pageLength = ref();
  const currentPage = ref(1);
  const searchFiled = ref();
  const searchTxt = ref();

const getData = async () => {

await Axios.get('http://localhost:8090/api/v1/user/userList', {
  params: {
        page: currentPage.value,
        size: '5',
        sort: 'createdTime,desc',
        searchKey: searchFiled.value,
        searchValue: searchTxt.value
      },
      headers: {
        access: localStorage.getItem('access')
      },
  }).then((response) => {

      userList.value = response.data.content;
      pageLength.value= response.data.totalPages;

  }).catch(function (error) {
    console.log('error : ' + error)
  });

}
onMounted(() => {
  getData();
  store.dispatch('getUserData')

})

const pageClick = (page) => {
  currentPage.value = page;
  getData();
}
const selectFiled = (selectSearchFiled) => {
  searchFiled.value = selectSearchFiled;
}
const inputSearch = (inputSearchTxt) => {
  searchTxt.value = inputSearchTxt;
}
const userSearch = () => {
  getData();
}
  </script>