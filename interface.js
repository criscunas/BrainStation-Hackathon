function generateText(x) {
    let resultsContainer = document.querySelector('.result-box');
    let pTag = document.createElement('p');
    pTag.innerText = x;

    resultsContainer.appendChild(pTag)
}

function translateWord (str, lang) {

    const options = {
    method: 'POST',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
    'content-type': 'application/json',
    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
    'x-rapidapi-key': "YOUR_KEY_HERE"
    },
        data: {q: `${str}`, target: `${lang}`}
    };

    axios.request(options).then(function (response) {
    generateText(response.data.data.translations.translatedText)
    console.log(response.data.data.translations.translatedText);

    }).catch(function (error) {
        console.error(error);
    });
}

let transcript;

function runSpeechRecognition() {

	let output = document.getElementById("output");

	let action = document.getElementById("action");

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
            
    recognition.onstart = function() {
        action.innerText = "listening...";
    };
  
    recognition.onspeechend = function() {
        action.innerText = "done! generating text...";
        recognition.stop();
    }
        
    recognition.onresult = function(event) {

        transcript = event.results[0][0].transcript;       
        console.log(transcript)
        output.innerText = transcript;
    
        output.classList.remove("hide");

        let languagecontainer = document.getElementById("languages-container")
        languagecontainer.classList.remove("hide");
        
    };

    recognition.start();

};

let listItem = document.querySelectorAll('.language-item');

listItem.forEach(function(element) {
    element.addEventListener('click', function () {
        let strArr = element.innerText.split(':');
        let code = strArr[strArr.length - 1];
        code = code.trim();
        translateWord(transcript, code);
    })
})


let languageSection = document.querySelector('.display-languages');
let languageList = document.querySelector('.language');

const options = {
    method: 'GET',
    url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
    headers: {
    'x-rapidapi-host': 'deep-translate1.p.rapidapi.com',
    'x-rapidapi-key': "YOUR_KEY_HERE"
    }
};

axios.request(options).then(function (response) {
	let languageData = response.data.languages;

    for (let i = 0;  i < languageData.length; i++) {
        
        let lanCode = languageData[i].language;
        let languageName = languageData[i].name;

        let lanType = document.createElement('li');
        lanType.className = 'language-item'
        lanType.innerText = languageName + " : " + lanCode

        languageList.append(lanType)

    }

    }).catch(function (error) {
	    console.error(error);
});


// function getLanguages () {
//     const options = {
//     method: 'GET',
//     url: 'https://deep-translate1.p.rapidapi.com/language/translate/v2/languages',
//     headers: {
//     'x-rapidapi-host': 'LINK',
//     'x-rapidapi-key': 'YOUR_KEY_HERE'
//       }
//     };

//     axios.request(options).then(function (response) {
        
//     let langArr = response.data.languages;
        
//     langArr.forEach(element => {
//         console.log(element)
//     });

//     }).catch(function (error) {
//         console.error(error);
//     });
// };

// getLanguages()


