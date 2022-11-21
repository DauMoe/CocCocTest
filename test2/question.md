Optimize this naive implementation of rangeCount(ages,ranges) as much as you can
(we expect at least 50 times faster)
For each item of ranges, count number of people in the given range between start and
end (including)
Argument ages: Array[age] , the age can be any integer number between 0 and 200,
this list can contain maximum 1000 values
Argument ranges: Array[ [start, end] ]) list length really big (let's say ~ 10000000
values, ages list not so big (~ 1000 values), start always <= end.