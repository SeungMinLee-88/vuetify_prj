import Vuex from 'vuex'
import Axios from 'axios';
export const store = new Vuex.Store({
  state: {
    showModifyModal: false,
    showRoleListModal: false,
    userId: 0,
    userDetail: [],
    exceptRoleList: [0],
    roleList: [],
    updateRoleList: [],
    roleUserSave: []

  },
  /* state를 통해 선언된 상태를 mutations를 통해서 변경 */
  mutations: {
    showModifyModal (state) {
      state.showModifyModal = !state.showModifyModal
    },
    showRoleListModal (state) {
      state.showRoleListModal = !state.showRoleListModal
    },
    setUserId (state, userId) {
      state.userId = userId
    }
    ,
    setUserDetail (state, userDetails) {
      state.userDetail = userDetails
    },
    setUserName (state, roleList) {
      state.userDetail.userName = roleList
    }
    ,
    setRoleUser (state, filterRoleUser) {
      state.userDetail.roleUser = filterRoleUser
    },
    setExceptRoleIds (state, exceptRoleIds) {
      state.exceptRoleList = exceptRoleIds;
    },
    setRoleList (state, roleList) {
      state.roleList = roleList
    },
    addUpdateRoleList (state, updateRoleList) {
      state.updateRoleList.push(updateRoleList)
    },
    removeUpdateRoleList (state, updateRoleList) {
      state.updateRoleList.pop(updateRoleList)
    },
    resetUpdateRoleList (state, updateRoleList) {
      state.updateRoleList = [];
    },
    updateRoleUser (state) {
      store.state.updateRoleList.map((roles) =>{
      state.userDetail.roleUser.push(roles)
    })
    },
    setRoleUserSave (state, roleUserSave) {
      state.roleUserSave = roleUserSave;
  }
  ,
  },
  actions: {
    async getUserData ({ state, commit }) {
      await Axios.post('http://localhost:8090/api/v1/user/userDetail',
      {
        id: state.userId

      },
        {
            headers: {
            access: localStorage.getItem('access')
            }
      }).then((response) => {

        commit('setUserDetail', response.data);
      }).catch(function (error) {
        console.log('error : ' + error)
      });
    },
    /* 추가 대상 Role 리스트 */
    async getRoleList ({ state, commit }) {
      await Axios.post('http://localhost:8090/api/v1/user/roleList',
        state.exceptRoleList,
        {
          headers: {
            access: localStorage.getItem('access')
          },
        }

      ).then(response => {
        commit('setRoleList', response.data);
      }).catch(function (error) {
        console.log('error : ' + error)
      });
    },
    async userUpdate ({ state, commit }) {
      console.log('userUpdate state.userDetail : ' + JSON.stringify(state.userDetail));
      await Axios.post('http://localhost:8090/api/v1/user/userUpdate',
        {
          id: state.userDetail.id,
          loginId: state.userDetail.loginId,
          userName: state.userDetail.userName,
          userPassword: state.userDetail.userPassword,
          roleUserSave: state.roleUserSave
      },
        {
        headers: {
          access: localStorage.getItem('access')
          }
      }
      ).then(response => {
        commit('setRoleList', response.data);
        if(response.status === 200)
        {
          alert('Update Success');
          window.location.reload();
        }
      }).catch(function (error) {
        console.log('error : ' + error)
      });
    },
    /* async 사용하는 비동기 함수는 actions을 통해 처리 */
    async userDelete ({ state, commit }) {
      await Axios.delete(`http://localhost:8090/api/v1/user/delete/${state.userId}`,
        {
            headers: {
            access: localStorage.getItem('access')
            }
      }).then((response) => {
        if(response.status === 200)
          {
            alert('Delete Success');
            window.location.reload();
          }
      }).catch(function (error) {
        console.log('error : ' + error)
      });
    },
  },
});
