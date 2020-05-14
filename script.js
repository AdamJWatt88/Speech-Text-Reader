const closeBtn = document.getElementById('close');
const toggleBtn = document.getElementById('toggle');
const textBox = document.getElementById('text-box');
const textArea = document.getElementById('text');
const readBtn = document.getElementById('read');
const main = document.querySelector('main');
const voiceSelect = document.getElementById('voices');


const images = [{
        image: 'img/angry.jpg',
        text: "I'M ANGRY"
    },
    {
        image: 'img/drink.jpg',
        text: "I'M THIRSTY"
    },
    {
        image: 'img/food.jpg',
        text: "I'M HUNGRY"
    },
    {
        image: 'img/grandma.jpg',
        text: "I WANT TO GO TO GRANDMAS"
    },
    {
        image: 'img/happy.jpg',
        text: "I'M HAPPY"
    },
    {
        image: 'img/home.jpg',
        text: "I WANT TO GO HOME"
    },
    {
        image: 'img/hurt.jpg',
        text: "I'M HURT"
    },
    {
        image: 'img/outside.jpg',
        text: "I WANT TO GO OUTSIDE"
    },
    {
        image: 'img/sad.jpg',
        text: "I'M SAD"
    },
    {
        image: 'img/scared.jpg',
        text: "I'M SCARED"
    },
    {
        image: 'img/school.jpg',
        text: "I WANT TO GO TO SCHOOL"
    },
    {
        image: 'img/tired.jpg',
        text: "I'M TIRED"
    }
]

function addToDOM() {

    images.forEach(function (item) {
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `<img src="${item.image}">
    <p class="info">${item.text}</p>
    `
        main.appendChild(card)
    });
}

function clearActive() {
    main.querySelectorAll('.card').forEach(card => card.classList.remove('active'))
}

async function addVoices() {
    let voices = [];
    const synth = window.speechSynthesis;
    voices = synth.getVoices();
    await voices.forEach(function (voice) {
        const option = document.createElement('option');
        option.value = voice.lang;
        option.innerHTML = voice.name;
        voiceSelect.appendChild(option)
    })
}

function speakCardInfo(testword) {
    let voices = [];
    const synth = window.speechSynthesis;
    voices = synth.getVoices();
    let chosenVoice = voiceSelect.value;

    const test = new SpeechSynthesisUtterance(testword)
    test.lang = chosenVoice;
    
    // speaks word that is passed as parameter
    synth.speak(test)
}

addToDOM();
addVoices();

window.addEventListener('load', addVoices)
toggleBtn.addEventListener('click', () => textBox.classList.add('show'))
closeBtn.addEventListener('click', () => textBox.classList.remove('show'))
main.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => card.classList.add('active')));

main.querySelectorAll('.card').forEach(card => card.addEventListener('click', () => setTimeout(clearActive, 1000)));

main.querySelectorAll('.card')
    .forEach(card => card.addEventListener('click', () => card.querySelectorAll('.info')
    .forEach(para => speakCardInfo(para.innerHTML)))
    );

readBtn.addEventListener('click', () => speakCardInfo(textArea.value) )

    