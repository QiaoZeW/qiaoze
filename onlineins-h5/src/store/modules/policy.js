import Request from '@/utils/request'
import { SET_PROPOSAL, GET_CALCV, SET_CALCV} from '../mutations'
export default{
	state:{
		proposal : {},
        cvResultList: []
	},
	
	mutations: {
		[SET_PROPOSAL](state, proposal) {
			state.proposal = proposal;
		},
        [SET_CALCV](state, cvlist) {
            state.cvResultList = cvlist
        }
	},
    
    actions: {
        [GET_CALCV] ({ commit }, proposal) {
            Request({
                url: `/ins/product/productplatform/duty/calCV`,
                method: 'POST',
                contentType: 'application/json;charset=UTF-8',
                data: proposal,
                isLoading: true,
                successFn: (data) => {
                    console.log('data',data)
                    commit(SET_CALCV, data.cvResultList)
                    commit(SET_PROPOSAL, proposal)
                },
                failFn: (data) => {
                }
            })
        }
    }
}