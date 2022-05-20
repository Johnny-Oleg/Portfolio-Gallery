'use strict';

const $chatAreaMain = document.querySelector('.chatarea__main');
const $chatAreaOuter = document.querySelector('.chatarea__outer');

const hello = [
    "Hello! Welcome to my Master's Gallery",
    "Hi, welcome to my Master's Gallery",
];

const showBotMsg = botMsg => {
    const $msg = `
        <p class="botarea__inner">
            <span>${botMsg}</span> 
        </p>`;

    $chatAreaOuter.insertAdjacentHTML('beforeend', $msg);

    return $chatAreaOuter;
}

const botVoice = message => {
    const speech = new SpeechSynthesisUtterance();

	speech.text =  hello[Math.floor(Math.random() * hello.length)];
        // if (message.includes('who are you')) {
        //     const finalResult = intro[Math.floor(Math.random() * hello.length)];

        //     speech.text = finalResult;
        // }

	window.speechSynthesis.speak(speech);

    $chatAreaMain.append(showBotMsg(speech.text));
}

export default botVoice;