/*! anna-squares - v0.1.7 - 04-01-2014 */
"use strict";

annaSquaresApp.controller("footerController", function FooterController($scope) {
    $scope.links = [ {
        title: "Contributing",
        url: "#!/about/contributing"
    }, {
        title: "Blog",
        url: "http://blog.annasquares.com"
    }, {
        title: "Terms",
        url: "#!/about/terms"
    }, {
        title: "Privacy",
        url: "#!/about/privacy"
    }, {
        title: "Contact",
        url: "#!/about/contact"
    }, {
        title: "About",
        url: "#!/about"
    } ];
});