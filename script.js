document.querySelector('#row2').style.display = 'none';
let input = document.querySelector('#word');
let output = document.querySelector('#output');
let def_head = document.querySelector('#def_head');
let partOfSpeech = document.querySelector('#partOfSpeech');
let definitions = document.querySelector('#definitions');
let def_wrap = document.querySelector('.def-wrap');
let exp_head = document.querySelector('#exp_head');
let exp = document.querySelector('#examples');
let word = '';
input.addEventListener('input', () => {
    word = input.value;


    console.log((word));
    let apiURL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    // console.log(apiURL);
    fetch(apiURL)
        .then((reponse) => {
            if (reponse.status == 404) {
                output.innerText = word;
                document.querySelector('#row2').style.display = 'none';
            }
            else {
                document.querySelector('#row2').style.display = 'flex';
                return reponse.json();
            }
        })
        .then((data) => {
            output.innerText = data[0].meanings[0].definitions[0].definition;
            def_head.innerText = `Definitions of ${word}`;
            exp_head.innerText = `Examples of ${word}`;
            let exp_data = data[0].meanings[0].definitions;
            let def_data = data[0].meanings;

            let i = 1;
            exp_data.forEach(element => {
                if (element.example != undefined) {
                    exp.innerHTML += ("<br />" + i + ". " + element.example);
                    i += 1;
                }
            });

            // for showing the definitions 
            def_data.forEach(element => {
                if (element.partOfSpeech != undefined) {
                    def_wrap.innerHTML += ("<br />" + element.partOfSpeech + "<br />" + element.definitions[0].definition + "<br />")
                }
                // console.log(element);
                // console.log(element.definitions[0]);


            });
        })
        .catch((error) => { console.log(error) });
    // console.log(word.length);

    output.innerHTML = '';
    def_head.inne = '';
    def_wrap.innerHTML = '';
    exp.innerHTML = '';
    exp_head.innerHTML = '';
});
