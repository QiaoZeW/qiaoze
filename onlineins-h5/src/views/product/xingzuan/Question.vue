<template>
  <div class="section">
      <div class="content">
        <h2>万能型保险投资者风险承受能力调查评估卷</h2>
        <p>非常感谢您选择我公司的万能型保险产品，根据中国保险监督管理委员会颁布的《人身保险业务经营规则》、《商业银行代理保险业务监管指引》、
          《保险公司信息披露管理办法》、《人身保险新型产品信息纰漏管理办法》、《关于做好保险消费者权益保护工作的通知》等文件及要求，本着对您负责的态度，请您认真完成以下调查评估问卷。此问卷有助于您更加了解自己的风险偏好及风险承受能力，以便购买更加适合您的险种及选择恰当的保额、
          保费。
        </p>
        <p class="p2">请在下列各题最合适的答案上打勾，我公司将根据您的选择来评估您对投资风险的适应度，并提供适合您投资的产品和服务建议，我公司承诺对您的 个人资料严格保密。</p>
      </div>
      <div class="md-example-child md-example-child-radio md-example-child-radio-2"
           v-for="(item,i) in question"
           :key="i"
      >
          <h3>{{item.tit}}</h3>
          <md-field class="radio-field" >
            <md-radio-list
              v-model="i"
              :options="item.sel"
              icon-size="lg"
              @change="handlechoose"
            />
          </md-field>
       </div>
       <div class="btns">
         <md-button type="primary" @click.prevent="saveData($event)">提交</md-button>
       </div>
       <md-dialog
       	class="iconDialog1"
           :closable="true"
           v-model="iconDialog1.open"
           title="未能通过"
           :btns="iconDialog1.btns"
       >

           <p style="text-align:center;padding:10px 0;line-height:30px;">您的风险承受能力较低,建议您购买保障型险种</p>
       </md-dialog>
       <md-dialog
       	class="iconDialog2"
           :closable="true"
           v-model="iconDialog2.open"
           title="恭喜通过"
           :btns="iconDialog2.btns"
       >

           <p style="text-align:center;padding:10px 0;line-height:30px;">您的分数【{{score}}】分,符合本产品投保要求</p>
       </md-dialog>
  </div>
