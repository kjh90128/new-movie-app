<template>
  <div class="container"> 
    <div
      class="inner"
      :class="{'no-result':!movies.length}"> 
      <!-- <div class="spinner-border text-primary" v-if="loading"></div> -->
      <Loader v-if="loading" />
      <div
        class="message"
        v-if="message">
        {{ message }}
      </div>
      <div
        class="movies"
        v-else>
        <MovieItem
          v-for="movie in movies"
          :key="movie.imdbID"
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieItem from './MovieItem'
import Loader from '~/components/Loader'
import { mapState } from 'vuex'

export default {
	components:{
		MovieItem,
		Loader
	},
	computed:{
		...mapState('movie',[
			'movies',
			'message',
			'loading'
		])
	}
}
</script>

<style scoped lang="scss">
.container{
	margin-top:30px;
	.inner{
		background-color: $gray-200;
		padding:10px 0;
		border-radius: 4px;
		text-align: center;
		&.no-result{
			padding: 70px 0;
		}
	}
	.message{
		color:$gray-400;
		font-size: 20px;
	}
	.movies{
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}
	
}
</style>