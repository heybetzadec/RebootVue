<template>
<div>
    <ImageSlider/>

    <div class="p-col-12 p-md-7 p-lg-9 p-col-nogutter float-left">
        <div class="p-col-12">
            <Card style="width: 100%;">
                <template slot="title">
                    Zaman tuneli
                </template>

                <template slot="content">
                    <div id="timeline-content">
                        <ul class="timeline">
                            <li class="event" data-date="65Million B.C.">
                                <img src="https://cdn.webtekno.com/media/cache/showcase_small_v2/article/77345/milyarder-zuckerberg-kimsenin-milyarder-olmamasi-gerekiyor-1570466160.jpg" alt="note">
                                <h3>Dinosaurs Roamed the Earth</h3>
                                <p>"We design and build from scratch!" 📣<p/> <p>When we say <em><strong>100% custom</strong></em> we mean it— and we build all sites on the Squarespace Developer platform.<p/>
                                <p>Did you know that all of our pixels are hand-forged from the rarest of subpixels grown and harvested in the <em>Nerd Forest</em>? <br>🤜💥🤛</p>

                                <p><strong>Our success can be measured by lives and brands enhanced by 9+ years of 100% Squarespace-focused service!</strong></p>

                            </li>
                            <li class="event" data-date="2005">
                                <h3>Creative Component Launched</h3>
                                <p>"We can be all things to all people!" 📣</p>
                            </li>
                            <li class="event" id="date" data-date="2009">
                                <h3>Squareflair was Born</h3>
                                <p></p> <p>"We can be all things to Squarespace users!" 📣</p>
                            </li>

                            <li class="event" data-date="November 15, 2018">

                                <h3>Squareflair Today</h3>

                                <p>"We design and build from scratch!" 📣<p/> <p>When we say <em><strong>100% custom</strong></em> we mean it— and we build all sites on the Squarespace Developer platform.<p/>
                                <p>Did you know that all of our pixels are hand-forged from the rarest of subpixels grown and harvested in the <em>Nerd Forest</em>? <br>🤜💥🤛</p>

                                <p><strong>Our success can be measured by lives and brands enhanced by 9+ years of 100% Squarespace-focused service!</strong></p>

                            </li>
                        </ul>
                    </div>
                </template>
            </Card>
        </div>
    </div>
    <div class="p-col-12 p-md-5 p-lg-3 float-left">
        <Card style="width: 100%">
            <template slot="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </template>
        </Card>
        <Card style="width: 100%">
            <template slot="title">
                Sag panel
            </template>
            <template slot="content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae numquam deserunt
                quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
            </template>
        </Card>
    </div>

</div>

</template>

<script>
    import ImageSlider from './ImageSlider';
    export default {
        components: {
            ImageSlider,
        },
        data() {
            return {

            }
        }
    }
</script>

<style scoped lang="css">
    .float-left{
        float: left;
    }
    .right-box{

    }

    p {
        font-weight: 300;
        color: #000;
    }
    a {
        color: #6c6d6d;
        text-decoration: none;
        text-transform: uppercase;
        display: block;
        letter-spacing: .3em;
        font-size: .6em;
        font-weight: 400;
        background: #252727;
        padding: .3rem 1rem;
        margin: 1.9rem 0 0 0;
        float: right;
    }
    a:hover {
        color: #ffffff;
        background: #004ffc;
        border-bottom: .35em solid black;
    }
    strong {
        font-weight: 600;
    }
    h1 {
        font-family: 'Saira', sans-serif;
        letter-spacing: 1.5px;
        color: #ffffff;
        font-weight: 400;
        font-size: 2.4em;
    }
    #timeline-content {
        /*margin-left: 21%;*/
        /*margin-top: 50px;*/
        text-align: left;
    }
    /* Timeline */
    .timeline {
        border-left: 4px solid #007ad9;
        border-bottom-right-radius: 4px;
        border-top-right-radius: 4px;
        background: rgba(255, 255, 255, 0.03);
        color: rgba(255, 255, 255, 0.8);
        font-family: 'Chivo', sans-serif;
        letter-spacing: 0.5px;
        position: relative;
        line-height: 1.4em;
        font-size: 1.03em;
        padding: 50px;
        list-style: none;
        text-align: left;
        font-weight: 100;
        margin: 20px auto 50px 21%;
        /*max-width: 30%;*/
    }
    .timeline h1 {
        font-family: 'Saira', sans-serif;
        letter-spacing: 1.5px;
        font-weight: 100;
        font-size: 1.4em;
    }
    .timeline h2,
    .timeline h3 {
        font-family: 'Saira', sans-serif;
        letter-spacing: 1.5px;
        font-weight: 400;
        font-size: 1.4em;
        color: #000000;
    }
    .timeline .event {
        border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
        padding-bottom: 25px;
        margin-bottom: 50px;
        position: relative;
    }
    .timeline .event:last-of-type {
        padding-bottom: 0;
        margin-bottom: 0;
        border: none;
    }
    .timeline .event:before,
    .timeline .event:after {
        position: absolute;
        display: block;
        top: 0;
        width: min-content;
    }
    .timeline .event:before {
        color: #3b3e47;
        left: -200px;
        content: attr(data-date);
        text-align: right;
        font-weight: 100;
        font-size: 0.9em;
        min-width: 120px;
        font-family: 'Saira', sans-serif;
    }
    .timeline .event:after {
        box-shadow: 0 0 0 4px #004ffc;
        left: -57.85px;
        background: #313534;
        border-radius: 50%;
        height: 11px;
        width: 11px;
        content: "";
        top: 5px;
    }

    @media only screen and (min-width: 770px) {
        .timeline {
            margin: 20px auto 50px 24%;
        }
    }

    @media only screen and (min-width: 990px) {
        .timeline {
            margin: 20px auto 50px 15%;
        }
    }

    @media only screen and (min-width: 1150px) {
        .timeline .event:before {
            left: -217.5px;
        }
    }

</style>

