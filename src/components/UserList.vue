<script setup>

import { useStore } from 'vuex'
const store = useStore()

const props = defineProps(['userList', 'currentPage', 'pageLength', 'showModal'])
const emit = defineEmits(['mainPageClick', 'showModalPop'])
function handlePageClick(pageVal) {
  emit('mainPageClick', pageVal);
}

function handleDeleteClick(usersId) {
  if(confirm("Do you want Delete User?"))
  {
    store.commit('setUserId', usersId)
    store.dispatch('userDelete', usersId)
  }
}
</script>

<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">NUM</th>
        <th class="text-left">ID</th>
        <th class="text-left">NAME</th>
        <th class="text-left">ROLE</th>
        <th class="text-left" style="width: 80px;"></th>
        <th class="text-left" style="width: 80px;"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(users, index) in props.userList" :key="users.id">
        <td>{{ index }}</td>
        <td>{{ users.id }} | {{ users.loginId }}</td>
        <td>{{ users.userName }}</td>
        <td>
        <ol>
          <li v-for="role in users.roleUser">
            {{ role.roleName }}
          </li>
        </ol>
        </td>
        <td><v-btn color="#5865f2"
          size="small"
          variant="flat"
          @click="store.commit('showModifyModal'), store.commit('setUserId', users.id), store.dispatch('getUserData')">Modify</v-btn></td>
        <td><v-btn color="#5865f2"
          size="small"
          variant="flat" @click="handleDeleteClick(users.id)">delete</v-btn></td>
      </tr>
    </tbody>
    </v-table>

   <v-pagination
        v-model="props.currentPage"
        :length="props.pageLength"
        rounded="circle"
        @update:model-value="handlePageClick"
      ></v-pagination>

  </template>
