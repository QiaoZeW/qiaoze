<template>
    <div class="section">
        <whirl v-if="showWhirl"></whirl>
        <error v-if="showError"></error>
    </div>
</template>

<script>
    import Whirl from "@/components/Whirl";
    import Error from "@/components/Error";
    export default {
        name: "MpHref",
        components: {
            Error,
            Whirl
        },
        data(){
            return{
                showError: false,
                showWhirl: false,
               u :'',
               code:''
            }
        },
        created(){
            let code = this.$router.query("code")||'';
            let u = this.$router.query('u')  || '';
            let that = this;
            console.log('MpHref:',code,u);
            this.$app.getMiniToken(code,(token,error)=>{
                that.showWhirl=false;
                console.log('MpHref mini app token:',token);
                if(error){
                    that.showError=true;
                }else{

                    let userCode = window.localStorage.getItem("miniapp_user_code");
                    let storage_userCode = window.localStorage.getItem("USERCODE");
                    if (storage_userCode == null || storage_userCode != userCode) {
                        window.localStorage.setItem("USERCODE", userCode);
                    }
                    that.u = decodeURIComponent(u)
                    window.location.href=that.u;
                }
            });

        },
        methods(){

        }
    }
</script>

<style scoped>

</style>
