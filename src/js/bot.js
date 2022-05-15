'use strict';

const $chatAreaMain = document.querySelector('.chatarea-main');
const $chatAreaOuter = document.querySelector('.chatarea-outer');
const $bot = document.querySelector('.bot__img');

const hello = [
    'Hello! Welcome to my Master\'s Gallery',
    'Hi',
    'Hello, ',
]

const showBotMsg = botMsg => {
    let output = '';

    output += `<p class="botarea-inner">${botMsg}</p>`;
    $chatAreaOuter.innerHTML += output;

    return $chatAreaOuter;
}

const botVoice = message => {
    const speech = new SpeechSynthesisUtterance();

    speech.text = 'This is test message';
	speech.text =  hello[Math.floor(Math.random() * hello.length)];
        // if (message.includes('who are you')) {
        //     const finalResult = intro[Math.floor(Math.random() * hello.length)];

        //     speech.text = finalResult;
        // }

	window.speechSynthesis.speak(speech);

    $chatAreaMain.append(showBotMsg(speech.text));
}

// recognition.onresult = e => {
//     const resultIndex = e.resultIndex;
//     const transcript = e.results[resultIndex][0].transcript;

//     $chatAreaMain.append(showUserMsg(transcript));

//     botVoice(transcript);

//     console.log(transcript, e);
// }

$bot.addEventListener('click', () => {

    botVoice();
    console.log('Activated');
})

export default null;