module.exports = function zeros(expression) {
  // your solution
  let arr=[], //get array with parameters
    multipliers=[], //count of 2(first) and 5(second);
    total=[0,0];
  //console.log(expression);
  arr=getArray(expression);

  for (i=0; i<arr.length; i++){
    multipliers=getMultyplier(arr[i]);
    total[0]+=multipliers[0];
    total[1]+=multipliers[1];
    //console.log(multipliers);
  }
  //console.log(total);
  return min(total[0], total[1]);
}

function getArray(expression){
  let start=0,
    finish=0,
    arr=[],
    params=[],
    expr = "";
  while ((start+finish)<expression.length){
    if (expression[start+finish] == "*"){
      expr = expression.slice(start, (start+finish));
      params=getParams(expr);
      arr.push(params);
      start = start+finish+1;
      finish = 0;
    }
    finish++;
  }
  expr = expression.slice(start, (start+finish));
  params=getParams(expr);
  arr.push(params);
  return arr;
}

function getParams(expr){
  let params=[],
    number, 
    isDouble,
    isEven;

    isDouble=isDoubleFactorial(expr);
    number=getNumber(expr, isDouble);
    isEven=checkIsEven(number);
    params.push(number);
    params.push(isDouble);
    params.push(isEven);
    return params;

}

function isDoubleFactorial(expr){
  if (expr.slice(expr.length-2, expr.length)=="!!"){
    //console.log(expr + " is doubleFactorial");
    return true;
  }else{
    //console.log(expr + " is not doubleFactorial");
    return false;
  }
}
function getNumber(expr, isDouble){
  let countOfExclamation=1;
  if (isDouble==true){
    countOfExclamation++;
  }
  return expr.slice(0, expr.length-countOfExclamation);
}
function checkIsEven(num){
  if (num%2==0){
    return true;
  }else{
    return false;
  }
}

function getMultyplier(item){
  let count2, count5, array=[];
  //console.log(item);
  count2=getCount(2, item[0], item[1], item[2]);
  count5=getCount(5, item[0], item[1], item[2]);

  array.push(count2);
  array.push(count5);
  return array;
}

function getCount(multiplier, number, isDouble, isEven){
  let count=0,
  power=1;
  
  if(isDouble==true){
    if (multiplier==5){
      let evenCounter = 0;
      count=getCount(multiplier, number, false, false);
      if (number>=multiplier){
        evenCounter=getEvenCounter(number);
        //console.log("evenCounter " + evenCounter + " of number " + number);
      if (isEven==false){
          count-=evenCounter;
        }else{
          count=evenCounter;
        }
      }
    }else if(multiplier==2){
      if(isEven==true){
        count=getCount(multiplier,number,false,false);
      }else{
        count=0;
      }
    }
  }else{
    while (Math.pow(multiplier, power )<=number){
      count+= Math.floor(number/(Math.pow(multiplier,power)));
      power++;
    }
  }
  
  
  return count;
}

function min(a, b){
  if (a>b){
    return b;
  }else{
    return a;
  }
}

function getEvenCounter(num){
  let count=0, power=1;
  while(Math.pow(5,power)*2<=num){
    count+=Math.floor(num/(Math.pow(5,power)*2));
    power++;
  }
  return count;
}