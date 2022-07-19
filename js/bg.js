const imgs = [
  "img01.jpg",
  "img02.jpg",
  "img03.jpg",
  "img04.jpg",
  "img05.jpg",
  "img06.jpg",
  "img07.jpg",
  "img08.jpg",
  "img09.jpg",
  "img10.jpg",
  "img11.jpg",
  "img12.jpg",
  "img13.jpg",
  "img14.jpg",
  "img15.jpg",
  "img16.jpg",
]

const wrapBg = document.querySelector('.wrapBg');
let randomImgs = imgs[Math.floor(Math.random()*imgs.length)];

wrapBg.style.background = `url(./img/${randomImgs}) no-repeat center center`
wrapBg.style.backgroundSize= `cover`;

const loading = document.querySelector('.loading');
const loadingFn = () =>{
  loading.classList.add('out');
  setTimeout(function(){
    loading.style.display = 'none';
  },800)
}

setTimeout(loadingFn,700)


