// ─── State ───────────────────────────────────────────────
let currentSubject = 'home';
let chatHistory   = [];
let apiKey        = localStorage.getItem('tutorbuddy_api_key') || '';

// ─── Vocabulary Data ──────────────────────────────────────
const vocabWords = [
    { word: 'Curious',     definition: 'Eager to learn or know about something',              example: 'The curious kitten explored every corner of the room.' },
    { word: 'Brave',       definition: 'Ready to face danger or difficulty without fear',    example: 'The brave firefighter rushed into the burning building.' },
    { word: 'Enormous',    definition: 'Very large in size or amount',                       example: 'The enormous elephant splashed in the river.' },
    { word: 'Gentle',      definition: 'Kind, soft, and careful in manner',                  example: 'She gave the puppy a gentle pat on the head.' },
    { word: 'Magnificent', definition: 'Impressively beautiful or grand',                    example: 'The magnificent castle stood on top of the hill.' },
    { word: 'Peculiar',    definition: 'Strange or unusual; different from what is normal', example: 'The peculiar sound made everyone stop and listen.' },
    { word: 'Triumph',     definition: 'A great victory or achievement',                     example: 'Winning the race was a triumph for the young athlete.' },
    { word: 'Vivid',       definition: 'Producing strong, clear images in the mind',        example: 'She had a vivid dream about flying over the ocean.' },
];

let currentWordIndex = 0;

// ─── Animal Data ──────────────────────────────────────────
const animalData = {
    lion: {
        name: 'Lion', emoji: '🦁',
        facts: [
            '🌍 Lions live in Africa and parts of India',
            '👑 Lions are called the "King of the Jungle"',
            '👪 A group of lions is called a <b>pride</b>',
            '😴 Lions sleep up to 20 hours a day!',
            '🍖 Lions are carnivores — they eat meat',
            '📏 Male lions can weigh up to 420 pounds (190 kg)',
        ]
    },
    elephant: {
        name: 'Elephant', emoji: '🐘',
        facts: [
            '🧠 Elephants are one of the smartest animals on Earth',
            '💧 Elephants use their trunk to drink and spray water',
            '👂 Their large ears help them stay cool',
            '📏 African elephants are the largest land animals',
            '👶 Baby elephants are called <b>calves</b>',
            '🌿 Elephants eat plants, fruits, and tree bark',
        ]
    },
    dolphin: {
        name: 'Dolphin', emoji: '🐬',
        facts: [
            '🎵 Dolphins communicate using clicks and whistles',
            '🧠 Dolphins are extremely intelligent animals',
            '🌊 Dolphins are mammals — they breathe air!',
            '👨‍👩‍👧 Dolphins live in groups called <b>pods</b>',
            '🐟 Dolphins eat fish, squid, and octopus',
            '😊 Dolphins are known for being playful and friendly',
        ]
    },
    eagle: {
        name: 'Eagle', emoji: '🦅',
        facts: [
            '👁️ Eagles have incredibly sharp eyesight',
            '🌎 Eagles are found on every continent except Antarctica',
            '🐟 Eagles hunt fish, rabbits, and small animals',
            '🏗️ Eagles build huge nests called <b>eyries</b>',
            '💨 Eagles can fly at speeds up to 100 mph!',
            '🇺🇸 The bald eagle is the national bird of the USA',
        ]
    },
    butterfly: {
        name: 'Butterfly', emoji: '🦋',
        facts: [
            '🌟 Butterflies go through 4 life stages: egg → caterpillar → chrysalis → butterfly',
            '🌺 Butterflies drink nectar from flowers',
            '🌈 Butterflies can see colors humans cannot',
            '🦶 Butterflies taste with their <b>feet</b>!',
            '🌍 There are about 20,000 species of butterflies',
            '❄️ Many butterflies migrate to warm places in winter',
        ]
    },
    shark: {
        name: 'Shark', emoji: '🦈',
        facts: [
            '🦷 Sharks can grow up to 50,000 teeth in their lifetime!',
            '🌊 Sharks have been around for 450 million years',
            '👃 Sharks have an amazing sense of smell',
            '🏊 Most sharks must keep moving to breathe',
            '🐠 Most sharks eat fish and other sea creatures',
            '🦴 Sharks have no bones — their skeleton is made of <b>cartilage</b>',
        ]
    },
};