</template>
<script>
  import {
    Dialog,
    Field,
    RadioList,
    Toast
  } from 'mand-mobile'
  export default {
    name: 'radio-demo',
    components: {
      [Dialog.name]: Dialog,
      [Field.name]: Field,
      [RadioList.name]: RadioList
    },
    data: function () {
      return {
        score:'',
        impartInfoList:[],
        iconDialog1: {
            open: false,
            btns: [
                {
                    text: '确定',
                    handler: this.godetail
                }
            ],
        },
        iconDialog2: {
            open: false,
            btns: [
                {
                    text: '确定',
                    handler: this.gobuy
                }
            ],
        },
        agentCode:'',
        product_id:'',
        values: {
          val001: false,
          val002: false,
          val003: false,
          val004: false,
          val005: false,
          val006: false,
          val007: false,
          val008: false,
          val009: false,
          val0010: false,
          val0011: false,
          val0012: false,
        },
        question: [
          {
            tit: '1、您的年龄:',
            sel: [{
                text: 'a.20周岁以下或50周岁以上',
                value: '001|a,1'
              },
              {
                text: 'b.20周岁（含20周岁）至50周岁（含50周岁）',
                value: '001|b,2'
              }
            ]
          },
          {
            tit: '2、您的教育程度：',
            sel: [{
                text: 'a.本科以下',
                value: '002|a,1'
              },
              {
                text: 'b.本科及本科以上',
                value: '002|b,2'
              }
            ]
          },
          {
            tit: '3、您的健康状况：',
            sel: [{
                text: 'a.一般',
                value: '003|a,1'
              },
              {
                text: 'b.良好',
                value: '003|b,2'
              }
            ]
          },
          {
            tit: '4、您目前的职业状况',
            sel: [{
                text: 'a.退休或无固定工作',
                value: '004|a,1'
              },
              {
                text: 'b.企事业单位固定工作或私营业主',
                value: '004|b,2'
              }
            ]
          },
          {
            tit: '5、您的收入是否足够支付家庭日常开支？',
            sel: [{
                text: 'a.否',
                value: '005|a,1'
              },
              {
                text: 'b.是',
                value: '005|b,2'
              }
            ]
          },
          {
            tit: '6、您进行投资的主要目的是：',
            sel: [{
                text: 'a.确保资产的安全性，同时获得固定收益',
                value: '006|a,1'
              },
              {
                text: 'b.只关心长期的高回报，能够接受短期的资产价值波动',
                value: '006|b,2'
              }
            ]
          },
          {
            tit: '7、若您有5万元闲置资金，如果只有下面两个选择，您更倾向于把这笔钱投资在下列哪个渠道？',
            sel: [{
                text: 'a.存在银行',
                value: '007|a,1'
              },
              {
                text: 'b.购买股票',
                value: '007|b,2'
              }
            ]
          },
          {
            tit: '8、您如何看待投资亏损：',
            sel: [{
                text: 'a.很难受，影响正常的生活',
                value: '008|a,1'
              },
              {
                text: 'b.平常心看待，对情绪没有明显的影响',
                value: '008|b,2'
              }
            ]
          },
          {
            tit: '9、您周围的朋友如何评价您？',
            sel: [{
                text: 'a.决不接受新事物或很难快速接受新事物',
                value: '009|a,1'
              },
              {
                text: 'b.经常尝试新事物',
                value: '009|b,2'
              }
            ]
          },
          {
            tit: '10、如果您在投资中有机会在下面的选项中选择 ，您会选择那一项？',
            sel: [{
                text: 'a.确定赢取1,000元现金',
                value: '0010|a,1'
              },
              {
                text: 'b.5%的机会赢取100,000元',
                value: '0010|b,2'
              }
            ]
          },
          {
            tit: '11、您对投资收益和风险所持的态度是？',
            sel: [{
                text: 'a.我不愿意承担任何风险，并且不能接受投资的价值下跌',
                value: '0011|a,1'
              },
              {
                text: 'b.我希望承担风险，愿意为获得较高的回报而在投资期限内承受超过较大的负面波动，甚至最终损失一定的投资本金',
                value: '0011|b,2'
              }
            ]
          },
          {
            tit: '12、您本次购买保险的目的是什么？',
            sel: [{
                text: 'a.获取保障为主',
                value: '0012|a,1'
              },
              {
                text: 'b.获取投资收益为主',
                value: '0012|b,2'
              }
            ]
          }
        ]
      }
    },
    created: function () {
        this.product_id = this.$router.query("product_id");
        this.agentCode = this.$router.query("agentCode");
    },
    methods: {
      handlechoose:function(option, index){
        console.log(option.text,option.value, index)
        var pos = option.value.indexOf('|')
        var mark = option.value.slice(0, pos)
        this.values['val' + mark] = option.value;
      },
      saveData: function (event) {
        //防止重复提交
        if(event && event.target.disabled) {
          return
        }
        for (var key in this.values) {
          if (this.values[key] == false) {
            var num = key.substring(5)
            Toast({content: `请选第${num}题`})
            return
          }
        }
        var arr = [];
        for (var key in this.values) {
          arr.push(this.values[key])
        }
        var dates = []
        var score = 0;
        for (var i = 0; i < arr.length; i++) {
          var obj = {}
          var s = arr[i].split('|')[0]
          if (s.length == 4) {
            s = s.substring(1)
          }
          obj.code = s
          obj.param = arr[i].split('|')[1]
          obj.version = '03'
          dates.push(obj)
          score += parseInt(obj.param.split(',')[1])
        }
        var result = '';
        if (score <= 14) {
          result = '保守型,您的风险承受能力较低,建议您购买保障型险种'
          this.iconDialog1.open = true
        }else{
          if (score >= 15 && score <= 17) {
            result = '平稳型,您的风险承受能力一般，建议您合理安排购买万能型险种与保障型险种'
          } else if (score >= 18 && score <= 22) {
            result = '稳健型,您的风险承受能力良好，可自由选择购买万能型险种与保障型险种'
          } else {
            result = '积极型,您的风险承受能力优秀，可重点购买万能型险种进行投资'
          }
          this.score = score;
          var obj1 = {};
          obj1.code = "000";
          obj1.param = score + ',' +result;
          obj1.version = "03";
          dates.push(obj1)
          this.impartInfoList = dates;
          localStorage.setItem("questionImpartInfolist",JSON.stringify(this.impartInfoList))
          this.iconDialog2.open = true;
        }

      },
      gobuy:function(){
        if (this.agentCode==='') {
             window.location.href =
                  this.$router.siteUrl() +
                  "/product/Buy.html?product_id=" +
                  this.product_id;
        }else{
             window.location.href =
                  this.$router.siteUrl() +
                  "/product/Buy.html?product_id=" +
                  this.product_id +
                  "&agentCode=" +
                  this.agentCode;
        }
      },
      godetail:function(){
        if (this.agentCode==='') {
            window.location.href =
                 this.$router.siteUrl() +
                 "/product/Detail.html?product_id=" +
                 this.product_id;
        }else{
            window.location.href =
                 this.$router.siteUrl() +
                 "/product/Detail.html?product_id=" +
                 this.product_id +
                 "&agentCode=" +
                 this.agentCode;
        }
      }
    }
  }

</script>
<style lang="stylus" scoped>
  p
    margin-top 30px
  .p2
    margin-bottom 40px
  h2
    padding-top .5rem
    text-align center
    font-weight bolder
    font-size 36px
    text-indent 0em
  .content
    p
    font-size 32px
    line-height .6rem
    text-indent 2em
  .section
    padding 32px 32px 72px 32px
    min-height 100%
  h3
    font-size 32px
</style>
<style>
	.md-dialog-btn:last-child {
	    background: rgba(225, 3, 18, 1) !important;
	    color: rgba(255, 255, 255, 1) !important;
	}
	.iconDialog1 .md-popup .md-popup-box .md-dialog-content .md-dialog-actions {
	    width:402px !important;
	    height:88px !important;
	    margin:auto !important;
	    margin-bottom: 48px !important;
	}
    .iconDialog2 .md-popup .md-popup-box .md-dialog-content .md-dialog-actions {
        width:402px !important;
        height:88px !important;
        margin:auto !important;
        margin-bottom: 48px !important;
    }
    .md-radio.is-checked .md-radio-icon{
        color:#d7000f!important;
    }
    .md-cell-item-content{
        font-size: 30px;
    }
</style>
