﻿{    app.beginUndoGroup("API Dopeness"); var myComp = app.project.activeItem;//functionsfunction createDictionary(forecastArray){                  var myString=[];                  var phaseTracker=0;                  //if circle                  whichMove=1;                  myPhase=0;                  freq=Math.PI*2;                  radius=300;                                                      //~                                 var myDistanceY= (myPosition[1]-ref[1]);//~                                 var myDistanceX=  (myPosition[0]-ref[0]);//~                                 var myDistance = Math.sqrt((myDistanceX * myDistanceX) + (myDistanceY * myDistanceY));//~                                 var rad=Math.atan2(myDistanceY,myDistanceX);//~                                 var degg= rad;//~                                 var deg = rad * (180 / Math.PI);                        //~                                 var myPhase = deg/180*Math.PI;                                      for (g=0; g<forecastArray.length; g++)                    {                                                  movementFromForecast=forecastArray[g%forecastArray.length];                          //movementFromForecast=forecastArray[g%forecastArray.length]/100;                            myString.push([whichMove,[radius,freq,phaseTracker,movementFromForecast,2]])                           phaseTracker+=(movementFromForecast*Math.PI*2);                                             }                                                        santize = JSON.stringify(myString);                b=santize.split('"');                numO= b.length;                    for (u=0; u<=numO; u++)                    {                    santize=santize.replace('"','');                    }                return santize;//end createDictionary    }function createSlider(myComp){var nameTest="";        for (t=1; t<=myComp.numLayers;t++)        {             nameTest+=myComp.layer(t).name;            }                        if(nameTest.indexOf("TheEase")==-1)            {                var mySliders= File("/Users/tomiadewale/Documents/Adobe/After Effects CC 2015/User Presets/Effects_AutonomyEases2018.ffx");                var myComp = app.project.activeItem;                       var myNull=myComp.layers.addNull();                       myNull.moveToEnd();                       myNull.name="TheEase";                       myNull.applyPreset(mySliders);                              }           }function circleGrid(center,myCirclesize,amp,freq){        var myCirclesize= myCirclesize;      var center= center;      var amp =amp;      var phase =-Math.PI/2;      var freq= freq;      var myLabel =Math.round(generateRandomNumber()*16);      for (u=0; u < freq; u++)          {                             var x= amp*Math.cos(phase+(u*(Math.PI*2)/freq));               var y= amp*Math.sin(phase+(u*(Math.PI*2)/freq));               var mySetPosition = center + [x,y];                                         var myShape= myComp.layers.addShape();                                         var shapeGroup = myShape.property("Contents").addProperty("ADBE Vector Group");                                         var Ellipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");                                          Ellipse.property("ADBE Vector Ellipse Size").setValue([myCirclesize,myCirclesize]);                                        var EllipseStroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");                                        EllipseStroke.property("ADBE Vector Fill Color").setValue([0,0,0]);                   myShape.moveToBeginning();                 myShape.property("position").setValue(mySetPosition);                 myShape.label=myLabel;          }}function circleGridDope(center,myCirclesizeArray,amp,freq){      var center= center;      var amp =amp;      var phase =-Math.PI/2;      var freq= freq;      var myLabel =Math.round(generateRandomNumber()*16);      for (u=0; u < freq; u++)          {                             var x= amp*Math.cos(phase+(u*(Math.PI*2)/freq));               var y= amp*Math.sin(phase+(u*(Math.PI*2)/freq));               var mySetPosition = center + [x,y];                              var myCircleSize=myCirclesizeArray[u%myCirclesizeArray.length];                                   var myShape= myComp.layers.addShape();                                         var shapeGroup = myShape.property("Contents").addProperty("ADBE Vector Group");                                         var Ellipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");                                          Ellipse.property("ADBE Vector Ellipse Size").setValue([myCircleSize,myCircleSize]);                                        var EllipseStroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");                                        EllipseStroke.property("ADBE Vector Fill Color").setValue([.1,.4,.4]);                   myShape.moveToBeginning();                 myShape.property("position").setValue(mySetPosition);                 myShape.label=myLabel;          }}function webRequest(method, endpoint, query) {            var response = null,          curlCmd = 'fake stuff';          //alert(curlCmd);                  try {                 if (method === "POST") {                  curlCmd = 'curl -s -d "' + query + '" ' + endpoint;                  //alert("got Here");            } else if (method === "GET") {                  curlCmd = "curl -s -G -d '" + query + "' "+ endpoint;                                 //alert("got Here2");            }                        //alert(curlCmd);        response = system.callSystem(curlCmd);          //alert(response);        //alert("we made it!!!!");          } catch (err) {            alert("Error\nUnable to make a `"+ method +"` request to the network endpoint.  Please try again.");            }        return response;        }    //functionsvar myCities="Abuja,London,Stockholm,NewYorkCity,Pittsburg,SanFrancisco,Mumbai,Austin,Rio,Manchester,Tokyo,Shanghai,Bejing";myCities=myCities.split(",");for (hh=0; hh<myCities.length;hh++){//huge loop            var cityName=myCities[hh%myCities.length];            myQuery='https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+cityName+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';                          var showThis=webRequest('GET', myQuery.split("?")[0]+"?",myQuery.split("?")[1]);            //alert("Darvid! We made it!");            eval ('var gotThis ='+showThis+';');            var theTemp=gotThis.query.results.channel.item.condition.temp;            //alert("The temperature in "+cityName+ "is "+theTemp +"Degrees Fahrenheit" );            var theHighs = [];            for (i=0; i<gotThis.query.results.channel.item.forecast.length; i++)            {                var myFigure=gotThis.query.results.channel.item.forecast[i].high;                theHighs.push(myFigure);                }            //alert (theHighs);            var colorPal=[[253,163,103],[253,122,88],[252,99,67],[252,80,68],[249,49,50]];            colorPalChoice=colorPal[Math.floor(generateRandomNumber()*colorPal.length)];            //circleGridDope([myComp.width/2,myComp.height/2],theHighs*2,theHighs[0]*6,10);            var myCircleSize=theHighs[0];                             var myShape= myComp.layers.addShape();                                                     var shapeGroup = myShape.property("Contents").addProperty("ADBE Vector Group");                                                     var Ellipse = shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Ellipse");                                                      Ellipse.property("ADBE Vector Ellipse Size").setValue([myCircleSize,myCircleSize]);                                                    var EllipseStroke = shapeGroup.property("Contents").addProperty("ADBE Vector Graphic - Fill");                                                    EllipseStroke.property("ADBE Vector Fill Color").setValue(colorPalChoice/255);                               myShape.moveToBeginning();                             myShape.property("position").setValue([960,540]);                             myShape.label=12;            var myDictionaryText= createDictionary(theHighs);            var holdTime=0;            var delayTime="linear("+theTemp+",90,40,0,.25)";            var refLayer='thisComp.layer("yasss")';            var expressionString ='//usingHoldTimes\nmyOpts =["myBounce","anticipation","normal","linear","fastToSlow","slowToFast","steps","normal2","normal3","extra1","extra2"];\nj=0;\nmarkerStart=0;\nholdTime='+holdTime+';\nd='+delayTime+';\nl='+refLayer+';\nvar myShapeArray = { startPosition: transform.position,\n    theDirections: '+myDictionaryText+'\n};\n\nfunction tomiEase(rate, startTime, endTime, startVal, endVal) {\n    original = linear(time, startTime, endTime, 0, 2);\n    myScale = rate.valueAtTime(original);\n    return linear(myScale, -2, 2, startVal - (endVal - startVal), endVal);\n}\n\nfunction myAngles(startPosition, dist, ang) {\n    r = dist;\n    towatch1 = Math.sin(degreesToRadians(ang));\n    towatch2 = Math.cos(degreesToRadians(ang));\n    startVal = startPosition;\n    endVal = startVal + [towatch2 * r, towatch1 * r];\n    return endVal;\n}\n\nfunction myCircle(startPosition, radius, freq, phase, howMuchOfCycle, start, end, motionType) {\n    freq = freq;\n    phase = phase;\n    amp = radius;\n    myTime = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, 0, freq / (Math.PI * 2 / howMuchOfCycle));\n    //myTime=linear(time,start,end,0,freq/(Math.PI*2/howMuchOfCycle));\n    x = amp * Math.cos(phase + (freq * myTime))\n    y = amp * Math.sin(phase + (freq * myTime))\n    return [x, y] + startPosition + [-radius * Math.cos(phase), -radius * Math.sin(phase)];\n    //How to make it always connect....the custom offset is generated based on the phase \n}\nx = myShapeArray.startPosition;\nend = l.marker.key(1 + markerStart).time + d;\nj = 0;\nendVal = 800;\nstartVal = myShapeArray.startPosition;\nendVal = myShapeArray.startPosition;\ntheNumOfMoves = myShapeArray.theDirections.length;\nmotionType = 2;\nwhile (time >= end && j < theNumOfMoves && j < l.marker.numKeys - 1 - markerStart) {\n    //inside critical while loop\n    theNumOfMoves = myShapeArray.theDirections.length;\n    //above..check the length of the dictionary item\n    seedRandom(j + 2, true);\n    randDist = random(-100, 100);\n    randAng = random(0, 360);\n    randFreq = Math.PI * 2;\n    randPhase = random(-Math.PI * 2, Math.PI * 2);\n    randHow = Math.round(random(1, 4)) * .25;\n    whichType = myShapeArray.theDirections[j][0];\n    if (myShapeArray.theDirections[j].length == 3) {\n        motionType = myShapeArray.theDirections[j][2];\n    } else {\n        motionType = 2\n    }\n    if (whichType == 0) {\n        dist = myShapeArray.theDirections[j][1][0];\n        ang = myShapeArray.theDirections[j][1][1];\n    } else if (whichType == 2) {\n        myPos = myShapeArray.theDirections[j][1][0];\n    } else {\n        radius = myShapeArray.theDirections[j][1][0];\n        freq = myShapeArray.theDirections[j][1][1];\n        phase = myShapeArray.theDirections[j][1][2];\n        howMuchOfCycle = myShapeArray.theDirections[j][1][3];\n    }\n    //the phase above is changing on every j increment\n    j++\n    start = end;\n    startVal = x;\n\n\n    if (l.marker.key(j).comment.length >0) {\n\n\n        holdTime = parseFloat(l.marker.key(j).comment);\n\n        if (whichType == 0) {\n            endVal = myAngles(startVal, dist, ang);\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start+holdTime, startVal, endVal);\n        } else if (whichType == 2) {\n            endVal = myPos;\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, start + holdTime, startVal, endVal);\n        } else {\n\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = myCircle(startVal, radius, freq, phase, howMuchOfCycle, start, start + holdTime, motionType);\n        }\n\n\n    } else {\n\n\n\n        if (whichType == 0) {\n            endVal = myAngles(startVal, dist, ang);\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, startVal, endVal);\n        } else if (whichType == 2) {\n            endVal = myPos;\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = tomiEase(thisComp.layer("TheEase").effect(myOpts[motionType % myOpts.length])("Slider"), start, end, startVal, endVal);\n        } else {\n\n            end += l.marker.key(j + 1 + markerStart).time - l.marker.key(j + markerStart).time;\n            x = myCircle(startVal, radius, freq, phase, howMuchOfCycle, start, end, motionType);\n        }\n\n\n    }\n\n\n\n\n    //refill the dictioanary below\n}\nx;'            myShape.property("position").expression=expressionString;} app.endUndoGroup();}