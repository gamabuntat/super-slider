import './demo.sass';

console.log('demo');

const s1 = document.querySelector('#slider1');
s1.style.display = 'none';
setTimeout(() => s1.style.display = '', 1000);