// ─── Planet Data ──────────────────────────────────────────
const planetData = {
    Mercury: { emoji: '⚫', facts: [
        '☀️ Mercury is the closest planet to the Sun',
        '🌡️ Temperatures swing from −180°C to 430°C',
        '📏 Mercury is the smallest planet in our solar system',
        '⏰ A day on Mercury is longer than its year!',
        '🌑 Mercury has no atmosphere and no moons',
    ]},
    Venus: { emoji: '🟡', facts: [
        '🌡️ Venus is the hottest planet (465°C average)',
        '🔄 Venus rotates backwards compared to most planets',
        '💨 Venus has thick clouds of sulfuric acid',
        '⏰ A day on Venus is longer than its year',
        '🌟 Venus is the brightest object in the night sky after the Moon',
    ]},
    Earth: { emoji: '🌍', facts: [
        '💧 Earth is the only planet known to have life',
        '🌊 71% of Earth\'s surface is covered in water',
        '🌙 Earth has one moon that controls the tides',
        '🧲 Earth has a powerful magnetic field that protects us',
        '🌡️ Earth\'s average temperature is 15°C (59°F)',
    ]},
    Mars: { emoji: '🔴', facts: [
        '🔴 Mars is called the "Red Planet" because of iron oxide in its soil',
        '🏔️ Mars has the tallest volcano in the solar system: Olympus Mons',
        '🌡️ Mars averages −60°C — very cold!',
        '👾 Many spacecraft have explored Mars',
        '🌙 Mars has two small moons: Phobos and Deimos',
    ]},
    Jupiter: { emoji: '🟠', facts: [
        '📏 Jupiter is the largest planet — 1,300 Earths could fit inside!',
        '🌪️ Jupiter has a giant storm called the Great Red Spot',
        '🌙 Jupiter has 95 known moons!',
        '💨 Jupiter is made mostly of hydrogen and helium gas',
        '⚡ Jupiter has lightning 1,000 times stronger than Earth\'s',
    ]},
    Saturn: { emoji: '🪐', facts: [
        '💍 Saturn has beautiful rings made of ice and rock',
        '🎈 Saturn is so light it would float in water!',
        '🌙 Saturn has 146 moons — including Titan, which has an atmosphere',
        '📏 Saturn is the second largest planet',
        '💨 Winds on Saturn can reach 1,800 km/h!',
    ]},
    Uranus: { emoji: '🔵', facts: [
        '❄️ Uranus is the coldest planet at −224°C',
        '🔄 Uranus rotates on its side like a rolling ball',
        '💍 Uranus has 13 faint rings',
        '🌙 Uranus has 27 known moons',
        '🔭 Uranus was the first planet discovered with a telescope (1781)',
    ]},
    Neptune: { emoji: '🔵', facts: [
        '💨 Neptune has the strongest winds in the solar system (2,100 km/h)',
        '🌊 Neptune is named after the Roman god of the sea',
        '❄️ Neptune is very cold at −200°C',
        '🌙 Neptune has 14 known moons; the largest is Triton',
        '📏 It takes 165 Earth years for Neptune to orbit the Sun!',
    ]},
};

// ─── Math ────────────────────────────────────────────────
let currentProblem = { num1: 7, num2: 8, operator: '×', answer: 56 };

