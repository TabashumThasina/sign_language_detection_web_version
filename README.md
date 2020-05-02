# sign_language_detection_web_version
Thasina Tabashum


We 100 pictures for each classifications and total 8 types of Bangla sign language. So, in total
we had 800 images for this for training and testing purpose. 651 images for training, 78
images for validation and 81 images for testing.


# Description
1. Building model and saving it: we built the model and trained it using tensorflow and keras. And saved it as an h5 file.  

2. Converting tensorflow model: First, we install using pip install tensorflowjs from the terminal. Then we ran on command prompt: 

3. tensorflowjs_converter --input_format location/model.h5 locationtosavetheconversion 

4. [ there will be multiple files after conversion so it is suggested to save the conversion on a folder] 

5. Installed nodejs 

6. On our main folder there two subfolders -> 1)local server 2)static 

7. Local server folder includes the package.json file and server.js file 

8. Static folder has tfjs-models subfolder navigating inside where we saved our models as sub directories.Each of the directories contains model.json and corresponding weight files for each model 

9. On the static folder we have three files 

1)predict-with-tfjs.html 

2)sign_classes.js 

3)Predict.js 

predict-with-tfjs.html     : this html files is the front end design of the web application 

Sign_classes.js: includes the predictions labels 

Predict.js: here we load the model and preprocess the input image and do the prediction 

# How to run 
Step 1: Install node.js according to your OS. https://nodejs.org/en/download/ 

Step 2: download the folder. There will be a local server folder. 

Step 3: Go to command prompt  

Step 4: Run  npm install [ Make sure to go local server folder and run  because package.json is written there] 

Step 5: node ./server.js [  this will start local server at 81 port, you can change the port on server.js file] 

Note: Now our node application is ready and local server 

Step 6:  If running on 81 port then url to run the application is http://localhost:81/predict-with-tfjs.html 
