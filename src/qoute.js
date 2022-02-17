const quoteBtn = document.querySelector('.newQT'), 
quote = document.querySelector('.quoteText'),
author = document.querySelector('.author'),
twitterBtn = document.querySelector('.twitter'),
copyBtn = document.querySelector('.copy'),
speechBtn = document.querySelector('.speech'),
header = document.querySelector('.header'),
synth = speechSynthesis


function randomQuote(){
    quoteBtn.classList.add("loading");
    quoteBtn.innerText = "loading quote...";
    fetch("http://api.quotable.io/random").then(response => response.json()).then(result => {
        author.innerText = result.author;
        quote.innerText = result.content;
        quoteBtn.classList.remove("loading");
        quoteBtn.innerText = "new quote";
    }
    );
};

quoteBtn.addEventListener("click", randomQuote);

speechBtn.addEventListener("click", ()=>{
    if(!quoteBtn.classList.contains("loading")){
        let utterance = new SpeechSynthesisUtterance(`${quote.innerText} by ${author.innerText}`);
        synth.speak(utterance);
        setInterval(()=>{
            !synth.speaking ? speechBtn.classList.remove("active") : speechBtn.classList.add("active");
        }, 10);
    }
    
});

copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(quote.innerText);
})

twitterBtn.addEventListener("click", ()=>{
    let tweetUrl = `https://twitter.com/intent/tweet?url=${quote.innerText}`;
    window.open(tweetUrl, "_blank");
});

header.addEventListener("click", ()=>{
    header.innerText = "Please, don't click me";

    setTimeout(() =>{
        header.innerText = "Qoute of the day";
    }, 500);
});




