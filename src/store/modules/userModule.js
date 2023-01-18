


const userModule = {
    namespaced: true,
    state: () => ({
      users:  {
                data: { name: 'timo' },
                token: ''
            }
    }),
    getters: {
      getMaleUsers: state => {
        return state.users.filter( user => user.gender === 'male')
      },
      getFemaleUsers: state => {
        return state.users.filter( user => user.gender === 'female')
      },
    },
    mutations: {
      addUser(state, newGender) {
        let nextId = state.users.length + 1;
        state.users.push({
          id: nextId,
          name: 'User' + nextId,
          gender: newGender
        })
      }
    }
  }
  
  export default userModule;