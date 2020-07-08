<template>
  <div class="uploadCards-wrap">
    <div class="box">
      <h3>
        {{ title }}
      </h3>
      <div class="cardbox" :style="{'backgroundImage': `url(${bgcUrl})`}">
        <div class="md-example-child md-example-child-reader">
          <ul class="image-reader-list">
            <li
              class="image-reader-item"
              :class="{'error': error}"
              v-show="imageUrl"
              :style="{
                'backgroundImage': `url(${imageUrl})`,
                'backgroundPosition': 'center center',
                'backgroundRepeat': 'no-repeat',
                'backgroundSize': 'cover'
              }">
              <md-tag
                class="image-reader-item-del"
                size="small"
                shape="quarter"
                fill-color="#111A34"
                type="fill"
                font-color="#fff"
                @click.native="onDeleteImage()"
              >
                <md-icon name="close"></md-icon>
              </md-tag>
            </li>
            <li class="image-reader-item add" v-show="!imageUrl">
              <md-image-reader
                @select="onReaderSelect"
                @complete="onReaderComplete"
                @error="onReaderError"
              ></md-image-reader>
              <!-- <md-icon name="camera" size="md" color="#CCC"></md-icon> -->
              <img src="@/assets/imgs/upload_IDcard/camera_icon.png" alt="">
              <p></p>
            </li>
          </ul>
        </div>
      </div>
      <p class="err-tip">{{ errTip }}</p>
      <p class="tip">{{ tip }}</p>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mand-mobile'
import Axios from 'axios'
// import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
import Compressor from 'compressorjs'

