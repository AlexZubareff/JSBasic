'use strict'

function drowChess (){
  for (var i=0;i<8;i++){
		var arrText=['A','B','C','D','E','F','G','H'];
    var arrNumber=[1,2,3,4,5,6,7,8];
    document.getElementById("text").insertAdjacentElement('beforeend',document.createElement('div')).textContent=arrText[i];
    document.getElementById("number").insertAdjacentElement('beforeend',document.createElement('div')).textContent=arrNumber[i];
	}
  for (var i=0; i< 64; i++){
    document.getElementById("chessBoard").insertAdjacentElement('beforeend', document.createElement("div")).style.backgroundColor = parseInt((i / 8) + i) % 2 == 0 ? '#ababab' : 'white';    
  }
}

drowChess();