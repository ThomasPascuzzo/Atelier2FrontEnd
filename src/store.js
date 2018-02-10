import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
	state : {
		token : false,
		score : 0,
		scorecumul : 0,
		time : 0
		
	},
	mutations : {
		setToken(state,token) {
			state.token = token;
		},
		setScore(state,score) {
			state.score += score;
		},

		setScoreCumul(state,scorecumul) {
			state.scorecumul = scorecumul;
		},
		setTime(state,time) {
			state.time = time;
		},
		initialiseStore(state) {
			if(localStorage.getItem('store')) {
				this.replaceState(
					Object.assign(state, JSON.parse(localStorage.getItem('store')))
				);
			}
		}
	}
})
