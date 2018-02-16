# Weather-app

This app is developed using AngularJS v1.6.5 and Bootstrap4

API comes from [OpenWeatherApi](http://openweathermap.org)

## Start demo
npm install -g http-server  

http-sever -a [path] -p [ports] -o  
(e.g http-server -a 127.0.0.1 -p 8080 -o)  

browser will automatically open the address, or you can copy the address into your browser.  

#### Accept Google location service
Make sure in the pop-up window you accept google to get your current location, otherwise the app cannot initially locate your position and initialize the weather panel.

## sass compiling
This app uses gulp to watch and compile .scss file to .css file. The .css file has been compiled already and imported into weather app.  

#### If you want to use gulp:   
npm install -g gulp  

npm install gulp-ruby-sass  

copy gulpfile.js offered into dir.  

gulp dist  
