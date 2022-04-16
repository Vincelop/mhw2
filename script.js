const buttonsList = document.querySelectorAll('.choice-grid .answer')
const resultElement = document.querySelector('#result')
let Answers = {} // dict

function selectAnswer(event){
    event.currentTarget.classList.add('selected-item')
    const img = event.currentTarget.querySelector('.checkbox')
    img.src = './images/checked.png'

    let overlay = event.currentTarget.querySelector('.overlay')
    if(!overlay.classList.contains('hidden')){
        overlay.classList.add('hidden')
    }

    Answers[event.currentTarget.dataset.questionId]=event.currentTarget.dataset.choiceId

    for(let i of buttonsList){
      if(i.dataset.questionId === event.currentTarget.dataset.questionId && i !== event.currentTarget){
           let overlay = i.querySelector('.overlay')
            overlay.classList.remove('hidden')
           if(i.classList.contains('selected-item')){
               i.classList.remove('selected-item')
               let img = i.querySelector('.checkbox')
               img.src = './images/unchecked.png'
            }
        }
    }

    if(Object.keys(Answers).length === 3) {
        for(let i of buttonsList){
            i.removeEventListener('click', selectAnswer)
        }
        getPersonality()
    }
}

function getPersonality(){
    let index
    if(Answers["one"] === Answers["two"] || Answers["one"] === Answers["three"]){
        index = Answers["one"]
        result(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
    else if(Answers["two"] === Answers["three"]) {
        index = Answers["two"]
        result(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
    else {
        index = Answers["one"]
        result(RESULTS_MAP[index].title, RESULTS_MAP[index].contents)
    }
}



function result(title, paragraph){
    let tit = resultElement.querySelector('#title')
    let parag = resultElement.querySelector('#description')
    let button = resultElement.querySelector('#button')
    tit.textContent = title
    parag.textContent = paragraph
    button.addEventListener('click', restart)
    resultElement.classList.remove('hidden')
}



if(Object.keys(Answers).length === 3) {
    for(let i of buttonsList){
        i.removeEventListener('click', selectAnswer)
    }
    getPersonality()
}


function restart(event){
    for(let i of buttonsList){
        i.addEventListener('click', selectAnswer)
        let overlay = i.querySelector('.overlay')
        if(i.classList.contains('selected-item')){
            i.classList.remove('selected-item')
            i.querySelector('.checkbox').src = './images/unchecked.png'
        }
        else if(!overlay.classList.contains('hidden')){ 
            overlay.classList.add('hidden')
        }
    }
    Answers = {}
    event.currentTarget.removeEventListener('click', restart)
    resultElement.classList.add('hidden')
}

for(let i of buttonsList){
    i.addEventListener('click', selectAnswer)
}

