// const header_top = document.querySelector('.header-top');
// window.addEventListener("scroll", function(){
//     if ( document.body.scrollTop >= 120 || document.scrollingElement.scrollTop >= 120 || document.documentElement.scrollTop >= 120 ) {
//         header_top.classList.add("fixed");
//     } else {
//         header_top.classList.remove("fixed");
//     }
// });

const subMenuBtn = document.querySelectorAll('.has-submenu');
subMenuBtn.forEach(btn => {

    
    if (window.screen.width >= 990) {
        btn.addEventListener('mouseover', () => {
            btn.classList.add('focused');
        });
        btn.addEventListener('mouseout', () => {
            btn.classList.remove('focused');
        });
    } else {
        btn.addEventListener('click', () => {
            btn.classList.toggle('focused');
        });
        btn.addEventListener('mouseout', () => {
            btn.classList.remove('focused');
        });
    }

});

const burgerBtn = document.querySelector('#burger-btn');
const topMenu = document.querySelector('#navbar');

burgerBtn.addEventListener('click', () => {
    topMenu.classList.toggle('active');
    burgerBtn.classList.toggle('active');
});