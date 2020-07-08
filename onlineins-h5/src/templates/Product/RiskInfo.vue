<template>
    <div>

    </div>
</template>

<script>
    import Index from '../../views/index/Index'

    export default {
        components: {},
        data () {
            return {
                riskInfo: this.info,
                insuYearAct: false,
                payEndYearAct: false,
                insuYear: null,
                payEndYear: null,
                amnt: null,
                insuYearVal: null,
                payEndYearVal: null,
                amntVal: null,
                insuYearSelected: 0,
                payEndYearSelected: 0,
                amntSelected: 0
            }
        },
        props: ['info'],
        created () {
            console.log(this.riskInfo)
            let data = this.riskInfo;
            this.insuYear = data.insuYear.split('|');
            this.payEndYear = data.payEndYear.split('|');
            this.amnt = data.amnt.split('|');
        },
        methods: {
            insuYearHandleChoose(index){
                this.insuYearSelected = index;
            },
            payEndYearHandleChoose(index){
                this.payEndYearSelected = index;
            },
            amntHandleChoose(index){
                this.amntSelected = index;
            }
        }
    }
</script>

<style lang="scss">
    .active {
        color: rgb(215, 0, 15) !important;
        border: 1px solid rgb(215, 0, 15) !important;
    }

    .content {
        width: 92%;
        margin-left: 4%;
        .contentTop {
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            margin-top: 20px;
            border-radius: 10px;
            width: 100%;
            background: #fff;
            box-shadow: 0px 4px 15px #6666;
            .sex {
                display: flex;
                justify-content: space-between;
            }
            li:first-child {
                margin-right: 10px;
            }
            li {
                border: 1px solid rgb(176, 175, 175);
                -webkit-border-radius: 5px;
                -moz-border-radius: 5px;
                border-radius: 5px;
                color: #000;
                font-size: 28px;
                width: 120px;
                text-align: center;
                display: inline-block;
                padding: 7px 15px;
            }
        }

        .contentMedium {
            box-shadow: 0px 4px 15px #6666;
            margin-top: 20px;
            background: #fff;
            margin-bottom: 180px;
            -webkit-border-radius: 10px;
            -moz-border-radius: 10px;
            border-radius: 10px;
            .detail {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #ccc;
                p {
                    display: inline-block;
                    padding: 12px 0;
                    font-size: 30px;
                    line-height: 89px;
                }
                ul {
                    margin-top: 32px;

                }
                li:first-child {
                    margin-right: 10px;
                }
                li {
                    border: 1px solid rgb(176, 175, 175);
                    color: #000;
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    width: 120px;
                    text-align: center;
                    display: inline-block;
                    padding: 7px 15px;
                }
            }

            .details {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #ccc;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
                ul {
                    padding-top: 30px;
                    padding-bottom: 30px;
                    max-width: 74%;
                }

                /*li:first-child {*/
                /*border: 1px solid rgb(201, 52, 44);*/
                /*color: rgb(201, 52, 44);*/
                /*}*/
                li:nth-child(n+5) {
                    margin-top: 25px;
                    margin-right: 6px;
                    float: right;
                }
                li {
                    color: #000;
                    margin-left: 20px;
                    border: 1px solid rgb(176, 175, 175);
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    text-align: center;
                    display: inline-block;
                    padding: 8px 15px;
                }
            }

            .detailQ {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #ccc;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
                ul {
                    padding-top: 20px;
                    max-width: 62%;
                }
                li {
                    margin-top: 23px;
                    font-size: 28px;
                    display: inline-block;
                }

            }

            .detailP {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                border-bottom: 1px solid #ccc;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
                ul {
                    margin-top: 30px;
                    max-width: 62%;
                }
                li:first-child {
                    border: 1px solid rgb(201, 52, 44);
                    color: #de2d39;
                    margin-right: 25px;
                }
                li {
                    color: #000;
                    border: 1px solid rgb(176, 175, 175);
                    -webkit-border-radius: 5px;
                    -moz-border-radius: 5px;
                    border-radius: 5px;
                    font-size: 28px;
                    text-align: center;
                    display: inline-block;
                    padding: 10px 30px;
                }
            }

            .detailB {
                display: flex;
                justify-content: space-between;
                width: 92%;
                margin-left: 4%;
                p {
                    font-size: 30px;
                    line-height: 112px;
                }
            }

        }
    }

</style>
