var count=600;
var counter=setInterval(timer, 1000);
function timer()
{
  count=count-1;
  if (count <= 0)
  {
    alert ('youre out of time!')
    clearInterval(counter);
    
     return;
  }
  document.getElementById("timer").innerHTML=count + " Seconds Left"; 
}
