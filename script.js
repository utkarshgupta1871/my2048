const randomGen=()=>{
	const blanks=emptycells()
	if(blanks.length===0){
		//console.log('Board Full')
	}else{
		i=blanks[Math.floor(Math.random()*blanks.length)]
		let cell=document.getElementById("cell"+i)
		cell.innerHTML='2'	
	}
	
}

const boardFull=()=>{
	const blanks=emptycells()
	return blanks.length===0

}

const hCheck=()=>{
	for(let num=0;num<13;num+=4){
		const cells=[num,num+1,num+2,num+3].map(i=>document.getElementById("cell"+i));
		if(cells[0].innerHTML===cells[1].innerHTML || cells[1].innerHTML===cells[2].innerHTML || cells[2].innerHTML===cells[3].innerHTML){
			return true;
		}
	}
	return false;
}
const vCheck=()=>{
	for(let num=0;num<4;num++){
		const cells=[num,num+4,num+8,num+12].map(i=>document.getElementById("cell"+i));
		if(cells[0].innerHTML===cells[1].innerHTML || cells[1].innerHTML===cells[2].innerHTML || cells[2].innerHTML===cells[3].innerHTML){
			return true;
		}
	}
	return false;
}

const emptycells=()=>{
	array=[]
	for(let i=0;i<16;i++){
		if(isEmpty(document.getElementById("cell"+i))){
			array.push(i);
		}
	}
	return array;
}

const arraypad=(array,len)=>{
	temp=len-array.length
	for(let i=0;i<temp;i++){
		array.push('')
	}
	return array;
}

const arraycompress=(array)=>{
	if(array[0]===array[1] && array[0]!==''){
		array[0]*=2;
		array.splice(1,1)
		array.push('')
	}
	if(array[1]===array[2] && array[1]!==''){
		array[1]*=2;
		array.splice(2,1)
		array.push('')
	}
	if(array[2]===array[3] && array[2]!==''){
		array[2]*=2;
		array.splice(3,1)
		array.push('')
	}
	return array;

}

const isEmpty=(cell)=>{
return cell.innerHTML===''
}

const shiftDown=(num)=>{
	const cells=[num,num+4,num+8,num+12].map(i=>document.getElementById("cell"+i));
	let strings=cells.filter(cell=>cell.innerHTML!=='').map(i=>i.innerHTML).reverse()
	strings=arraypad(strings,4);
	strings=arraycompress(strings).reverse();
	for(let i=0;i<4;i++)
	{
		cells[i].innerHTML=strings[i];

	}
}

const shiftUp=(num)=>{
	const cells=[num,num+4,num+8,num+12].map(i=>document.getElementById("cell"+i));
	let strings=cells.filter(cell=>cell.innerHTML!=='').map(i=>i.innerHTML)
	strings=arraypad(strings,4)
	strings=arraycompress(strings)
	for(let i=0;i<4;i++)
	{
		cells[i].innerHTML=strings[i];

	}
}

const shiftLeft=(num)=>{
	const cells=[num,num+1,num+2,num+3].map(i=>document.getElementById("cell"+i));
	let strings=cells.filter(cell=>cell.innerHTML!=='').map(i=>i.innerHTML)
	strings=arraypad(strings,4)
	strings=arraycompress(strings)
	for(let i=0;i<4;i++)
	{
		cells[i].innerHTML=strings[i];

	}
}

const shiftRight=(num)=>{
	const cells=[num,num+1,num+2,num+3].map(i=>document.getElementById("cell"+i));
	let strings=cells.filter(cell=>cell.innerHTML!=='').map(i=>i.innerHTML).reverse()
	strings=arraypad(strings,4)
	strings=arraycompress(strings).reverse()
	for(let i=0;i<4;i++)
	{
		cells[i].innerHTML=strings[i];

	}
}


const keypress=()=>{
	document.onkeydown=()=>{
		
		if (event.keyCode===37){
			shiftLeft(0);
			shiftLeft(4);
			shiftLeft(8);
			shiftLeft(12);
			if(boardFull() && (!hCheck()) && (!vCheck())){
				document.getElementById("Game").innerHTML='Game Over'
				newGame();
			}else {
				randomGen();
			}
		}
		if (event.keyCode===38){
			shiftUp(0);
			shiftUp(1);
			shiftUp(2);
			shiftUp(3);
			if(boardFull() && (!hCheck()) && (!vCheck())){
				document.getElementById('Game').innerHTML='Game Over'
				newGame();
			}else {
				randomGen();
			}
		}
		if (event.keyCode===39){
			shiftRight(0);
			shiftRight(4);
			shiftRight(8);
			shiftRight(12);
			if(boardFull() && (!hCheck()) && (!vCheck())){
				document.getElementById('Game').innerHTML='Game Over'
				newGame();
			}else {
				randomGen();
			}
		}
		if (event.keyCode===40){
			shiftDown(0);
			shiftDown(1);
			shiftDown(2);
			shiftDown(3);
			if(boardFull() && (!hCheck()) && (!vCheck())){
				document.getElementById('Game').innerHTML='Game Over'
				newGame();
			}else {
				randomGen();
			}
		}
	};
}

const newGame=()=>{
	let button=document.getElementById('New-Game')
	button.style.visibility='visible'
	button.innerHTML="New Game"
	button.onclick=()=>{
		button.style.visibility = 'collapse'
		document.getElementById('Game').innerHTML=''
		for(let i=0;i<16;i++){
			document.getElementById("cell"+i).innerHTML=''
		}
		keypress()
	}
}

window.addEventListener('load', newGame)