export default {
  name: 'UploadBirthCard',
  title: '图片选择',
  titleEnUS: 'Picture selection',
  /* DELETE */
  components: {
  },
  watch: {
  },
  props: {
    bgcUrl: {
      type: String,
      default: require('@/assets/imgs/upload_IDcard/card_A.png')
    },
    title: {
      type: String,
      default: ''
    },
    tip: {
      type: String,
      default: '点击上传人像面'
    },
    imgType: {
      type: String,
      default: 'img1'
    },
    orderNo: {
      type: String,
      default: ''
    },
    imgBackUrl: {
      type: String,
      default: ''
    },
    uwStatus: {
      type: Number,
      default: NaN
    }
  },
  data() {
    return {
      errIndex: 1,
      imageUrl: '',
      file: null,
      Http: null,
      error: false,
      errTip: '',
      quality: 1,
      fileType: '',
      dataUrl: ''
    }
  },
  created () {
    this.Http = Axios.create()
    if (this.imgBackUrl) { // 如果上传了回显已上传图片
      this.loadBackImgDatas()
    }
  },
  methods: {
    loadBackImgDatas () {
      this.imageUrl = this.imgBackUrl
      this.$emit(this.imgType, this.imgBackUrl)
      // uwStatus：0未通过，1审核中，2通过
      if (this.uwStatus != 2) {
        this.ocrIDCard(this.imgBackUrl)
      }
    },
    onReaderSelect(name, {files}) {
      files.forEach(file => {
        console.log('[Mand Mobile] ImageReader Selected:', 'File Name ' + file.name)
      })
      Toast.loading('图片读取中...')
    },
    onReaderComplete(name, {dataUrl, file}) {
      this.file = file
      const types = ['jpg', 'JPG', 'png', 'PNG', 'gif', 'GIF', 'JPEG', 'jpeg', 'PDF', 'pdf']
      const execArr = file.name.split('.')
      const fileType = execArr[execArr.length-1].toLocaleLowerCase().replace('jpeg', 'jpg')
      const size = file.size
      this.fileType = fileType
      this.dataUrl = dataUrl
      if (!types.includes(fileType)) {
        Toast.failed('上传文件仅支持gif,jpg,png和pdf')
        return false
      }
      // if (size/1024/1024 >= 10) {
      //   Toast.failed('图片大小不能大于10M')
      //   return false
      // }
      console.log('file', file.size)
      // this.upLoadFile(name, { dataUrl, file, fileType })
      if (size/1024/1024 <= 2) {
        this.upLoadFile(name, file)
      } else {
        this.zipImg(name, file)
      }
    },
    zipImg (name, file, filename) {
      if (this.quality > 0.2) {
        this.quality = this.quality - 0.1
      } else {
        this.quality = 0
      }
      console.log('zip---------')
      console.log('this.quality', this.quality)
      new Compressor(file, {
          quality: this.quality,
          success: (newFile) => {
            if (newFile.size/1024/1024 >= 2) {
              if (this.quality < 0.1) {
                Toast.info('图片大小不得大于2M')
                return false
              }
              this.zipImg(name, newFile)
            } else {
              if (newFile.size == 0) { // 对不兼容压缩插件的处理，直接上传原图片
                if (this.file.size/1024/1024 > 5) {
                  Toast.info('图片大小不得大于5M')
                } else {
                  this.upLoadFile(name, this.file)
                }
              } else {
                this.upLoadFile(name, newFile)
              }
            }
          },
          error: (err) => {
            if (this.file.size/1024/1024 > 5) {
               Toast.info('图片大小不得大于5M')
             } else {
               this.upLoadFile(name, this.file)
             }
          }
      })
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
    },
    onDeleteImage() {
      this.imageUrl = ""
      this.$emit(this.imgType, '')
      this.errTip = ''
    },
    upLoadFile (name, file) {
      let formData = new FormData()
      formData.append('file', file, file.name)
      this.quality = 1
      this.Http({
        url: `${this.$router.serverUrl()}/file/save`,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then((res) => {
        const resUrl = res.data.data
        this.ocrIDCard(resUrl)
        this.imageUrl = resUrl
        this.$emit(this.imgType, resUrl)
        this.errIndex = 1
      }).catch((err) => {
        if (this.errIndex == 1) {
          this.errIndex++
          if (err.response.data.message == '文件长度为0') {
            if (this.file.size/1024/1024 > 5) {
              Toast.info('图片大小不得大于5M')
            } else {
              this.upLoadFile(name, this.file)
            }
            return false
          }
        }
        Toast.hide()
        Toast.info('图片上传失败，请重新上传')
      })
    },
    ocrIDCard (resUrl) {
      const ocrDatas = {
          "cardImgUrl": resUrl,
          "orderNo": this.orderNo,
          "type": this.imgType.match(/\d$/)[0]
      }
      this.$app.getToken((userToken) => {
          this.$request({
            url: `/antiMoney/card/ocr`,
            method: "POST",
            data: ocrDatas,
            userToken: userToken,
            contentType: 'application/json;charset=utf-8',
            successFn: (res) => {
              if (res) {
                this.error = false
                this.errTip = ''
              }
              Toast.hide()
            },
            failFn: (err) => {
              if (err && err.success === 'false') {
                this.error = true
                this.errTip = err.resultMsg
              }
              Toast.hide()
            }
          })
      })
    },
    dataURLtoFile: function(dataurl, filename) {
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]),
            n = bstr.length,
            u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }
  }
}

</script>

<style lang="stylus" scoped>
.uploadCards-wrap
  .box
    h3
      text-align center
      margin-bottom 30px
  .cardbox
    width 390px
    height 224px
    margin 0 auto
    background-position: center center
    background-repeat: no-repeat
    background-size: cover
    .md-example-child-reader
      overflow hidden
      .image-reader-list
        width 390px
        height 224px
        position relative
        .image-reader-item
          position absolute
          width 390px
          height 224px
          text-align center
          background #FFF
          box-shadow 0 5px 20px rgba(197, 202, 213, .25)
          box-sizing border-box
          list-style none
          border-radius 4px
          background-size cover
          overflow hidden
          &.error
            border 1px solid red
          &:nth-of-type(4n)
            margin-right 0
          &.add
            background none
            img
              width 108px
              height 108px
              position absolute
              top 50%
              left 50%
              transform translate(-50%, -50%)
            .md-icon
              position absolute
              top 40%
              left 50%
              transform translate(-50%, -50%)
              opacity .5
            p
              position absolute
              top 50%
              left 0
              width 100%
              margin-top 15px
              font-size 22px
              color #CCC
              text-align center
          .image-reader-item-del
            position absolute
            top 0
            right 0
            z-index 3
            opacity .8
            .md-icon-close
              font-size 24px
  .tip
    text-align center
    font-size 28px
    color #81ABE4
    margin 20px auto
  .err-tip
    color red
    text-align center
    margin 20px auto
</style>
