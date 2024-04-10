let computerNum = 0
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("userInput");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button")
let exam = document.getElementById("exam")
let ex = document.getElementById("ex");
let hint = document.getElementById("hint")
let chances = 10;
let base = 0;
let gameOver = false;
let chanceArea = document.getElementById("chance-area")
let history = []

let answer = ""
let arrAnswer= [];
let s = 0, b = 0;


playButton.addEventListener("click",play);
resetButton.addEventListener("click", reset);
ex.addEventListener("click", exa);
userInput.addEventListener("focus",function(){
    userInput.value= "";
});
function exa(){
    exam.innerHTML = `입력한 숫자와 정답 숫자가<br\> 숫자와 자리가 일치하면 스트라이크<br\> 숫자만 일치하면 볼이 나옵니다.<br\>(더블클릭 시 설명 삭제)`
}
function delete1(){
    exam.innerHTML = ` `
}
function pickRandomNum(){
    let rdN = [1,2,3,4,5,6,7,8,9]
         for(let i=0;i<3;i++){
            let rdNumber = Math.floor(Math.random() * rdN.length);  
            computerNum = rdN[rdNumber]; 
             answer += computerNum;
             arrAnswer = answer.split("");
             rdN.splice(rdNumber, 1);
         }
 
}

function play(){
    base += 1
    chanceArea.textContent = `${base}회차`
    let userValue = userInput.value;

    if(userValue.split("").includes("0")||userValue < 100 || userValue > 999){
        resultArea.textContent="0이 포함되어 있지 않은 세자리의 숫자를 입력해 주세요";
        base--;
        return; 
    }
    if(history.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다 다른 숫자를 입력해주세요";
        base--;
        return ;
    }
    chances--;

    arrAnswer.forEach((sAns, sNum) => {
        if (userValue.indexOf(sAns) === sNum) 
            s++;
        else if (userValue.split("").includes(sAns))
            b++;
    
    });
    resultArea.textContent = `${s}스트라이크! ${b}볼! `;
    
    if(s == 3){
        resultArea.textContent = "정답입니다!";
        gameOver = true;
    }
    hint.innerHTML += `[${userValue}] -- ${s} 스트라이크! ${b} 볼!<br\>`
    s = 0; b = 0;
    history.push(userValue)
    
    if(chances < 1) {
        gameOver = true;
    }
    if(gameOver == true ){
        playButton.disabled = true;
    }
}


function reset() {
    userInput.value = ""
    pickRandomNum();
    chances = 10;
    history.length = 0;
    hint.innerHTML = `<br\>`;
    base = 0;
    resultArea.textContent = "게임을 초기화합니다!"
}

pickRandomNum();
console.log(answer)