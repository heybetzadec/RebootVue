
window.addEventListener("resize", function(event) {
    close_all_menu();
    document.getElementsByTagName("body")[0].classList.remove("display_menu");
});
var last_scroll = 0;
window.onscroll = function() {
    if(!document.getElementById("loader")){
        close_all_menu();
        var header = document.getElementsByTagName("header")[0];
        if(Math.abs(last_scroll - this.scrollY) <= 5) return;
        (this.scrollY < last_scroll) ? header.style.top = "0" : header.style.top = "-" + header.clientHeight + "px" ;
        last_scroll = this.scrollY;
    }
};
var app = new Vue({
    el: '#app',
    data: {
        load : false,
    },
    methods: {
        display_menu : function(){
            var body = document.getElementsByTagName("body")[0];
            (!body.classList.contains("display_menu")) ? body.classList.add("display_menu") : body.classList.remove("display_menu");
        },
        display_drop_menu : function(){
            var drop_menu = event.target.parentElement.getElementsByClassName("drop_menu")[0];
            var drop_menus = document.getElementsByClassName("drop_menu");

            Array.from(drop_menus).forEach(function(e){
                if(e != drop_menu){
                    e.classList.remove("display");
                }
            });
            var lis = document.getElementById("menu").getElementsByTagName("li");
            Array.from(lis).forEach(function(e){
                e.style.marginTop = 0;
            });
            (!drop_menu.classList.contains("display")) ? drop_menu.classList.add("display") : drop_menu.classList.remove("display");
            if(window.innerWidth < 660 && drop_menu.classList.contains("display")) {
                event.target.parentElement.nextSibling.nextSibling.style.marginTop = drop_menu.clientHeight + "px";
            }
        },
        loaded : function(){
            document.getElementsByTagName("body")[0].style.overflowY = "hidden";
            console.log('t');
            (this.load) ? this.load = false : this.load = true;
        }
    }
});
function close_all_menu() {
    var lis = document.getElementById("menu").getElementsByTagName("li");
    Array.from(lis).forEach(function(e){
        e.style.marginTop = 0;
    });
    var drop_menus = document.getElementsByClassName("drop_menu");
    Array.from(drop_menus).forEach(function(e){
        e.classList.remove("display");
    });
}
