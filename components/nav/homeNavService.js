angular.module('home').controller('homenavController', function($scope, $rootScope, $stateParams){
    $rootScope.openLoginModal = function(){
        $('#loginModal').modal({
            backdrop: 'static',
            keyboard: false
        });
    };

    $('.authTabs').click(function(){
        $(".tab-current").removeClass('tab-current');
        $tab = $(this);
        if(!$tab.hasClass('tab-current')){
            $tab.addClass('tab-current');
        }
    });

    $('.menuTab').click(function(){
        $(".menuTab-current").removeClass('menuTab-current');
        $menuTab = $(this);
        if(!$menuTab.hasClass('menuTab-current')){
            $menuTab.addClass('menuTab-current');
        }
    });

    $scope.forgotPass = function(){
        $('#login').hide();
        $('#forgotPass').show();
    };

    $scope.sendResetEmail = function(){
        $('#forgotPass').hide();
        $('#postReset').show();
    };

    $scope.goBackLogin = function(){
        $('#postReset').hide();
        $('#login').show();
    };



});