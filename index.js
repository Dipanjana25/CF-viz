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

//showdata
let tapsearch=document.querySelector(".search-box .t");
let databox=document.querySelector(".display-data-container");
 
tapsearch.addEventListener("click",()=>{
    databox.style.display="block";
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
// const url="https://codeforces.com/api/user.rating?handle=asr_003";
// fetch(url).then((response)=>{
//     return response.json();
// }).then((data)=>{
//     console.log(data);
// }
// );
document.getElementById("data").addEventListener("keyup", function (event) {
    event.preventDefault();
    let input = document.getElementById("data");
    if (event.keyCode === 13) {
      if (input.value == "") {
        alert("Enter user name!!")
      } else {
        document.getElementById("tap").click();
      }
    }
  });

  var ac=0,wa=0,re=0,tle=0,f=0,ce=0,p=0,mle=0,sk=0,ile=0;
function userinfo() {
    //const showw = document.querySelector(".t");
    let username = document.getElementById("data").value; 
    url1= "https://codeforces.com/api/user.info?handles="+username;
    url2="https://codeforces.com/api/user.rating?handle="+username;
    let input = document.getElementById("data");
    if (input.value == "") {
      alert("Enter user name!!")
    } else {
      async function get_data() {
          const resultContainer = document.getElementById('display-data-container');
          resultContainer.classList.add('display-data-container');
         try {
            //showw.style.display = "block";
          const response = await fetch(url1);
          const response2= await fetch(url2);
          const data = await response.json();
          const data2 = await response2.json();  
          console.log(data);
          console.log(data2);
          totcont=data2.result.length;
          url3="https://codeforces.com/api/user.status?handle="+username;
          const response3=await fetch(url3);
          const data3 = await response3.json(); 
          console.log(data3);
          fname=data.result[0].firstName;
          sname=data.result[0].lastName;
          handle=data.result[0].handle;
          maxrat=data.result[0].maxRating;
          maxrank=data.result[0].maxRank;
          cuurat=data.result[0].rating;
          const triedq = new Set();
          const solvedq = new Set();
          const map={};
          for(var i=0;i<data3.result.length;i++){
            const a=data3.result[i].problem.name;
            const b=data3.result[i].verdict;
            const c=data3.result[i].programmingLanguage;
            triedq.add(a);
            if(map[c])
            map[c]++;
            else
            map[c]=1;
            if(b==="OK"){
            solvedq.add(a);
            ac++;}
            else if(b==="WRONG_ANSWER")
            wa++;
            else if(b==="RUNTIME_ERROR")
            re++;
            else if(b==="TIME_LIMIT_EXCEEDED")
            tle++;
            else if(b==="FAILED")
            f++;
            else if(b==="PARTIAL")
            p++;
            else if(b==="COMPILATION_ERROR")
            ce++;
            else if(b==="MEMORY_LIMIT_EXCEEDED")
            mle++;
            else if(b==="SKIPPED")
            sk++;
            else if(b==="IDLENESS_LIMIT_EXCEEDED")
            ile++;
          }
          console.log(map);
          if(fname===undefined || sname ===undefined){
          usrnm = `<p> <b>Handle :</b> ${handle}</p>`;}
          else{
          usrnm = `<p> <b>User Name :</b> ${fname} ${sname}</p>`;}
          maxrt = `<p> <b>Maximum Rating:</b> ${maxrat}</p>`;
          maxrk = `<p> <b>Maximum Rank:</b> ${maxrank}</p>`;
          curat = `<p> <b>Current Rating:</b> ${cuurat}</p>`;
          totcontest = `<p> <b>Total No. of Contests:</b> ${totcont}</p>`;
          trd = `<p> <b>No. of Questions Tried:</b> ${triedq.size}</p>`;
          slvd = `<p> <b>No. of Questions Solved :</b> ${solvedq.size}</p>`;
//           avgat = `<p> <b>Average Attempts :</b> ${aat} hPa</p>`;
//           maxt = `<p> <b>Maximum Attempts :</b> ${maxatt}%</p>`;
//           slv1 = `<p> <b>Questions solved with 1 submission :</b> ${justone}</p>`;
//           maxac = `<p> <b>Maximum AC(s) </b> ${correct}</p>`;
  
            document.getElementById("username").innerHTML = usrnm;
            document.getElementById("mxrt").innerHTML = maxrt;
            document.getElementById("mxrk").innerHTML = maxrk;
            document.getElementById("crt").innerHTML = curat;
            document.getElementById("tc").innerHTML = totcontest;
            document.getElementById("Tried").innerHTML = trd;
            document.getElementById("Solved").innerHTML = slvd;
// //           document.getElementById("Average-Attempts").innerHTML = avgat;
// //           document.getElementById("Max-Attempts").innerHTML = maxt;
// //           document.getElementById("Solved-with-one-submission").innerHTML = slv1;
// //           document.getElementById("Max-AC").innerHTML = maxac;
         }
         catch (err) {
                document.getElementById("username").innerHTML = `<p class="warn" style="color: red; font-weight: bolder; display:flex; justify-content: center;">Please enter a valid user handle</b></p>`;
                document.getElementById("mxrt").innerHTML = '';
                document.getElementById("mxrk").innerHTML = '';
                document.getElementById("crt").innerHTML = ''; 
                document.getElementById("tc").innerHTML = '';
                document.getElementById("Tried").innerHTML = '';
                document.getElementById("Solved").innerHTML = '';
//              document.getElementById("Average-Attempts").innerHTML = '';
//              document.getElementById("Max-Attempts").innerHTML = '';
//              document.getElementById("Solved-with-one-submission").innerHTML = '';
//              document.getElementById("Max-AC").innerHTML = '';
//              document.body.style =
//               "background-image:repeating-linear-gradient(#edebeb , #fffcfc)";
         }
          google.charts.load('current', {'packages':['corechart']});
          google.charts.setOnLoadCallback(drawChart);
          async function drawChart() {
            var data = google.visualization.arrayToDataTable([
              ['Verdicts', 'Number'],
              ['AC',ac],
              ['WA',wa],
              ['RE',re],
              ['CE',ce],
              ['TLE',tle],
              ['FAILED',f],
              ['PARTIAL',p],
              ['MLE',mle],
              ['SKIPPED',sk],
              ['ILE',ile]
            ]);
            
            var options = {
              title:'Verdicts of '+handle,
              is3D:true,
              colors: ['#4CAF50', '#f44336', '#FF5722', '#607D8B', '#2196F3']
            };
          
          var chart = new google.visualization.PieChart(document.getElementById('myChart'));
            chart.draw(data, options);
          } 
          drawChart();
          // google.charts.load('current', {'packages':['corechart']});
          // google.charts.setOnLoadCallback(drawlangChart);
          // async function drawlangChart() {
          //     //console.log(ac);
          //     var data = google.visualization.arrayToDataTable([
          //       ['Language', 'Percentage'],
          //       for (const x of map.entries()) {
                
          //         [x.key,x.value],
          //       }
          //       ]);
          //   // var data = google.visualization.arrayToDataTable([
          //   //   ['Language', 'Percentage'],
          //   //   ['GNU C++17',45]
          //   // ]);
            
          //   var noptions = {
          //     title:'Languages used by '+handle,
          //     is3D:true
          //   };
          
          // var nchart = new google.visualization.PieChart(document.getElementById('mylangChart'));
          //   nchart.draw(data, noptions);
          // }
          // drawlangChart(); 
        }
        get_data();
  }
}
