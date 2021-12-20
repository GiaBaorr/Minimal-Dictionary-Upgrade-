const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/'

const mainSection = document.querySelector('.main-section');
const input = document.querySelector('input')
const audio = document.querySelector('.container audio')


input.addEventListener('keydown', (e)=>{
    if(e.keyCode === 13){
        render(input.value.toLowerCase())
    }
})


function render(value){
    fetch(`${url}${value}`)
    .then((response) => response.json())
    .then(data => {
        console.log(data)
        mainSection.innerHTML = `
            <div class="heading">
                <h3>${value}</h3>
                <p>${data[0].phonetic} <i id='audio-button'class="fas fa-volume-up"></i></p>
                <button>${data[0].meanings[0].partOfSpeech}</button>
            </div>
            <div class="main">
                <div class="definitions">
                    <h2>DEFINITIONS</h2>
                    <p>${data[0].meanings[0].definitions[0].definition}</p> </br>
                    </p>Example:${data[0].meanings[0].definitions[0].example}</p>
                </div>
                <div class="sub-main">
                    <h2>SYNONYMS</h2>
                    <a href=''>${data[0].meanings[0].definitions[0].synonyms[0] || '' }</a>
                    <a href=''>${data[0].meanings[0].definitions[0].synonyms[1] || '' }</a>
                    <a href=''>${data[0].meanings[0].definitions[0].synonyms[2] || '' }</a>
                    <a href=''>${data[0].meanings[0].definitions[0].synonyms[3] || '' }</a>
                    <h2>Antonyms</h2>
                    <a href=''>${data[0].meanings[0].definitions[0].antonyms[0] || '' }</a>
                    <a href=''>${data[0].meanings[0].definitions[0].antonyms[1] || '' }</a>
                </div>
            </div>
        `
        let audioButton = document.querySelector("#audio-button")
        audioButton.onclick = function(){
            audio.play()
        }
        audio.setAttribute('src',`https:${data[0].phonetics[0].audio}`)
        audio.play()
        input.value = ''
        let arrayOfaTags = document.querySelectorAll('.sub-main a')
        arrayOfaTags.forEach((aTag)=>{
            aTag.onclick = function(event){
                event.preventDefault()
                render(aTag.textContent)
            }
        })
    })
    .catch(()=>{
        alert("Sorry pal, we couldn't find definitions for the word you were looking for")
    })
}