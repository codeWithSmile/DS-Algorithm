const arr = [1, 5, 8, 45, 78, 90]
arr.sort((a,b) => (b-a))

function threeLargest(n){
	if(n.length<3){
  	return -1;
  }
  return [n[0], n[1], n[2]]
}
const result = threeLargest(arr)
console.log(result);