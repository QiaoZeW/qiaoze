import { SET_CUSTOMERNO,SET_BUSINESSTYPE,SET_CUST,SET_ENTRYTYPE} from '../mutations'
export default{
	state:{
		customerNo : '',
		businessType : '',
		customerInfo: {},
        entryType: ''
	},
	
	mutations: {
		[SET_CUSTOMERNO](state, customerNo) {
			state.customerNo = customerNo;
		},
		[SET_BUSINESSTYPE](state, businessType) {
			console.log('state',state)
			console.log('bus',businessType)
			state.businessType = businessType;
		},
		[SET_CUST](state, data) {
			console.log('cust',data)
			state.customerInfo = data;
		},
        [SET_ENTRYTYPE](state, entryType) {
            console.log('SET_ENTRYTYPE', entryType)
            state.entryType = entryType
        }
	},
	
	actions: {
		[SET_CUSTOMERNO]({commit},customerNo) {
			console.log('111222333',customerNo)
			commit('SET_CUSTOMERNO', customerNo)
		}
	}
}