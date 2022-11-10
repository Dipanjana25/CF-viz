var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid var(--text-color)}";
    document.body.appendChild(css);
};

let tapsearch=document.querySelector(".cute .compac");
let car4=document.querySelector(".card4");
let car5=document.querySelector(".card5");
let car6=document.querySelector(".card6");
let car7=document.querySelector(".card7");
let car8=document.querySelector(".card8");
 
tapsearch.addEventListener("click",()=>{
    car4.style.display="block"
    car5.style.display="block";
    car6.style.display="block";
    car7.style.display="block";
    car8.style.display="block";
});
//burger menu
let menuOpenBtn=document.querySelector(".navbar .bx-menu");
let closeOpenBtn=document.querySelector(".navlinks .bx-x");
let navLinks=document.querySelector(".navlinks");
 
menuOpenBtn.addEventListener("click",()=>{
    navLinks.style.left="0";
});
closeOpenBtn.addEventListener("click",()=>{
    navLinks.style.left="-100%";
});

//darkmode
var tog=document.getElementById("theme-toggle");
var stheme= localStorage.getItem('theme')||(window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
if (stheme)
    document.documentElement.setAttribute('data-theme', stheme)
tog.onclick=function toggle(){
    var ctheme = document.documentElement.getAttribute("data-theme");
    var targetTheme = "light";
    if (ctheme === "light") {
        targetTheme = "dark";
    }
    else if (ctheme === "dark"){
        targetTheme = "light";
    }
    document.documentElement.setAttribute('data-theme', targetTheme)
    localStorage.setItem('theme', targetTheme);
};

document.getElementById("data2").addEventListener("keyup", function (event) {
    event.preventDefault();
    let input = document.getElementById("data2");
    if (event.keyCode === 13) {
      if (input.value == "") {
        alert("Enter user name!!")
      } else {
        document.getElementById("compa").click();
      }
    }
  });




var maxrat1=0,maxrat2=0,currat1=0,currat2=0,cont1=0,cont2=0,maxup1=0,maxup2=0,maxdown1=0,maxdown2=0,rat1=0,rat2=0;
const triedqa = new Set();
const solvedqa = new Set();
const triedqb = new Set();
const solvedqb = new Set();
var tg={};
var maptg={};
var maprat={};
var mapind={};
var colors = ['#009688', '#3F51B5'];
function compareinfo() {
    let username1 = document.getElementById("data1").value; 
    let username2 = document.getElementById("data2").value; 
    url1= "https://codeforces.com/api/user.info?handles="+username1+";"+username2;
    url2a="https://codeforces.com/api/user.rating?handle="+username1;
    url2b="https://codeforces.com/api/user.rating?handle="+username2;
    let input1 = document.getElementById("data1");
    let input2 = document.getElementById("data2");
    if (input1.value == ""||input2.value == "") {
    alert("Enter both the user names!!")
    } 
    else {
       async function get_data() {
          try {
           const response1 = await fetch(url1);
           const response2a= await fetch(url2a);
           const response2b= await fetch(url2b);
           const data = await response1.json();
           const data2a=await response2a.json();
           const data2b=await response2b.json();
           url3a="https://codeforces.com/api/user.status?handle="+username1;
           url3b="https://codeforces.com/api/user.status?handle="+username2;
           const response3a=await fetch(url3a);
           const data3a = await response3a.json(); 
           const response3b=await fetch(url3b);
           const data3b = await response3b.json(); 
           cont1=data2a.result.length;
           cont2=data2b.result.length;
           maxrat1=data.result[0].maxRating;
           maxrat2=data.result[1].maxRating;
           currat1=data.result[0].rating;
           currat2=data.result[1].rating;
           var minrat1=data2a.result[0].newRating;
           var minrat2=data2b.result[0].newRating;
          for(var i=0;i<data2a.result.length;i++){
            minrat1=Math.min(minrat1,data2a.result[i].newRating);
            if(data2a.result[i].newRating>=data2a.result[i].oldRating)
            maxup1=Math.max(maxup1,(data2a.result[i].newRating-data2a.result[i].oldRating));
            else
            maxdown1=Math.min(maxdown1,(data2a.result[i].newRating-data2a.result[i].oldRating));
          }
          for(var i=0;i<data3a.result.length;i++){
            const a=data3a.result[i].problem.name;
            triedqa.add(a);
            const b=data3a.result[i].verdict;
            if(b==="OK")
            solvedqa.add(a);
          }
          for(var i=0;i<data2b.result.length;i++){
            minrat2=Math.min(minrat2,data2b.result[i].newRating);
            if(data2b.result[i].newRating>=data2b.result[i].oldRating)
            maxup2=Math.max(maxup2,(data2b.result[i].newRating-data2b.result[i].oldRating));
            else
            maxdown2=Math.min(maxdown2,(data2b.result[i].newRating-data2b.result[i].oldRating));
          }
          for(var i=0;i<data3b.result.length;i++){
            const a=data3b.result[i].problem.name;
            triedqb.add(a);
            const b=data3b.result[i].verdict;
            if(b==="OK")
            solvedqb.add(a);
           }
          //  console.log(minrat1,minrat2,maxup1,maxup2,maxdown1,maxdown2);
           google.charts.load('current', {'packages':['corechart']});
           google.charts.setOnLoadCallback(drawcomcharts);
           async function drawcomcharts(){
            var rating = new google.visualization.arrayToDataTable([
                ['Handle', username1, username2],
                ['Current Rating', currat1, currat2],
                ['Maximum Rating', maxrat1, maxrat2],
                ['Minimum Rating', minrat1, minrat2]
              ]);
              var ratingOptions = {
                title:"Rating Comparison",
                colors: colors,
                vAxis: {
                  minValue: 0
                }
            };
              var ratingChart = new google.visualization.ColumnChart(
                document.getElementById('chartContainer')
              );
              ratingChart.draw(rating, ratingOptions);
           }
           drawcomcharts(); 
           google.charts.setOnLoadCallback(drawcomcharts1);
           async function drawcomcharts1(){
            var updown = new google.visualization.arrayToDataTable([
                ['Handle', username1, username2],
                ['Max Up', maxup1, maxup2],
                ['Max Down', maxdown1, maxdown2]
              ]);
              var Options = {
                title:"Difference Comparison",
                colors: colors,
                vAxis: {
                  minValue: 0
                }
            };
              var ratingChart = new google.visualization.ColumnChart(
                document.getElementById('chartContainer1')
              );
              ratingChart.draw(updown, Options);
           }
           drawcomcharts1(); 
           google.charts.setOnLoadCallback(drawcomcharts2);
           async function drawcomcharts2(){
            var contestss = new google.visualization.arrayToDataTable([
                ['Handle', username1, username2],
                ['Contests', cont1,cont2]
              ]);
              var Options = {
                title:"No. Of Contests",
                colors: colors,
                vAxis: {
                  minValue: 0
                }
            };
              var ratingChart = new google.visualization.ColumnChart(
                document.getElementById('chartContainer2')
              );
              ratingChart.draw(contestss, Options);
           }
           drawcomcharts2();  
           google.charts.setOnLoadCallback(drawcomcharts3);
           async function drawcomcharts3(){
            var trisol = new google.visualization.arrayToDataTable([
                ['Handle', username1, username2],
                ['Tried', triedqa.size,triedqb.size],
                ['Solved',solvedqa.size,solvedqb.size]
              ]);
              var Options = {
                title:"Tried and Solved",
                colors: colors,
                vAxis: {
                  minValue: 0
                }
            };
              var ratingChart = new google.visualization.ColumnChart(
                document.getElementById('chartContainer3')
              );
              ratingChart.draw(trisol, Options);
           }
           drawcomcharts3();  
           google.charts.setOnLoadCallback(drawcomcharts4);
           async function drawcomcharts4(){
            var trisol = new google.visualization.arrayToDataTable([
                ['Handle', username1, username2],
                ['Unsolved', triedqa.size-solvedqa.size, triedqb.size-solvedqb.size]
              ]);
              var Options = {
                title:"UnSolved",
                colors: colors,
                vAxis: {
                  minValue: 0
                }
            };
              var ratingChart = new google.visualization.ColumnChart(
                document.getElementById('chartContainer4')
              );
              ratingChart.draw(trisol, Options);
           }
           drawcomcharts4();         
          }
          catch (err) {
                 document.getElementById("warning").innerHTML = `<p class="warn" style="color: red; font-weight: bolder; display:flex; justify-content: center;">Please enter a valid user handle</b></p>`;
          }
         }
         get_data();
   }

}