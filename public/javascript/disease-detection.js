let disease=document.querySelector("#disease");




    console.log("Hello world");
let button = document.querySelector(".button");

button.addEventListener("click", () => {
    const uploadInput = document.getElementById("uploadInput");
    const file = uploadInput.files[0];

    if (file) {
        displayImagePreview(file);
        init(file);
        console.log("Button is clicked");
    } else {
        console.log("Please select an image.");
    }
});



const URL = "../disease-detection-model/";
let model, webcam, labelContainer, maxPredictions;

async function init(imageFile) {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

     // Create and append elements to the DOM
     const webcamContainer = document.getElementById("webcam-container");
     const labelContainerWrapper = document.createElement("div");
     labelContainerWrapper.id = "label-container";
     document.body.insertBefore(labelContainerWrapper, webcamContainer.nextSibling);
 
     labelContainer = document.getElementById("label-container");

    const image = new Image();
    const reader = new FileReader();

    reader.onload = async function (e) {
        image.src = e.target.result;
        image.onload = async function () {
            const canvas = document.createElement("canvas");
            canvas.width = 200;
            canvas.height = 200;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(image, 0, 0, 200, 200);
            predict(canvas);
        };
    };

    reader.readAsDataURL(imageFile);
}

async function predict(canvas) {
    const prediction = await model.predict(canvas);

    // Find the index of the prediction with the highest probability
    const maxIndex = prediction.reduce((maxIndex, currentPrediction, currentIndex, array) => {
        return currentPrediction.probability > array[maxIndex].probability ? currentIndex : maxIndex;
    }, 0);

    // Store the name of the class with the highest probability in the variable 'maximum'
    const mypredection = prediction[maxIndex].className;

    // Display the prediction with the highest probability
    // const classPrediction = mypredection + ": " + prediction[maxIndex].probability.toFixed(2);
    // labelContainer.innerHTML = "<div>" + classPrediction + "</div>";

    // Now, 'mypredection' contains the name of the class with the highest probability
    console.log("Highest probability class: ", mypredection);
    disease.innerText=mypredection;

    


}

// Function to display image preview
function displayImagePreview(file) {
    const imagePreview = document.getElementById("imagePreview");
    const reader = new FileReader();

    reader.onload = function (e) {
        const previewImage = document.createElement("img");
        previewImage.src = e.target.result;
        imagePreview.innerHTML = "";
        imagePreview.appendChild(previewImage);
    };

    reader.readAsDataURL(file);
}







// Now write your own methods to retutn what to do with the disease 
