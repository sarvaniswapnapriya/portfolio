var typed = new Typed(".typing",{
    strings:[" ","Web Designer", "Python Developer", "Content Writer"],
    typeSpeed:100,
    BackSpeed:100,
    loop:true
})
var header = document.getElementById("aside");

// $('.asideh1').addClass("active");
// var btns = header.getElementsByClassName("asideh");
// for (var i = 0; i < btns.length; i++) {
//   btns[i].addEventListener("click", function() {
//   var current = document.getElementsByClassName("active");
//   if (current.length > 0) { 
//     current[0].className = current[0].className.replace(" active", "");
//   }
//   this.className += " active";
//   });
// };

const sections=document.querySelectorAll('section');
const navLi= document.querySelectorAll("ul li a");
window.addEventListener("scroll", ()=>{
  let current='';
  sections.forEach( section=>{
    const sectionTop=section.offsetTop;
    console.log(sectionTop);
    const sectionHeight =section.clientHeight;
    if(scrollY >=(sectionTop-sectionHeight/3)){
      current=section.getAttribute('id');
    };
  });
  console.log(current)
  navLi.forEach(li =>{
    li.classList.remove('active');
    if(li.classList.contains(current)){
      li.classList.add('active')
    };
  });
})