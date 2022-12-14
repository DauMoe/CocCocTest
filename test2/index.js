/**
 * @WHAT_HAPPEN_BELOW
 * The complexity still O(m*n) :< I can't find out a way reduce
 * What is the idea?
 *  - Transfer ages array to age JSON object with key is age value and the value is how many times this age exist in array
 *  - Go through ranges array => calculate sum of age from range[start] -> range[end]
 *  - My result (base on my PC hardware - Chrome): 1227 - 1250
 * @JUST_AN_IDEA
 * I putted a Map() as a cache to save calculated range, if we have any range like that, just get it from cache and put into the array but I can't find out why it alaways take more time then normal way (no cache)?
 */

let total = 0;
const MaxAge = 200;
console.clear();

function rangeCount(ages, ranges) {
  const agesObject = {};
  for (const age of ages) {
    if (age in agesObject) {
      agesObject[age]++;
    } else {
      agesObject[age] = 1;
    }
  }
  const x = [];
  for (const range of ranges) {
    let a = 0;
    //O(m*n) here. In the really really bad case, m*n = 10_000_000 * 1000
    for (let i = range[0]; i <= range[1]; i++) {
      a+=(agesObject[i]>>>0);
    }
    x.push(a);
  }
  return x;
  
  //Original
  return ranges.map(range =>
    ages.reduce((people, age) =>
      people + ((age >= range[0] && age<=range[1] && 1) || 0)
    , 0)
  );
}

function generateData() {
/*
//uncomment to receive sample data
{
  const ages = [3, 5, 44, 7, 33, 33, 17, 90, 8, 12, 3, 24, 120, 7, 100]; // will be generated
  const ranges = [
    [7,15],
    [4,40],
    [11,125]
  ]; // will be generated
  return {
    ages,
    ranges,
  };
}
*/
//Max: 10_000_000
  const ages = Array(1000)
    .fill("")
    .map(() => {
      return Math.floor(Math.random() * MaxAge);
    });

  const ranges = Array(10_000_000)
    .fill("")
    .map(() => {
      return [
        Math.floor(Math.random() * MaxAge),
        Math.floor(Math.random() * MaxAge),
      ].sort((a, b) => a - b);
    });
  return { ages, ranges };
}


const runs = 10;
let range_counted;
for (let i = 0; i < runs; i++) {
  const { ages, ranges } = generateData();
  const start = performance.now();
  range_counted = rangeCount(ages, ranges);
  const end = performance.now();
  total += end - start;
}
console.log(range_counted.join(', ')); //4, 9, 9 in sample data
const taskPerformance = total / runs; // this number measure performance.
console.log(total / runs);