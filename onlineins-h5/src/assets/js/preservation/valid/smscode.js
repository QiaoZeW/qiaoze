import VeeValidate,{ Validator } from 'vee-validate'
const dict = {
	custom: {
		smsCode: {
			required: '短信验证码不能为空'
		},
	}
};
function smsCodeValid(){
	Validator.localize(Validator.locale,dict)	
}
export default{
	smsCodeValid
}