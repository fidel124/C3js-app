myApp.controller("statController", function($scope, $http, WebSiteService){ 

 WebSiteService.findStat(function(response){
     graphicsDisplay(response); 
     $scope.statObj = response;     
   });// first webservice end  

 $scope.fidelsFirm = {};
      $scope.add = function(fidelsFirm){
        if(fidelsFirm.day !== undefined){
          if((typeof fidelsFirm.car == 'number') || fidelsFirm.car == undefined){
            if((typeof fidelsFirm.boat == 'number') || fidelsFirm.boat ==undefined){
              if((typeof fidelsFirm.motor_bike == 'number') || fidelsFirm.motor_bike ==undefined){
                if(typeof fidelsFirm.car !== 'number'){fidelsFirm.car = 0}
                if(typeof fidelsFirm.boat !== 'number'){fidelsFirm.boat = 0}
                if(typeof fidelsFirm.motor_bike !== 'number'){fidelsFirm.motor_bike = 0}
                if(fidelsFirm.car < 0){fidelsFirm.car = 0}
                if(fidelsFirm.boat < 0){fidelsFirm.boat = 0}
                if(fidelsFirm.motor_bike < 0){fidelsFirm.motor_bike = 0}                
                WebSiteService.create(fidelsFirm, function(response){
                 $scope.statObj = response;                  
                 $scope.fidelsFirm = "";
                 graphicsDisplay(response);                                        
                });
              }else{$scope.badForm ="Error bike field!";}
            }else{$scope.badForm ="Error boat field!";}
          }else{$scope.badForm ="Error car field!";}
        }else{$scope.badForm ="Error date field!";}      
      } 

      $scope.remove = function(id){
      WebSiteService.remove(id, function(response){        
        $scope.statObj = response;
        graphicsDisplay(response);
      });     
    }

      

     function graphicsDisplay(result){
        
     var theDate = [];  var theCar =[]; 
     var theBoat = []; var theBike = [];

     $scope.shapes = ['pie','donut','bar','scatter','line'];
     $scope.theMonths = [
                      "2016-01","2016-02","2016-03","2016-04",
                      "2016-05", "2016-06", "2016-07", "2016-08", 
                      "2016-09", "2016-10", "2016-11", "2016-12"
                        ];     
       
      angular.forEach(result, function(value, key){        
        theDate.push(value.day);
        theCar.push(value.car);
        theBoat.push(value.boat);
        theBike.push(value.motor_bike);        
      });

      for(var i = 0; i< result.length; i++){
        for(var j = 0; j< $scope.theMonths.length; j++){
          if(result[i].day == $scope.theMonths[j]){
            $scope.theMonths.splice(j,1);
          }
        }        
      }
      
      var dateValue = [];
      dateValue.push('x');
      for (var i=0; i<theDate.length; i++){
        dateValue.push(theDate[i]);                
      } 
     
      var carValue = [];
      carValue[0] = 'car';
      for (var i=0; i<theCar.length; i++){
        carValue.push(theCar[i]);                
      }

      var boatValue = [];     
      boatValue[0] = 'boat';
      for (var i=0; i<theBoat.length; i++){
        boatValue.push(theBoat[i]);                
      }      
      
      var bikeValue = [];
      bikeValue[0] = 'motor-bike';
      for (var i=0; i<theBike.length; i++){
         bikeValue.push(theBike[i]);                
      }      

      $scope.chart = c3.generate({ //start of first graph
        bindto: '#chart',        
        data: {                 
           x: 'x',
           columns: [
              dateValue,
              carValue,
              boatValue,
              bikeValue
            ],
            type:'spline'
        },
        transition: {
           duration: 1000
        },
        axis: {
          x: {
            type: 'category',
            tick: {
                format: '%Y-%m',
                rotate: 75,
                multiline: false
            }
          }
        },
        grid: {
          x: {
            show: true
          },
          y: {
            show: true
          }
        }
       
     });// end of first graph 

     $scope.$watch('shapeValue', function() { // start of second graph      
      //if($scope.shapeValue != null){
        $scope.chart2 = c3.generate({    //start of second graph
        bindto: '#chart2',        
        data: {                 
           x: 'x',
           columns: [
             dateValue,
             carValue,
             boatValue,
             bikeValue
            ],
            type: $scope.shapeValue 
        },        
        axis: {
           x: {
             type: 'category',
             tick: {
                format: '%Y-%m'
              }
           }
        }
       }); 
      //}
     });//end of second graph      
  }// end of function

});//end of controller 







                