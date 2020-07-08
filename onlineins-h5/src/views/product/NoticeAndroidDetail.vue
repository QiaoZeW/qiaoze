<template>
    <div class="bnpdf">
        <v-pdf :pdfUrl="pdfUrl"></v-pdf>
    </div>
</template>
<script>
    import bnpdf from './bnpdf/bnpdf'

    export default {
        data() {
            return{
                pdfUrl: '',//pdf url地址
            }
        },
        created() {
            this.pdf_url = this.$router.query('pdf_url');
            this.pdfLoading();
        },
        components: {
            'v-pdf': bnpdf
        },
        methods: {
            pdfLoading () {
                this.pdfUrl = this.pdf_url;
            }
        }
    }
</script>

