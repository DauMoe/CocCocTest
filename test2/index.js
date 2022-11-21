let total = 0;
const MaxAge = 200;

console.clear();
function rangeCount(ages, ranges) {
  return ranges.map(range =>
    ages.reduce((people, age) =>
    people + ((age >= range[0] && age<=range[1] && 1) || 0), 0));
}

function generateData() {

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

  const ages = Array(1000)
    .fill("")
    .map(() => {
      return Math.floor(Math.random() * MaxAge);
    });

  const ranges = Array(10000000)
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