import sentence from './data/sentences.js';

const submitButton=document.getElementById("submitClick");

const arrList=['first_text','second_text','third_text'];
const resultList=['first_result_text','second_result_text','third_result_text'];
const scoreList=['first_result_score','second_result_score','third_result_score'];
const positiveList=['first_positive_hr','second_positive_hr','third_positive_hr'];
const negativeList=['first_negative_hr','second_negative_hr','third_negative_hr'];
const positiveSeeList=['first_positive_see','second_positive_see','third_positive_see'];
const negativeSeeList=['first_negative_see','second_negative_see','third_negative_see'];
const url='https://5ff1-59-27-137-107.jp.ngrok.io/test/';

window.onload = function(e){
    e.preventDefault();
    let arrKey=[];
    //alert("하이");
    for (let i=0; i<3; i++){
        let key=Math.floor(Math.random()*sentence.length);
        if (arrKey.indexOf(key)===-1){
            arrKey.push(key);
            let nowText=document.querySelector(`.${arrList[i]}`);
            nowText.textContent=sentence[key];
        }
        
    }
}

const headers = new Headers({
    "Access-Control-Allow-Origin": "*",
    "xhrFields": {
        withCredentials: true
      }
  });

submitButton.addEventListener("click",function(e){
    e.preventDefault();
    for(let i=0; i<3; i++){
        setTimeout(()=>{
        },1500);
        const inputText=document.querySelector(`.${arrList[i]}`).textContent;
        const resultArea=document.querySelector(`.${resultList[i]}`);
        const resultScore=document.querySelector(`${scoreList[i]}`);
        //console.log(typeof inputText);
        const realurl=`${url}${inputText}`;
        const result=fetch(realurl,{ headers })
            .then(res=>{return res.json()})
            .then(data=>{
                //resultArea.innerHTML=data;
                if(data === null){
                    
                }
                if(data !== null){
                    console.log(inputText);
                    document.querySelector(`.${positiveList[i]}`).style.width=`${data["score"]*1.3}px`;
                    document.querySelector(`.${negativeList[i]}`).style.width=`${(100-data["score"])*1.3}px`;
                    if(data['banned_word'].length === 1){
                        console.log(data['banned_word'].join(""));
                        const outputText=data['banned_word'].join("");
                        console.log(`${data["score"]*5}px`);
                        console.log(`${(100-data["score"])*5}px`);
                        resultArea.innerText=outputText;
                        document.querySelector(`.${positiveSeeList[i]}`).innerText=`${Math.round(data["score"],2)}%`;
                        document.querySelector(`.${negativeSeeList[i]}`).innerText=`${Math.round(100-data["score"],2)}%`;
                                                
                    }else{
                        console.log(data['banned_word'].join(","));
                        const outputText=data['banned_word'].join(",");
                        //const outScore=data['score'];
                        console.log(`${data["score"]*5}px`);
                        console.log(`${(100-data["score"])*5}px`);
                        document.querySelector(`.${positiveSeeList[i]}`).innerText=`${Math.round(data["score"],2)}%`;
                        document.querySelector(`.${negativeSeeList[i]}`).innerText=`${Math.round(100-data["score"],2)}%`;
                        resultArea.innerText=outputText;
                        // document.querySelector(`.${positiveList[i]}`).style.width=`${data["score"]*1.3}px`;
                        // document.querySelector(`.${negativeList[i]}`).style.width=`${(100-data["score"])*1.3}px`;

                        //resultScore.innerText=String(outScore);
                    }
                }
               

            })
    }
});

const resetButton=document.getElementById("resetClick");
resetButton.addEventListener('click',function(e){
    e.preventDefault();
    window.location.reload();
});
