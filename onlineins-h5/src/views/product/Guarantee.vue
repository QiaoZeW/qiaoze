<template>
    <div class="section">
        <div class="content">
            <!--<ul>
                <li>
                    <h2>重大疾病保险金</h2>
                    <p>被保险人在等待期以后经认可的医院  首次确诊初次患上一种或多种本合同所约定的重大疾病（100种），我们按重大疾病保险金额向受益人给付重大疾病保险金，本合同效力终止。</p>
                </li>
                <li>
                    <h2>中症疾病保险金</h2>
                    <p>被保险人在等待期以后经认可的医院确诊初次患上一种或多种本合同约定的中症疾病（20种），我们按本合同的中症疾病保险金额向受益人给付中症疾病保险金，每种中症疾病只给付一次中症疾病保险金，给付后该种中症疾病保险金责任效力终止。</p>
                </li>
                <li>
                    <h2>中症疾病豁免保险费</h2>
                    <p>给付中症疾病保险金后，我们将豁免本合同约定的中症疾病确诊日后余下各期的保险费，本项保险责任效力终止。</p>
                </li>
                <li>
                    <h2>轻症疾病保险金</h2>
                    <p>被保险人在等待期以后经认可的医院确诊初次患上一种或多种本合同约定的轻症疾病（35种），我们按本合同的轻症疾病保险金额向受益人给付轻症疾病保险金，每种轻症疾病只给付一次轻症疾病保险金，给付后该种轻症疾病保险金责任效力终止。</p>
                </li>
                <li>
                    <h2>轻症疾病豁免保险费</h2>
                    <p>给付轻症疾病保险金后，我们将豁免本合同约定的轻症疾病确诊日后余下各期的保险费，本项保险责任效力终止。</p>
                </li>
                <li>
                    <h2>男女特定疾病保险金</h2>
                    <p>若被保险人为男性，则被保险人在等待期以后经认可的医院确诊初次患上一种或多种本合同约定的男性特定疾病，我们除给付重大疾病保险金外，还将按本合同的男女特定疾病保险金额给付男女特定疾病保险金，本合同效力终止。<br>
                        若被保险人为女性，则被保险人在等待期以后经认可的医院确诊初次患上一种或多种本合同约定的女性特定疾病，我们除给付重大疾病保险金外，还将按本合同的男女特定疾病保险金额给付男女特定疾病保险金，本合同效力终止。</p>
                </li>
                <li>
                    <h2>少儿特定疾病保险金</h2>
                    <p> 被保险人在等待期后至18周岁的保单周年日 以前经认可的医院确诊初次患上一种或多种本合同约定的少儿特定疾病，我们除给付重大疾病保险金外，还将按本合同的少儿特定疾病保险金额给付少儿特定疾病保险金，本合同效力终止。</p>
                </li>
                <li>
                    <h2>身故或全残保险金</h2>
                    <p>被保险人在等待期后身故或全残，我们按本合同累计已交保险费（无息）向受益人给付身故或全残保险金，本合同效力终止。</p>
                </li>
            </ul>-->
<div v-html="contents.guarantee"></div>

        </div>
    </div>
</template>

<script>
    export default {
        name: 'Guarantee',
        data(){
          return{
              contents:null,
          }
        },
        created(){
            this.riskName = JSON.parse(localStorage.getItem('riskName'))
            document.title= this.riskName
            this.contents = JSON.parse(localStorage.getItem('guarantee'))
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/app";
 .content{
     width: 92% ;
     margin-left: 4%;
     li:last-child{
         margin-bottom: 40px;
     }
     li{
         /*box-shadow: 0px 4px 15px #6666;*/
         box-shadow: px2em(0px) px2em(0px) px2em(8px) rgba(30, 0, 2, 0.1);
         -webkit-border-radius: 10px;
         -moz-border-radius: 10px;
         border-radius: 10px;
         border: 1px solid #ccc;
         margin-top: 20px;
         h2{
             font-size: 28px;
             padding-top: 42px;
             font-weight: bold;
             margin-left: 20px;
         }
        p{
            font-size: 26px;
            line-height: 40px;
            color: #666;
            padding: 20px 24px 60px;
        }
     }
 }
</style>
