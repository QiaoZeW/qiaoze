<template>
  <div class="uploadimage-wrap">
    <ul class="image-reader-list">
      <li
        class="image-reader-item"
        v-for="(img, index) in imageList['reader0']"
        :key="index"
        :style="{
          'backgroundImage': `url(${img})`,
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
          @click.native="onDeleteImage('reader0', index)"
        >
          <md-icon name="close"></md-icon>
        </md-tag>
      </li>
      <li class="image-reader-item add">
        <md-image-reader
          name="reader0"
          @select="onReaderSelect"
          @complete="onReaderComplete"
          @error="onReaderError"
          is-multiple
        ></md-image-reader>
        <md-icon name="camera" size="md" color="#CCC"></md-icon>
        <p>添加图片</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Toast } from 'mand-mobile'
import Axios from 'axios'
// import imageProcessor from 'mand-mobile/components/image-reader/image-processor'
import Compressor from 'compressorjs'

export default {
  name: 'UploadImage',
  title: '图片选择',
  titleEnUS: 'Picture selection',
  /* DELETE */
  components: {
  },
  watch: {
  },
  props: {
    questionnaireNo: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      errIndex: 1,
      imageList: {
        reader0: [] //提交的数据
      },
      file: null,
      size: 0,
      uploadArr: [],
      Http: null,
      quality: 1,
      imageIndex: 0,
      allIndex: 0,
      fileType: '',
      dataUrl: ''
    }
  },
  created () {
    this.Http = Axios.create()
  },
  methods: {
    onReaderSelect(name, {files}) {
      Toast.loading('图片读取中...')
      console.log('files', files.length)
      this.imageIndex = 0
      this.allIndex = files.length
    },
    onReaderComplete(name, { blob,dataUrl, file }) {
      this.file = file
      const types = ['jpg', 'JPG', 'png', 'PNG', 'gif', 'GIF', 'JPEG', 'jpeg', 'PDF', 'pdf']
      const execArr = file.name.split('.')
      const fileType = execArr[execArr.length-1].toLocaleLowerCase().replace('jpeg', 'jpg')
      this.fileType = fileType
      this.dataUrl = dataUrl
      const size = file.size
      if (!~types.indexOf(fileType)) {
        Toast.failed('上传文件仅支持gif,jpg,png和pdf')
        return false
      }
      // if (size/1024/1024 >= 5) {
      //   Toast.failed('图片大小不能大于5M')
      //   return false
      // }
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
    commitDatas ({ dataUrl, fileType, imageUrl}) {
      this.uploadArr.push({ dataUrl, fileType, imageUrl })
      this.$emit('serverUrlsArr', this.uploadArr)
      console.log('this.uploadArr', this.uploadArr)
    },
    onReaderError(name, {msg}) {
      Toast.failed(msg)
    },
    onDeleteImage(name, index) {
      const demoImageList = this.imageList[name] || []
      demoImageList.splice(index, 1)
      this.uploadArr.splice(index, 1)
      this.$set(this.imageList, name, demoImageList)
      this.$emit('serverUrlsArr', this.uploadArr)
    },
    upLoadFile (name, file) {
      let formData = new FormData()
      formData.append('file', file, file.name)
      this.Http({
        url: `${this.$router.serverUrl()}/file/save`,
        method: "POST",
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        data: formData
      }).then((res) => {
        this.imageIndex++
        console.log(res, this.imageIndex, this.allIndex)
        if (this.imageIndex === this.allIndex) {
          Toast.hide()
        }
        const imageUrl = res.data.data
        const demoImageList = this.imageList[name] || []
        const dataUrl = res.data.data
        demoImageList.push(dataUrl)
        this.$set(this.imageList, name, demoImageList)
        this.commitDatas({ dataUrl, fileType: this.fileType, imageUrl })
        this.errIndex = 1
      }).catch((err) => {
        console.log('err', err)
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
.uploadimage-wrap
  overflow hidden
  .image-reader-list
    float left 
    width 100%
    .image-reader-item
      position relative
      float left
      width 23.5%
      padding-bottom 23.5%
      margin-bottom 2%
      margin-right 2%
      background #FFF
      box-shadow 0 5px 20px rgba(197, 202, 213, .25)
      box-sizing border-box
      list-style none
      border-radius 4px
      background-size cover
      overflow hidden
      &:nth-of-type(4n)
        margin-right 0
      &.add 
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
</style>