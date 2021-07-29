//loader script
function func() {
    document.getElementById("loader").style.display = "none";
}

// testimonial script
document.getElementById("btn-1").addEventListener('click', function() {
    document.getElementById("move").style.transform= "translate(0px)";
    document.getElementById("btn-1").style.width = "30px";
    document.getElementById("btn-2").style.width = "12px";
    document.getElementById("btn-3").style.width = "12px";
    document.getElementById("btn-4").style.width = "12px";
    document.getElementById("btn-5").style.width = "12px";
});
document.getElementById("btn-2").addEventListener('click', function() {
    document.getElementById("move").style.transform= "translate(-750px)";
    document.getElementById("btn-2").style.width = "30px";
    document.getElementById("btn-1").style.width = "12px";
    document.getElementById("btn-3").style.width = "12px";
    document.getElementById("btn-4").style.width = "12px";
    document.getElementById("btn-5").style.width = "12px";
});
document.getElementById("btn-3").addEventListener('click', function() {
    document.getElementById("move").style.transform= "translate(-1500px)";
    document.getElementById("btn-3").style.width = "30px";
    document.getElementById("btn-2").style.width = "12px";
    document.getElementById("btn-1").style.width = "12px";
    document.getElementById("btn-4").style.width = "12px";
    document.getElementById("btn-5").style.width = "12px";
});
document.getElementById("btn-4").addEventListener('click', function() {
    document.getElementById("move").style.transform= "translate(-2250px)";
    document.getElementById("btn-4").style.width = "30px";
    document.getElementById("btn-2").style.width = "12px";
    document.getElementById("btn-3").style.width = "12px";
    document.getElementById("btn-1").style.width = "12px";
    document.getElementById("btn-5").style.width = "12px";
});
document.getElementById("btn-5").addEventListener('click', function() {
    document.getElementById("move").style.transform= "translate(-3000px)";
    document.getElementById("btn-5").style.width = "30px";
    document.getElementById("btn-2").style.width = "12px";
    document.getElementById("btn-3").style.width = "12px";
    document.getElementById("btn-4").style.width = "12px";
    document.getElementById("btn-1").style.width = "12px";
});

// testimonial auto
var i = 0;
var intervalId = setInterval(function(){
if(i === 4){
    clearInterval(intervalId);
}
document.getElementById("move").style.transform= "translate(-"+ i*750 +"px)";
i++;
}, 5000);


// sidebar script
document.getElementById("bar").addEventListener('click', function() {
    document.getElementById("nav-expand").style.transform= "translate(0px)";
    document.getElementById("cross").style.display = "inline";
    document.getElementById("bar").style.display = "none";
});

document.getElementById("cross").addEventListener('click', function() {
    document.getElementById("nav-expand").style.transform = "translate(100vw)";
    document.getElementById("bar").style.display = "inline";
    document.getElementById("cross").style.display = "none";
});


document.getElementById("arrow").addEventListener('click', function() {
    window.scroll({
        top: 620, 
        left: 0, 
        behavior: 'smooth' 
    });
});

