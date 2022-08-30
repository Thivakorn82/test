const request = require('request');

exports.split = async (req,res)=>{
    request('http://3.1.189.234:8091/data/ttntest', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var ansArr = [];
            var arrayBody = body.replace(/'/g, '"');
            arrayBody = JSON.parse(arrayBody);
            const length = arrayBody.length
            console.log("len",length);
            const average = findAverage(arrayBody)
            const min = findMin(arrayBody)
            const max = findMax(arrayBody)
            console.log("max",max);
            // res.json({"avg":average,"min":min,"max":max})
            let arr = []
            let start = arrayBody[0].data
            console.log(start);
            let count = 0
            console.log('this is inside');
            for(let i = 0 ; i < length; i++){
                var obj = {};
                let finish = start + 200;
                if(finish > max){
                    for(let j = i ; j < length; j++ ){
                        arr.push(arrayBody[j].data)
                        count = count + 1
                        obj.dataArr = arr;
                        obj.dataCount = count;
                        ansArr.push(obj)
                    }
                    break
                }
                count = count + 1
                arr.push(arrayBody[i].data)
                if(arrayBody[i].data >= finish){
                    obj.dataArr = arr;
                    obj.dataCount = count;
                    ansArr.push(obj)
                    start = arrayBody[i+1].data
                    count = 0
                    arr = []
                }
            }
            res.json(ansArr)
        }
    })
}

sortArray = (arr) =>{
    arr.sort((a, b) => a.data - b.data);
    return arr
}

findAverage = (arr) =>{
    const bodyLength = arr.length;
    let sum = 0
    for(let i of arr){
        sum = sum + i.data
    }
    const average = sum / bodyLength
    return average
}

findMin = (arr) =>{
    const sorted = sortArray(arr);
    return sorted[0].data
}

findMax = (arr) =>{
    const sorted = sortArray(arr);
    return sorted[sorted.length - 1].data
}