/**
 * Created by Danny on 11/11/15.
 */
myApp.directive('peopleInfo',
    function(){
        return {
            restrict: "E",
            scope: {
                info: "=",
                action: '&'
            },
            templateUrl: "assets/views/peopleinfo.html"
        }
    }
);