<template>
    <div class="p-grid margin-zero">
        <div class="p-col-12 p-md-12 p-lg-6 img-viewer">
            <carousel :perPage=perPage
                      :navigationEnabled=navigationEnabled
                      :paginationActiveColor=paginationActiveColor
                      :paginationColor=paginationColor
                      :autoplay=autoplay
                      :autoplayTimeout=autoplayTimeout
                      :autoplayHoverPause=autoplayHoverPause
                      :paginationPadding=paginationPadding>
                <slide>
                    <div class="container">
                        <div class="slide-text-container">
                            <h5 class="categories-container">
                                <span class="category-name">XƏBƏRLƏR</span>
                                <span class="category-name">TEXNOLOGİYA</span>
                            </h5>
                            <h2 class="item-header">Satürn, 20 Yeni Uydusuyla Güneş Sisteminde En Çok Uydusu Olan Gezegen Oldu</h2>
                            <ul class="item-detail-container detail-left">
                                <li class="item-author">Emre Ömer Zehir</li>
                                <li class="item-date"><i class="pi pi-clock"></i> <span class="dt-text">14 dakika önce</span></li>
                            </ul>
                        </div>
                        <img style="width: 100%" src="https://cdn.webtekno.com/media/cache/content_detail_v2/article/77298/joker-filminden-muhtesem-gise-rakamlari-1570390645.jpg"  alt="note"/>
                    </div>
                </slide>
            </carousel>
        </div>
        <div class="p-col-12 p-md-6 p-lg-3 padding-zero">
            <div class="p-col-12">
                <div class="item-text-container text-middle">
                    <h5 class="categories-container">
                        <span class="category-name">XƏBƏRLƏR</span>
                        <span class="category-name">TEXNOLOGİYA</span>
                    </h5>
                    <h2 class="item-header-small">Satürn, 20 Yeni Uydusuyla Güneş Sisteminde En Çok Uydusu Olan Gezegen Oldu</h2>
                    <ul class="item-detail-container small-detail">
                        <li class="item-author">Emre Ömer Zehir</li>
                        <li class="item-date"><i class="pi pi-clock"></i> <span class="dt-text">14 dakika önce</span></li>
                    </ul>
                </div>
                <img style="width: 100%" src="https://cdn.webtekno.com/media/cache/showcase_small_v2/article/77345/milyarder-zuckerberg-kimsenin-milyarder-olmamasi-gerekiyor-1570466160.jpg"  alt="note"/>
            </div>
            <div class="p-col-12 padding-top-zero">
                <div class="item-text-container text-middle">
                    <h5 class="categories-container">
                        <span class="category-name">XƏBƏRLƏR</span>
                        <span class="category-name">TEXNOLOGİYA</span>
                    </h5>
                    <h2 class="item-header-small">Satürn, 20 Yeni Uydusuyla Güneş Sisteminde En Çok Uydusu Olan Gezegen Oldu</h2>
                    <ul class="item-detail-container small-detail">
                        <li class="item-author">Emre Ömer Zehir</li>
                        <li class="item-date"><i class="pi pi-clock"></i> <span class="dt-text">14 dakika önce</span></li>
                    </ul>
                </div>
                <img style="width: 100%" src="https://cdn.webtekno.com/media/cache/content_detail_v2/article/77298/joker-filminden-muhtesem-gise-rakamlari-1570390645.jpg"  alt="note"/>
            </div>
        </div>
        <div class="p-col-12 p-md-6 p-lg-3">
            <div class="item-text-container text-right">
                <h5 class="categories-container">
                    <span class="category-name">XƏBƏRLƏR</span>
                    <span class="category-name">TEXNOLOGİYA</span>
                </h5>
                <h2 class="item-header-small">Satürn, 20 Yeni Uydusuyla Güneş Sisteminde En Çok Uydusu Olan Gezegen Oldu</h2>
                <ul class="item-detail-container-right small-detail">
                    <li class="item-author">Emre Ömer Zehir</li>
                    <li class="item-date"><i class="pi pi-clock"></i> <span class="dt-text">14 dakika önce</span></li>
                </ul>
            </div>
            <img style="width: 100%" class="title-logo" src="/assets/static/img.jpg" alt="Reboot">
        </div>
    </div>

</template>


<script>
    import { Carousel, Slide } from 'vue-carousel';

    export default {
        name: "ImageSlider",
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                perPage:1,
                navigationEnabled: true,
                paginationActiveColor: '#007ad9',
                paginationColor: '#000000',
                autoplay: true,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                paginationPadding: 3,
            }
        }
    }
</script>

