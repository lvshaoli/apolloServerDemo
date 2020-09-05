const { commit } = require('./apollo-server/connectors/git')

commit('测试').then(res => {

    console.log(res)
})

