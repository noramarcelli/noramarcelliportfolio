console.log('Array Extras Map-Filter');


[5, 8, 9].forEach(function(item){
    console.log('Items is:', item);
})

// function that gets an array of nums and return a new array in which
// every item is 5 times bigger than the original

// function getTimesBigger(nums) {
//     var res = []
//     nums.forEach(function(num){
//         res.push(num*5)
//     });
//     return res;
// }
function getTimesBigger(nums) {
    var res = nums.map(function(num){
        return num*5
    });
    return res;
}

// Get an array of students, and give each of them a bonus
function giveBonus(studs) {
    var res = studs.map(function(stud){
        var newStud = {name: stud.name, grade: stud.grade+10};
        return newStud;
    });
    return res;
}

var studs = [{name: 'A', grade:20}, {name: 'B', grade:70}, {name: 'C', grade:90}]
var res = studs.filter(function(stud){
    return stud.grade >= 70;
});
console.log('res', res);


var mat = createMat();
console.table(mat)

mat.forEach(function(row){

    row.forEach(function(item){
        if (item > 10) {
            return;
        }
        console.log('Bigger than 10');
    })

})











function createMat() {
    var mat = [];
    for (var i = 0; i < 5; i++) {
        var row = []
        for (var j = 0; j < 4; j++) {
            row[j] = (i+1)*(j+1)
        }    
        mat.push(row)
    }
    return mat;
}





