window.addEventListener('keydown', function(e) {
    let audio = document.querySelector(`audio[data-key="${e.key}"]`);
    let key = document.querySelector(`.key[data-key="${e.key}"]`);
    console.log(audio);
    if (!audio) return;
    audio.currentTime = 0;
    audio.volume = 0.3;
    audio.play();
    key.classList.add('playing');
});

let keys = document.querySelectorAll('.key');

for (let i = 0; i < keys.length; i++) {
    keys[i].addEventListener('click', function(e) {
        let audio = document.querySelector(`audio[data-key="${e.currentTarget.dataset.key}"]`);
        let key = document.querySelector(`.key[data-key="${e.currentTarget.dataset.key}"]`);
        console.log(audio);
        if (!audio) return;
        audio.currentTime = 0;
        audio.volume = 0.3;
        audio.play();
        key.classList.add('playing');
    });
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return;
    this.classList.remove('playing');
}

keys.forEach(function(key) {
    key.addEventListener('transitionend', removeTransition);
});