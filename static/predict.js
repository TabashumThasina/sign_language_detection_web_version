

$("#image-selector").change(function () {
    let reader = new FileReader();
    reader.onload = function(){
        let dataURL = reader.result;
        $("#selected-image").attr("src", dataURL);
        $("#prediction-list").empty();

    }
    let file = $("#image-selector").prop('files')[0];
    reader.readAsDataURL(file);
    console.log("selector")
});

let model;
(async function(){
    
    // const handler = tfn.io.fileSystem('D:/Courses/BigData/Project/tutorial/static/tfjs-models/VGG16/model.json');
    model = await tf.loadLayersModel("http://localhost:81/tfjs-models/model/model.json",strict=false);
    console.log("Success");
    $('.progess-bar').hide();
})();

$("#predict-button").click( async function(){
    let image = $("#selected-image").get(0)
    var canvas = document.getElementById('c');
    var context = canvas.getContext('2d');
    var imgObj = new Image();
    imgObj.src = image.src;
    var x = 0;
    var y = 0;
    
    imgObj.onload = function(){
        //Draw the image onto the canvas.
        context.drawImage(imgObj, x, y, 100,100);
    }
    
    const net = await posenet.load();
    const imageScaleFactor = 0.5;
    const outputStride = 16;
    const flipHorizontal = false;
    const pose = await net.estimateSinglePose(imgObj, imageScaleFactor, flipHorizontal, outputStride);
    console.log(pose);
    // var c = document.getElementById("my-canvas");
    // var ctx = c.getContext("2d");
    // ctx.beginPath();
    let noseX =0;
    let noseY =0;
    let pNoseX =0;
    let pointSize =5;
    let pNoseY=0;
    
    for(const keypoint of pose.keypoints) {
        console.log(`${keypoint.part}: (${keypoint.position.x},${keypoint.position.y})`);

    }
    
    // var imgObj2 = new Image();
    // imgObj2.src = image.src;
    // imgObj2.onload = function(){
    //     // ctx.drawImage(imgObj2,
    //     //     833,2537,   // Start at 70/20 pixels from the left and the top of the image (crop),
    //     //     93, 430,   // "Get" a `50 * 50` (w * h) area from the source image (crop),
    //     //     0, 0,     // Place the result at 0, 0 in the canvas,
    //     //     180, 860); // With as width / height: 100 * 100 (scale)
    //     for(const keypoint of pose.keypoints){
        
    //         if (keypoint.score > 0.2) {
    //             noseX = keypoint.position.x;
    //             noseY = keypoint.position.y;
    //             drawCoordinates(noseX,noseY);              
                                
                
    //         }
    
        
        
    //     }
    //         function drawCoordinates(x,y){	
    //             var ctx = document.getElementById("my-canvas").getContext("2d");
        
        
    //             ctx.fillStyle = "#ff2626"; // Red color
    //             console.log(x)
    //             ctx.beginPath();
    //             ctx.arc(x, y, pointSize, 0, Math.PI * 2, true);
    //             ctx.fill();
    //         }
    //     }
    
        // .expandDims();
    // let meanImageNetRGB ={
    //     red: 123.68,
    //     green: 116.779,
    //     blue: 103.939
    // };
    // let indices =[
    //     tf.tensor1d([0],"int32"),
    //     tf.tensor1d([1],"int32"),
    //     tf.tensor1d([2],"int32")
    // ];

    // let centerRGB ={
    //     red: tf.gather(tensor, indices[0],2)
    //         .sub(tf.scalar(meanImageNetRGB.red)
    //         .reshape([50176])),
    //     green: tf.gather(tensor, indices[1],2)
    //         .sub(tf.scalar(meanImageNetRGB.red)
    //         .reshape([50176])),
    //     blue: tf.gather(tensor, indices[2],2)
    //         .sub(tf.scalar(meanImageNetRGB.red)
    //         .reshape([50176]))    
    // };
    // let processedTensor = tf.stack([centerRGB.red,centerRGB.green,centerRGB.blue],1)
    //                         .reshape([224,224,3])
    //                         .reverse(2)
    //                         .expandDims();
    let tensor = tf.browser.fromPixels(imgObj)
        .resizeNearestNeighbor([224,224])
        .toFloat()
    let meanImageNetRGB = tf.tensor1d([123.68,116.779,103.939])
    let processedTensor = tensor.sub(meanImageNetRGB).reverse(2).expandDims()
    let predictions = await model.predict(processedTensor).data();
    let top5 = Array.from(predictions)
        .map(function (p ,i){
            return{
                propability: p,
                className: SIGN_CLASSES[i]
            };
        }).sort( function(a,b){
            return b.propability - a.propability
        }).slice(0,1);
    console.log(top5)    
    $('#prediction-list').empty();
    top5.forEach( function(p){
        // $('#prediction-list').append(`<li>${p.className}: ${p.propability.toFixed(1)}</li>`)
        $('#prediction-list').append(`<li>${p.className}</li>`)
    });
   
      
      
})


