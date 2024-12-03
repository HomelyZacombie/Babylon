let xx = parseInt ("20") + 20;
document.getElementById('datatypes').innerHTML = xx;

let x = 9;
let y = 9;
let z = "5";

if (x === y){ document.getElementById('booleanx').innerHTML = "x == y"}
else {document.getElementById('booleanx').innerHTML = "x != z"}
if (x === z){ document.getElementById('booleany').innerHTML = "x == z"}
else {document.getElementById('booleany').innerHTML = "x != z"}

let myArray = ["item 1", "item 2", "item 3"];
document.getElementById('arrays').innerHTML = myArray[0];

myArray[0] = "hello "
document.getElementById('changeArray').innerHTML = myArray[0];

document.getElementById('fullArrays').innerHTML = myArray.join(" # ");

document.getElementById('arrayLength').innerHTML = myArray.length;

let i = 10;
text = "";
for(i = 0; i < 100 ; i += 5){
    text += "#" + i;
}
document.getElementById('forLoop').innerHTML = text; 