function generateProblem() {
    const ops = ['+', '-', '×'];
    const op  = ops[Math.floor(Math.random() * ops.length)];
    let n1, n2, ans;
    if (op === '+') { n1 = rand(1, 50);  n2 = rand(1, 50);  ans = n1 + n2; }
    if (op === '-') { n1 = rand(10, 60); n2 = rand(1, n1);  ans = n1 - n2; }
    if (op === '×') { n1 = rand(1, 12);  n2 = rand(1, 12);  ans = n1 * n2; }
    return { num1: n1, num2: n2, operator: op, answer: ans };
}

function rand(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

// ─── Navigation ───────────────────────────────────────────
function switchSubject(subject) {
    currentSubject = subject;

    document.querySelectorAll('.nav-btn').forEach(btn =>
        btn.classList.toggle('active', btn.dataset.subject === subject));

    document.querySelectorAll('.subject-section').forEach(s => s.classList.remove('active'));
    document.getElementById(subject + '-section').classList.add('active');

    const labels = { home: 'Home', english: '📚 English', math: '🔢 Math', science: '🔬 Science', tutors: '👩‍🏫 Tutors' };
    document.getElementById('chat-subject-label').textContent = labels[subject] || subject;

    if (subject === 'math')    showTimesTable();
    if (subject === 'science') setTimeout(updateFraction, 100);
    if (subject === 'tutors')  renderTutorCards();
}

// Topic tabs (delegated)
document.addEventListener('click', function (e) {
    if (!e.target.classList.contains('topic-tab')) return;
    const section = e.target.closest('.subject-section');
    section.querySelectorAll('.topic-tab').forEach(t => t.classList.remove('active'));
    e.target.classList.add('active');
    const topic = e.target.dataset.topic;
    section.querySelectorAll('.topic-content').forEach(c => c.classList.add('hidden'));
    document.getElementById(topic + '-content').classList.remove('hidden');
    if (topic === 'fractions')  updateFraction();
    if (topic === 'arithmetic') showTimesTable();
});

// Nav buttons
document.querySelectorAll('.nav-btn').forEach(btn =>
    btn.addEventListener('click', () => switchSubject(btn.dataset.subject)));

// ─── Flashcards ───────────────────────────────────────────
function updateFlashcard() {
    const w    = vocabWords[currentWordIndex];
    const card = document.getElementById('vocab-flashcard');
    card.querySelector('.word').textContent       = w.word;
    card.querySelector('.definition').textContent = w.definition;
    card.querySelector('.example').innerHTML      = `"${w.example.replace(w.word, `<b>${w.word}</b>`)}"`;
    card.classList.remove('flipped');
}

function flipCard() {
    document.getElementById('vocab-flashcard').classList.toggle('flipped');
}

function nextWord() {
    currentWordIndex = (currentWordIndex + 1) % vocabWords.length;
    updateFlashcard();
}

// ─── Math ────────────────────────────────────────────────
function newMathProblem() {
    currentProblem = generateProblem();
    document.querySelector('.num1').textContent    = currentProblem.num1;
    document.querySelector('.operator').textContent = currentProblem.operator;
    document.querySelector('.num2').textContent    = currentProblem.num2;
    document.getElementById('math-answer-input').value = '';
    setFeedback('math-feedback', '', '');
}

function checkMathAnswer() {
    const val = parseInt(document.getElementById('math-answer-input').value);
    if (isNaN(val)) { setFeedback('math-feedback', 'Please enter a number! 😊', '#FF6B6B'); return; }
    if (val === currentProblem.answer) {
        setFeedback('math-feedback', '🎉 Correct! Amazing job! You\'re a math star! ⭐', '#4ECDC4');
    } else {
        setFeedback('math-feedback', `Not quite! 💪 The answer is ${currentProblem.answer}. Keep trying — you've got this!`, '#FF6B6B');
    }
}

function getMathHint() {
    const { num1, num2, operator } = currentProblem;
    let hint = '';
    if (operator === '+') hint = `💡 Count up from ${num1} by adding ${num2} more!`;
    if (operator === '-') hint = `💡 Start at ${num1} and count down ${num2} steps!`;
    if (operator === '×') hint = `💡 ${num1} × ${num2} means adding ${num1} together ${num2} times! Check the times table below!`;
    setFeedback('math-feedback', hint, '#FFD93D');
    openChatbotWithMessage(`Can you help me solve ${num1} ${operator} ${num2}? Please walk me through it step by step!`);
}

function showTimesTable() {
    const num     = parseInt(document.getElementById('table-num')?.value) || 2;
    const display = document.getElementById('times-table-display');
    if (!display) return;
    display.innerHTML = '';
    for (let i = 1; i <= 12; i++) {
        const el = document.createElement('div');
        el.className   = 'table-item';
        el.textContent = `${num} × ${i} = ${num * i}`;
        display.appendChild(el);
    }
}

// ─── Fractions ────────────────────────────────────────────
function updateFraction() {
    const denomEl  = document.getElementById('denominator');
    const numerEl  = document.getElementById('numerator');
    if (!denomEl || !numerEl) return;

    const denom = parseInt(denomEl.value) || 4;
    numerEl.max  = denom;
    if (parseInt(numerEl.value) > denom) numerEl.value = denom;
    const numer = parseInt(numerEl.value) || 1;

    const deg   = (numer / denom) * 360;
    const pizza = document.getElementById('fraction-pizza');
    if (pizza) pizza.style.setProperty('--filled', deg + 'deg');

    const display = document.getElementById('fraction-display');
    const words   = document.getElementById('fraction-words');
    if (display) display.textContent = `${numer}/${denom}`;
    if (words)   words.textContent   = `You have ${numer} out of ${denom} slices! 🍕`;
}

function checkFraction() {
    const answer = document.getElementById('fraction-answer').value.trim().replace(/\s/g, '');
    if (answer === '3/8') {
        setFeedback('fraction-feedback', '🎉 Correct! 3/8 means 3 out of 8 slices — great job!', '#4ECDC4');
    } else if (answer) {
        setFeedback('fraction-feedback', '💪 Not quite! Think: 8 total slices, you ate 3. So the fraction is 3 out of 8!', '#FF6B6B');
    }
}

function getFractionHint() {
    openChatbotWithMessage('Can you help me understand fractions? If a pizza has 8 slices and I eat 3, what fraction is that? Walk me through it step by step!');
}

// ─── Geometry ────────────────────────────────────────────
function checkGeometry() {
    const answer = parseInt(document.getElementById('geo-answer').value);
    if (answer === 15) {
        setFeedback('geo-feedback', '🎉 Correct! 5 × 3 = 15 square units! You\'re a geometry genius!', '#4ECDC4');
    } else if (!isNaN(answer)) {
        setFeedback('geo-feedback', '💪 Not quite! Hint: Area = length × width. So it\'s 5 × 3 = ?', '#FF6B6B');
    }
}

function getGeometryHint() {
    openChatbotWithMessage('Can you help me find the area of a rectangle that is 5 units long and 3 units wide? Explain it step by step please!');
}

// ─── Animals ─────────────────────────────────────────────
function learnAboutAnimal(key) {
    const a       = animalData[key];
    const infoDiv = document.getElementById('animal-info');
    const detail  = document.getElementById('animal-detail');
    detail.innerHTML = `
        <h3>${a.emoji} Amazing ${a.name} Facts!</h3>
        <ul style="list-style:none;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:0.8rem;margin-top:1rem;">
            ${a.facts.map(f => `<li style="background:white;padding:0.8rem 1rem;border-radius:12px;border-left:4px solid #45B7D1;font-size:0.93rem;color:#555;">${f}</li>`).join('')}
        </ul>
        <button class="check-btn" style="margin-top:1.5rem;" onclick="openChatbotWithMessage('Tell me more fun facts about ${a.name}s! Make it exciting for kids!')">Ask TutorBuddy for more! 🦉</button>
    `;
    infoDiv.style.display = 'block';
    infoDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ─── Planets ─────────────────────────────────────────────
function learnAboutPlanet(name) {
    const p       = planetData[name];
    const infoDiv = document.getElementById('planet-info');
    infoDiv.innerHTML = `
        <h3 style="margin-bottom:1rem;color:#333;">${p.emoji} ${name}</h3>
        <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:0.7rem;">
            ${p.facts.map(f => `<li style="padding:0.7rem 1rem;background:white;border-radius:12px;border-left:4px solid #667eea;font-size:0.93rem;color:#555;">${f}</li>`).join('')}
        </ul>
        <button class="check-btn" style="margin-top:1.5rem;" onclick="openChatbotWithMessage('Tell me more amazing facts about ${name}! Make it exciting for kids!')">Ask TutorBuddy for more! 🦉</button>
    `;
}

// ─── Check with AI (practice answers) ────────────────────
function checkWithAI(topic) {
    let message = '';
    if (topic === 'vocabulary') {
        const ta   = document.querySelector('#vocabulary-content .practice-input');
        const word = vocabWords[currentWordIndex].word;
        if (!ta.value.trim()) { alert('Please write a sentence first! 😊'); return; }
        message = `I wrote this sentence using the word "${word}": "${ta.value}". Did I use it correctly? Please be encouraging and helpful!`;
    } else if (topic === 'reading') {
        const answers = Array.from(document.querySelectorAll('#reading-content .answer-input'))
            .map((a, i) => `Question ${i+1}: ${a.value || '(blank)'}`).join('\n');
        message = `I answered these reading comprehension questions about "The Little Star":\n${answers}\n\nCan you give me kind feedback on my answers?`;
    } else if (topic === 'grammar') {
        const ta = document.querySelector('#grammar-content .practice-input');
        if (!ta.value.trim()) { alert('Please write your answer first! 😊'); return; }
        message = `For the sentence "The happy dog ran quickly through the big park", I found: "${ta.value}". Am I right? Please explain kindly!`;
    } else if (topic === 'nature') {
        const ta = document.querySelector('#nature-content .practice-input');
        if (!ta.value.trim()) { alert('Please write your answer first! 😊'); return; }
        message = `I answered "Why do plants need sunlight?" with: "${ta.value}". Can you check my answer and explain more in a fun way?`;
    }
    if (message) openChatbotWithMessage(message);
}

// ─── Chatbot ─────────────────────────────────────────────
function toggleChatbot() {
    document.getElementById('chatbot-panel').classList.toggle('open');
}

function openChatbotWithMessage(message) {
    document.getElementById('chatbot-panel').classList.add('open');
    document.getElementById('chat-input').value = message;
    sendMessage();
}

function handleChatKeypress(e) {
    if (e.key === 'Enter') sendMessage();
}

async function sendMessage() {
    const input   = document.getElementById('chat-input');
    const message = input.value.trim();
    if (!message) return;
    input.value = '';

    addMessage(message, 'user');
    const typingId = showTyping();

    try {
        const reply = await callClaudeAPI(message);
        removeTyping(typingId);
        addMessage(reply, 'bot');
    } catch (err) {
        removeTyping(typingId);
        if (err.message === 'NO_API_KEY') {
            addMessage('I need my brain to work! 🧠 Please click ⚙️ Settings at the top right and enter your Anthropic API key. You can get one free at console.anthropic.com! 🌟', 'bot');
        } else {
            addMessage('Oops! Something went wrong. 😅 Please check that your API key is correct in Settings, then try again!', 'bot');
            console.error(err);
        }
    }
}

async function callClaudeAPI(userMessage) {
    if (!apiKey) throw new Error('NO_API_KEY');

    const subjectContext = {
        home:    'general learning (all subjects)',
        english: 'English (reading, writing, vocabulary, and grammar)',
        math:    'Mathematics (arithmetic, fractions, and geometry)',
        science: 'Science (animals, space, and nature)',
    };

    const systemPrompt = `You are TutorBuddy, a friendly and enthusiastic AI tutor for kids aged 6–14. You are currently helping with ${subjectContext[currentSubject] || 'learning'}.

Your personality:
- Super warm, encouraging, and patient
- Use simple, clear language kids can understand
- Add relevant emojis to make responses fun 🎉
- NEVER make a child feel bad for not knowing something
- Always celebrate effort, not just correct answers
- Break complex things into small numbered steps
- Keep responses concise — aim for 3–6 sentences max
- Use real-life examples kids can relate to
- End with an encouraging note or a friendly follow-up question

You are talking to a child. Be their cheerful learning companion! 🚀`;

    chatHistory.push({ role: 'user', content: userMessage });
    const recent = chatHistory.slice(-10);

    const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': apiKey,
            'anthropic-version': '2023-06-01',
            'anthropic-dangerous-direct-browser-access': 'true',
        },
        body: JSON.stringify({
            model: 'claude-haiku-4-5-20251001',
            max_tokens: 512,
            system: systemPrompt,
            messages: recent,
        }),
    });

    if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err.error?.message || `HTTP ${response.status}`);
    }

    const data    = await response.json();
    const botText = data.content[0].text;
    chatHistory.push({ role: 'assistant', content: botText });
    return botText;
}

