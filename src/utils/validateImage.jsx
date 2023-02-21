export default function checkErrorImage(url){
    let img = document.createElement('img');
    img.src = url;
    img.onload =  () => false;
    img.onerror = ()=> true;
}