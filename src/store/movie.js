import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage="Search for the movie title!";

export default {
  namespaced:true,
  state: ()=>({
    movies:[],
    message: _defaultMessage,
    loading:false,
    theMovie:{}
  }), //data
  getters:{
    // movieIds(state){
    //   return state.movies.map(m=>m.imdbID)
    // }
  }, //computed
  //method
  mutations:{
    updateState(state, payload){
      Object.keys(payload).forEach(key=>{
        state[key] = payload[key]
      })
    },
    resetMovies(state){
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },//변이(데이터 변경은 여기서) 
  actions:{ //비동기(context)
    //async searchMovies(context, payload){
    async searchMovies({state, commit}, payload){
      if(state.loading){
        return
      }

      commit('updateState',{
        message:'',
        loading:true
      })
      //state.movies=[];
      try{
        const res = await _fetchMovie({
          ...payload,
          page:1
        })
  
        const { Search, totalResults } = res.data
  //      context.commit('updateState', {
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) //269
        console.log(typeof totalResults) //string
  
        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total/10)
  
        //추가 요청
        if(pageLength > 1){
          for(let i=2; i<=pageLength; i++){
            if(i > payload.number / 10) break
            
            const res = await _fetchMovie({
              ...payload,
              page:i
            })
            const { Search } = res.data
            commit('updateState',{
              movies:[
                ...state.movies, 
                ..._uniqBy(Search, 'imdbID')
              ],
            })
          }
        }
      }catch(message){
        commit('updateState',{
          movies:[],
          message
        })
      }finally{
        commit('updateState',{
          loading:false
        })
      }
    },

    async searchMovieWithId({state, commit}, payload){
      if(state.loading) return
      commit('updateState',{
        theMovie: {},
        loading:true
      })

      try{
        const res = await _fetchMovie(payload)
        console.log(res)
        commit('updateState',{
          theMovie: res.data
        })
      }catch (err){
        commit('updateState',{
          theMovie: {}
        })
      }finally{
        commit('updateState',{
          loading: false
        })
      }
    }
  }
}

function _fetchMovie(payload){
  const {title, type, year, page, id} = payload
  const omdb_api_key='7035c60c'
  const url = id ? `https://www.omdbapi.com/?apikey=${omdb_api_key}&i=${id}` : `https://www.omdbapi.com/?apikey=${omdb_api_key}&s=${title}&type=${type}&y=${year}&page=${page}`
  //const url = `https://www.omdbapi.com/?apikey=${omdb_api_key}`

  return new Promise((resolve,reject)=> {
    axios.get(url)
    .then(res=>{
      if(res.data.Error){
        reject(res.data.Error)
      }
      resolve(res)
    }).catch(err=>{
      reject(err.message)
    })
  })
}
