'use strict';

const $chatAreaMain = document.querySelector('.chatarea__main');
const $chatAreaOuter = document.querySelector('.chatarea__outer');
const $buttons = document.querySelectorAll('.header__top-wrapper');
const $decors = document.querySelectorAll('.decor');
const $master = document.querySelector('.rotate__animate');
const $bot = document.querySelector('.bot__img');

let state = {
    response: '',
    avatar: 'default',
    visible: false,
    count: 0
}

const bot = {
    actions: [
        {
            greetings: {
                response: [
                    "Hello! Welcome to my Master's Gallery",
                    "Hi, welcome to my Master's Gallery",
                ],
                avatar: 'greetings',
            },
        },
        {
            introduce: {
                response: [
                    'My name is Botty. Nice to meet you!',
                    "I'am Botty. Nice to meet you!",
                ],
                avatar: 'introduce',
            },
        },
        {
            wiki: {
                data: [
                    {
                        color: 'rgb(97, 218, 249)',
                        response: 'Nice catch! It\'s React main color.',
                    },
                    {
                        color: 'rgb(118, 74, 188)',
                        response: 'Btw this is Redux main color.',
                    },
                    {
                        color: 'rgb(222, 52, 51)',
                        response: 'You have found Angular main color.',
                    },
                    {
                        color: 'rgb(83, 184, 131)',
                        response: 'Did you know this is Vue main color.',
                    },
                ],
                avatar: [
                    'wiki-1',
                    'wiki-2',
                    'wiki-3',
                    'wiki-4'
                ],
            },
        },
        {
            angry: {
                response: 'Hey! Please stop lol!',
                avatar: 'angry',
            },
        },
        {
            master: {
                response: 'This is my Master! I like him.',
                avatar: 'master',
            }
        },
        {
            theme: {
                response: {
                    light: 'Light theme.',
                    dark: 'Dark theme.',
                },
                avatar: {
                    light: 'light',
                    dark: 'dark',
                },
            },
        },
    ],
}

const getColor = e => {
    const $elem = e.target || e.currentTarget;

    const color = window
        .getComputedStyle($elem)
        .getPropertyValue('background-color');
    
    return color;
}

const parseMessage = (action, state) => {
    const [{ greetings }, { introduce },  { wiki }, { angry }, { master }, { theme }] = bot.actions;
    const random = arr => arr[Math.floor(Math.random() * arr.length)];
   
    console.log(action.type, action.payload, state, wiki.data);
    switch (action.type) {
        case 'GREETINGS':
            return {
                ...state,
                response: random(greetings.response),
                avatar: 'greetings'
            };
        case 'COLOR':
            const res = wiki.data.filter(item => item.color === action.payload);
            
            return {
                ...state,
                response: res[0]?.response,
                avatar: random(wiki.avatar)
            };
        case 'INTRODUCE':
            return {
                ...state,
                response: random(introduce.response),
                avatar: 'introduce'
            };
        case 'ANGRY':
            return {
                ...state,
                response: angry.response,
                avatar: 'angry'
            };
        case 'MASTER':
            return {
                ...state,
                response: master.response,
                avatar: 'likes'
            };
        case 'THEME':
            return {
                ...state,
                response: action.payload === 'light' ? theme.response.light : theme.response.dark,
                avatar: action.payload === 'light' ? theme.avatar.light : theme.avatar.dark,
            };
        default:
            return state;
    }
}

const botAvatar = () => {
    const $avatar = document.querySelector('#bot');

    $avatar.src = `images/bot/${state.avatar}.png`;
}

const showBotMsg = botMsg => {
    const $msg = `
        <p class="botarea__inner float-up">
            <span>${botMsg}</span> 
        </p>`;

    $chatAreaOuter.insertAdjacentHTML('beforeend', $msg);

    return $chatAreaOuter;
}

const removeBotMsg = () => {
    const $msg = document.querySelectorAll('.botarea__inner');
    const $lastNode = $msg[$msg.length - 1];
    
    $msg.forEach(item => {
        if (item !== $lastNode) {
            setTimeout(() => {
                item.classList.remove('float-up');
                item.classList.add('text-blur-out');
            }, 5000);
            setTimeout(() => {
                item.remove();
            }, 10000);
       }
    })

    $lastNode.addEventListener('click', () => {
        $lastNode.classList.remove('float-up');
        $lastNode.classList.add('text-blur-out');
        state.avatar = 'rip';

        botAvatar();
    })
}
   // $chatAreaOuter.scrollTop = $chatAreaOuter.scrollHeight;

const botVoice = async msg => {
    const speech = new SpeechSynthesisUtterance();
    state = await parseMessage(msg, state);

    console.log(state);
    
    speech.text = state.response;

	botAvatar();

    window.speechSynthesis.speak(speech);
    $chatAreaMain.append(showBotMsg(speech.text)); 
    $chatAreaOuter.scrollTop = $chatAreaOuter.scrollHeight; //TODO

    removeBotMsg();
}

$buttons.forEach(item => {
    item.addEventListener('click', () => {  
        if (!state.visible) return;
        
        let theme;

        item.classList.contains('--light') && (theme = 'dark');
        item.classList.contains('--dark') && (theme = 'light');

        botVoice({ type: 'THEME', payload: theme });
    })
})

$decors.forEach(item => {
    item.addEventListener('mouseenter', e => {
        const color = getColor(e);

        botVoice({ type: 'COLOR', payload: color });
    })
})

$master.addEventListener('mouseenter', e => {
    botVoice({ type: 'MASTER' });
})

$bot.addEventListener('mouseenter', () => {
    state.count++;

    if (state.avatar !== 'sleep') {
       state.avatar = 'hey';
       state.count = 0;
    }

    if (state.avatar === 'sleep' && state.count >= 3) {
        state.avatar = 'huh';
        state.count = 0;
    }

    botAvatar();
})

setInterval(() => {
    if (state.avatar !== 'default') return;

    state.avatar = 'sleep';

    botAvatar();
}, 32000);

setInterval(() => {
    if (state.avatar === 'sleep') return;

    state.avatar = 'default';

    botAvatar();
}, 10000);

const observer = new IntersectionObserver(function(elems, observer) {
    console.log(elems);
    elems.forEach(elem => {
        if (!elem.isIntersecting) return;
        
        state.visible = !state.visible;
        //elem.target.classList.add('slide-in-bottom');
        botVoice({ type: 'GREETINGS' });

        observer.unobserve(elem.target);
    })
}, {
    root: null,
    threshold: 1,
    rootMargin: ''
})

observer.observe($bot);

export default botVoice;