const arr = [4, 3, 6, 2, 1, 1]
let hash = {}

function findTwoElements(n){
for(i=0; i<n.length; i++){
	if(hash[n[i]]){
  	hash[n[i]]++;
  } 
  else {
  	hash[n[i]] = 1;
  }
}
for(let key in hash){
	if(hash[key]===2){
  	return key;
  }
}
 return -1;
}
const result = findTwoElements(arr)
console.log(result);