function addMessage(text, type) {
    const container = document.getElementById('chat-messages');
    const div       = document.createElement('div');
    div.className   = `message ${type}-message`;
    div.innerHTML   = type === 'bot'
        ? `<span class="message-icon">🦉</span><div class="message-bubble">${text}</div>`
        : `<span class="message-icon">😊</span><div class="message-bubble">${text}</div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
}

function showTyping() {
    const id        = 'typing-' + Date.now();
    const container = document.getElementById('chat-messages');
    const div       = document.createElement('div');
    div.id          = id;
    div.className   = 'message bot-message';
    div.innerHTML   = `<span class="message-icon">🦉</span>
        <div class="message-bubble">
            <div class="typing-indicator">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>`;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    return id;
}

function removeTyping(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ─── Settings ─────────────────────────────────────────────
document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('api-key-input').value = apiKey;
    document.getElementById('settings-modal').style.display = 'flex';
});

function saveApiKey() {
    const key = document.getElementById('api-key-input').value.trim();
    if (!key) { alert('Please enter an API key! 😊'); return; }
    apiKey = key;
    localStorage.setItem('tutorbuddy_api_key', key);
    closeSettings();
    document.getElementById('chatbot-panel').classList.add('open');
    addMessage('My brain is powered up! 🧠⚡ I\'m ready to help you learn anything! What would you like to explore today? 🌟', 'bot');
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

document.getElementById('settings-modal').addEventListener('click', function (e) {
    if (e.target === this) closeSettings();
});

// ─── Helpers ──────────────────────────────────────────────
function setFeedback(id, text, color) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent  = text;
    el.style.color  = color;
}

// ─── Tutor Data ───────────────────────────────────────────
const tutors = [
    {
        id: 1,
        name: 'Miss Sarah Chen',
        avatar: '👩‍🏫',
        subjects: ['English', 'Reading', 'Writing'],
        bio: 'Patient and creative English specialist. I love turning reading into an adventure for every student!',
        rating: '⭐ 4.9',
        reviews: 142,
        price: '£25 / session',
        slots: [
            { label: 'Mon 3:00 pm', available: true },
            { label: 'Mon 4:30 pm', available: false },
            { label: 'Tue 3:30 pm', available: true },
            { label: 'Wed 4:00 pm', available: true },
            { label: 'Thu 3:00 pm', available: false },
            { label: 'Fri 2:30 pm', available: true },
        ],
    },
    {
        id: 2,
        name: 'Mr James Okafor',
        avatar: '👨‍🏫',
        subjects: ['Maths', 'Problem Solving'],
        bio: 'Former engineer turned maths tutor. I make numbers make sense through real-world examples and games!',
        rating: '⭐ 4.8',
        reviews: 98,
        price: '£28 / session',
        slots: [
            { label: 'Mon 4:00 pm', available: true },
            { label: 'Tue 5:00 pm', available: true },
            { label: 'Wed 3:30 pm', available: false },
            { label: 'Thu 4:30 pm', available: true },
            { label: 'Fri 3:00 pm', available: true },
            { label: 'Sat 10:00 am', available: true },
        ],
    },
    {
        id: 3,
        name: 'Dr Priya Sharma',
        avatar: '👩‍🔬',
        subjects: ['Science', 'Biology', 'Physics'],
        bio: 'Science is everywhere! I bring experiments and curiosity to every session. KS2 & KS3 specialist.',
        rating: '⭐ 5.0',
        reviews: 61,
        price: '£30 / session',
        slots: [
            { label: 'Tue 4:00 pm', available: true },
            { label: 'Wed 5:00 pm', available: true },
            { label: 'Thu 3:30 pm', available: true },
            { label: 'Fri 4:00 pm', available: false },
            { label: 'Sat 11:00 am', available: true },
            { label: 'Sun 2:00 pm', available: true },
        ],
    },
    {
        id: 4,
        name: 'Mr Tom Whitfield',
        avatar: '🧑‍💻',
        subjects: ['Maths', 'English', 'All Subjects'],
        bio: 'Enthusiastic all-rounder who specialises in building confidence. Great with kids who find school tricky!',
        rating: '⭐ 4.7',
        reviews: 207,
        price: '£22 / session',
        slots: [
            { label: 'Mon 5:00 pm', available: true },
            { label: 'Tue 3:00 pm', available: true },
            { label: 'Wed 4:00 pm', available: true },
            { label: 'Thu 5:00 pm', available: false },
            { label: 'Fri 4:30 pm', available: true },
            { label: 'Sat 9:00 am', available: false },
        ],
    },
    {
        id: 5,
        name: 'Miss Amara Diallo',
        avatar: '👩‍🎨',
        subjects: ['English', 'Creative Writing'],
        bio: 'Published children\'s author and tutor! I spark a love of storytelling and help kids find their unique voice.',
        rating: '⭐ 4.9',
        reviews: 83,
        price: '£26 / session',
        slots: [
            { label: 'Mon 3:30 pm', available: true },
            { label: 'Wed 3:00 pm', available: true },
            { label: 'Thu 4:00 pm', available: true },
            { label: 'Fri 3:30 pm', available: false },
            { label: 'Sat 10:30 am', available: true },
            { label: 'Sun 3:00 pm', available: true },
        ],
    },
    {
        id: 6,
        name: 'Mr Liam Byrne',
        avatar: '🧑‍🏫',
        subjects: ['Maths', 'Science', 'Reasoning'],
        bio: 'Ex-primary school teacher with 10 years\' experience. Brilliant at 11+ prep and building maths fluency.',
        rating: '⭐ 4.8',
        reviews: 175,
        price: '£27 / session',
        slots: [
            { label: 'Tue 4:30 pm', available: true },
            { label: 'Wed 5:30 pm', available: false },
            { label: 'Thu 3:00 pm', available: true },
            { label: 'Fri 5:00 pm', available: true },
            { label: 'Sat 11:30 am', available: true },
            { label: 'Sun 10:00 am', available: true },
        ],
    },
];

let selectedTutor = null;
let selectedSlot  = null;

function renderTutorCards() {
    const grid = document.getElementById('tutors-grid');
    if (!grid) return;
    grid.innerHTML = tutors.map(t => `
        <div class="tutor-card" onclick="openTutorBooking(${t.id})">
            <div class="tutor-avatar">${t.avatar}</div>
            <div class="tutor-name">${t.name}</div>
            <div class="tutor-subjects">
                ${t.subjects.map(s => `<span class="tutor-subject-tag">${s}</span>`).join('')}
            </div>
            <p class="tutor-bio">${t.bio}</p>
            <div class="tutor-meta">
                <span class="tutor-rating">${t.rating} (${t.reviews})</span>
                <span class="tutor-price">${t.price}</span>
            </div>
            <button class="book-btn">Book a Session 📅</button>
        </div>
    `).join('');
}

function openTutorBooking(id) {
    selectedTutor = tutors.find(t => t.id === id);
    selectedSlot  = null;

    document.getElementById('tutors-grid').style.display         = 'none';
    document.getElementById('booking-panel').style.display       = 'block';
    document.getElementById('booking-confirmation').style.display = 'none';

    document.getElementById('selected-tutor-info').innerHTML = `
        <span class="info-avatar">${selectedTutor.avatar}</span>
        <div>
            <div class="info-name">${selectedTutor.name}</div>
            <div class="info-price">${selectedTutor.price} &nbsp;·&nbsp; ${selectedTutor.rating}</div>
        </div>
    `;

    const slotsGrid = document.getElementById('slots-grid');
    slotsGrid.innerHTML = selectedTutor.slots.map((s, i) => `
        <button class="slot-btn ${s.available ? '' : 'unavailable'}"
            onclick="${s.available ? `selectSlot(${i}, this)` : ''}"
            ${s.available ? '' : 'disabled'}>
            ${s.label}${s.available ? '' : ' (taken)'}
        </button>
    `).join('');

    document.getElementById('booking-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function selectSlot(index, btn) {
    selectedSlot = selectedTutor.slots[index];
    document.querySelectorAll('.slot-btn').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
}

function closeTutorBooking() {
    document.getElementById('tutors-grid').style.display         = 'grid';
    document.getElementById('booking-panel').style.display       = 'none';
    document.getElementById('booking-confirmation').style.display = 'none';
    selectedTutor = null;
    selectedSlot  = null;
}

function submitBooking() {
    const name    = document.getElementById('book-name').value.trim();
    const email   = document.getElementById('book-email').value.trim();
    const grade   = document.getElementById('book-grade').value;
    const subject = document.getElementById('book-subject').value;

    if (!name)    { alert('Please enter your name! 😊'); return; }
    if (!email || !email.includes('@')) { alert('Please enter a valid email address! 📧'); return; }
    if (!grade)   { alert('Please select your year / grade! 📚'); return; }
    if (!subject) { alert('Please select a subject! 🔬'); return; }
    if (!selectedSlot) { alert('Please choose a time slot! 📅'); return; }

    document.getElementById('booking-panel').style.display        = 'none';
    document.getElementById('booking-confirmation').style.display = 'block';

    document.getElementById('confirmation-details').innerHTML = `
        <strong>Tutor:</strong> ${selectedTutor.avatar} ${selectedTutor.name}<br>
        <strong>Time:</strong> ${selectedSlot.label}<br>
        <strong>Subject:</strong> ${subject}<br>
        <strong>Name:</strong> ${name}<br>
        <strong>Email:</strong> ${email}<br>
        <strong>Year:</strong> ${grade}
    `;

    document.getElementById('booking-confirmation').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function resetBooking() {
    ['book-name', 'book-email', 'book-notes'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });
    ['book-grade', 'book-subject'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.selectedIndex = 0;
    });
    closeTutorBooking();
}

// ─── Init ─────────────────────────────────────────────────
showTimesTable();
updateFlashcard();
updateFraction();

window.addEventListener('load', () => {
    if (!apiKey) {
        setTimeout(() => {
            document.getElementById('chatbot-panel').classList.add('open');
            setTimeout(() => {
                addMessage('👋 Welcome to TutorBuddy! To unlock my full AI powers, click the ⚙️ Settings button and add your free Anthropic API key. Get one at console.anthropic.com 🔑\n\nDon\'t have one yet? You can still explore all the lessons — just click a subject above! 🌟', 'bot');
            }, 400);
        }, 1200);
    }
});