<style >

    .margin-zero{
        margin: 0!important;
    }
    .padding-zero{
        padding: 0!important;
    }
    .padding-top-zero{
        padding-top: 0;
    }
    .layout-view{
        margin: 8px 5px 5px 6px;
    }
    /*.center-view-top img{*/
    /*    margin-bottom: 2px;*/
    /*}*/
    .center-view-bottom img{
        margin-top: 3px;
    }
    .content-slide-item {
        align-items: center;
        background-color: #666;
        color: #999;
        display: flex;
        font-size: 1.5rem;
        justify-content: center;
        min-height: 10rem;
    }
    .VueCarousel-navigation button {
        margin: -18px 23px 0 23px!important;
        color: #fff!important;
    }

    /* Container holding the image and the text */
    .container {
        position: relative;
        text-align: center;
        color: white;
    }

    ul.item-detail-container {
        float: left;
        color: #fff;
        list-style: none;
        padding-inline-start: 0;
    }
    .small-detail{
        padding: 0;
        margin: 0;
    }
    .pad-zero{
        padding-left: 0;
        padding-right: 0;
    }
    span.category-name {
        font-family: arial, sans-serif;
        float: left;
        margin-right: 10px;
        padding: 4px 5px 4px 5px;
        background-color: red;
        font-size: 9px;
    }
    .item-middle-text-container{
        color: #ffffff;
        position: absolute;
        margin-left: 7px;
        margin-top: 26.5%;
        width: 43.4%;
    }
    .slide-text-container {
        position: absolute;
        bottom: 6px;
        left: 3px;
    }
    .item-text-container {
        color: #ffffff;
        position: absolute;
    }
    .text-middle{
        margin-top: 16%;
        width: 91%;
    }
    .text-right{
        margin-top: 79%;
        width: 61%;
    }
    h2.item-header {
        font-size: 18px;
        text-align: start;
        float: left;
        font-weight: bold;
        margin: 3px 0 0 0;
        color: #ffffff;
    }
    h2.item-header-small {
        font-size: 16px;
        font-weight: bold;
        text-align: start;
        float: left;
        margin: 4px 0 4px 0;
        color: #ffffff;
    }
    li.item-author {
        float: left;
        font-size: 12px;
    }

    li.item-date {
        float: left;
        margin-left: 5px;
        font-size: 12px;
    }
    .item-detail-container{
        display: none;
    }

    .item-text-container{
        margin-left: 3px;
    }

    @media only screen and (min-width: 360px) {
        .text-middle{
            margin-top: 20%;
        }
        .text-right{
            margin-top: 67%;
            width: 90%;
        }
    }


    @media only screen and (min-width: 420px) {
        .text-middle{
            margin-top: 30%;
        }
        .text-right{
            margin-top: 80%;
            width: 92%;
        }
    }


    @media only screen and (min-width: 530px) {
        h2.item-header {
            font-size: 21px;
        }
        h2.item-header-small {
            font-size: 19px;
        }
        .text-middle{
            margin-top: 31%;
            width: 93%;
        }
        .text-right {
            margin-top: 86%;
            width: 94%;
        }
        .item-detail-container{
            display: unset;
        }
        .slide-text-container {
            left: 5px;
        }
        .item-text-container{
            margin-left: 5px;
        }
    }

    @media only screen and (min-width: 660px) {
        .text-middle {
            margin-top: 35%;
            width: 94%;
        }

        .text-right {
            margin-top: 91%;
            width: 94%;
        }
    }

    @media only screen and (min-width: 768px) {
        .text-middle {
            margin-top: 7%;
            width: 46.4%;
        }
        .text-right {
            margin-top: 34.4%;
            width: 47%;
        }
    }

    @media only screen and (min-width: 920px) {
        .text-middle {
            margin-top: 11%;
            width: 46.4%;
        }
        .text-right {
            margin-top: 41.4%;
            width: 47%;
        }
    }

    @media only screen and (min-width: 990px) {
        .text-middle {
            margin-top: 2%;
            width: 23%;
        }
        .text-right {
            margin-top: 14%;
            width: 23%;
        }
        h2.item-header-small {
            font-size: 15px;
            font-weight: unset;
        }
        .item-detail-container{
            display: none;
        }
        .detail-left{
            display: unset;
        }
    }
    @media only screen and (min-width: 1180px) {
        .text-middle {
            margin-top: 4%;
        }
        .text-right {
            margin-top: 16%;
        }
    }
    @media only screen and (min-width: 1325px) {
        .text-middle {
            margin-top: 3.3%;
        }
        .text-right {
            margin-top: 17.3%;
        }
        .item-detail-container{
            display: unset;
        }
    }
    @media only screen and (min-width: 1400px) {
        h2.item-header {
            font-size: 24px;
        }
        .text-middle {
            margin-top: 5.5%;
        }
        .text-right {

            margin-top: 19.3%;
        }
        .item-detail-container{
            display: unset;
        }
    }
    @media only screen and (min-width: 1490px) {
        h2.item-header-small {
            font-size: 19px;
            font-weight: bold;
        }
        .text-middle {
            margin-top: 4%;
            width: 23%;
        }
        .text-right {
            margin-top: 18%;
            width: 23%;
        }
    }
</style>
