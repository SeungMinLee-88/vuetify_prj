<script setup>
import { ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const settingsSelection = ref([])

function checkRoleList(selected, roles) {
  !selected ? store.commit('addUpdateRoleList', roles) : store.commit('removeUpdateRoleList', roles)
}

function inputRoleList() {
  store.commit('updateRoleUser')
  store.commit('showRoleListModal')
}

</script>

<template>
<v-overlay v-model="store.state.showRoleListModal" class="align-center justify-center" position="absolute" width="70%">
  <v-card class="mx-auto" max-width="400">
    <v-list
      v-model:selected="settingsSelection"
      lines="three"
      select-strategy="leaf">
      <v-list-subheader>Role List</v-list-subheader>
      <v-list-item
        v-for="roles in store.state.roleList"
        :key="roles.id"
        :subtitle="roles.roleDesc"
        :title="roles.roleDesc">
        <template v-slot:prepend="{ isSelected, select }">
          <v-list-item-action start>
            <v-checkbox-btn :model-value="isSelected" @update:model-value="select"
            @click="checkRoleList(isSelected, roles)"></v-checkbox-btn>
          </v-list-item-action>
        </template>
       </v-list-item>
    </v-list>
    
      <v-card-actions>
        <v-spacer></v-spacer>
      <v-btn size="small"
        variant="elevated"
        @click="inputRoleList">
        Add Roles
      </v-btn>
      <v-btn size="small"
       variant="elevated"
       @click="store.commit('resetUpdateRoleList') ,store.commit('showRoleListModal')">
       Close
      </v-btn>
    </v-card-actions>
  </v-card>
</v-overlay>
</template>