/*! anna-squares - v0.1.7 - 04-01-2014 */
"use strict";

annaSquaresApp.controller("signupController", function SignupController($scope) {
    $scope.formName = "signupForm";
    $scope.fieldDefinitions = [ {
        label: "Username",
        name: "username",
        type: "text",
        isRequired: true,
        hasPattern: "/^[A-Za-z0-9]+(-[A-Za-z0-9]+)*$/",
        maxLength: "39",
        minLength: "",
        matchField: "",
        fieldHelp: "This is your username. Your username cannot be changed after the account is created.",
        fieldHelpItems: [],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: ""
        }, {
            errorKey: "maxlength",
            errorMessage: "The username provided is too long (must be a maximum is 39 characters)."
        }, {
            errorKey: "pattern",
            errorMessage: "Username may only contain alphanumeric characters or dashes and cannot begin with a dash."
        }, {
            errorKey: "email",
            errorMessage: ""
        }, {
            errorKey: "unique",
            errorMessage: "The username provided has already been taken. Please choose another username."
        }, {
            errorKey: "match",
            errorMessage: ""
        } ]
    }, {
        label: "Email Address",
        name: "emailAddress",
        type: "email",
        isRequired: true,
        hasPattern: "",
        maxLength: "125",
        minLength: "",
        matchField: "",
        fieldHelp: "Please enter your e-mail address. AnnaSquares will never share your address with anyone.",
        fieldHelpItems: [],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: ""
        }, {
            errorKey: "maxlength",
            errorMessage: "The e-mail address provided is invalid or malformed."
        }, {
            errorKey: "pattern",
            errorMessage: ""
        }, {
            errorKey: "email",
            errorMessage: "The e-mail address provided is invalid or malformed."
        }, {
            errorKey: "unique",
            errorMessage: "The e-mail address provided is already associated to another account. Please check the entered e-mail address."
        }, {
            errorKey: "match",
            errorMessage: ""
        } ]
    }, {
        label: "Password",
        name: "password1",
        type: "password",
        isRequired: true,
        hasPattern: "/^(?=.{0,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]|.*\\W).*$/",
        maxLength: "",
        minLength: "7",
        matchField: "",
        fieldHelp: "Please enter a password with the following complexity characteristics:",
        fieldHelpItems: [ "At least 7 characters long.", "Contains a lowercase letter.", "Contains an uppercase letter.", "Contains a numeral or special character." ],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: "The password provided is too short (must be a minimum of 7 characters)."
        }, {
            errorKey: "maxlength",
            errorMessage: ""
        }, {
            errorKey: "pattern",
            errorMessage: "The password must conform with the complexity characteristics given above."
        }, {
            errorKey: "email",
            errorMessage: ""
        }, {
            errorKey: "unique",
            errorMessage: ""
        }, {
            errorKey: "match",
            errorMessage: ""
        } ]
    }, {
        label: "Confirm Password",
        name: "password2",
        type: "password",
        isRequired: true,
        hasPattern: "",
        maxLength: "",
        minLength: "",
        matchField: "formData.password1",
        fieldHelp: "",
        fieldHelpItems: [],
        fieldErrorItems: [ {
            errorKey: "required",
            errorMessage: "This field is required."
        }, {
            errorKey: "minlength",
            errorMessage: ""
        }, {
            errorKey: "maxlength",
            errorMessage: ""
        }, {
            errorKey: "pattern",
            errorMessage: ""
        }, {
            errorKey: "email",
            errorMessage: ""
        }, {
            errorKey: "unique",
            errorMessage: ""
        }, {
            errorKey: "match",
            errorMessage: "The provided passwords provided do not match."
        } ]
    } ];
    $scope.formData = {};
    $scope.formAgreementNotice = 'By clicking on the "Create An Account" button below, you are agreeing to the following:';
    $scope.formAgreements = [ {
        title: "Privacy Policy",
        url: "#!/about/privacy"
    }, {
        title: "Terms of Service",
        url: "#!/about/terms"
    } ];
    $scope.buttonDefinitions = [ {
        caption: "Create An Account",
        type: "submit",
        disabledWhen: "inputForm.$pristine || inputForm.$dirty && inputForm.$invalid",
        "class": "btn btn-md btn-primary"
    } ];
    $scope.submitButtonText = "Create An Account";
    $scope.processForm = function() {
        console.log("Form processed.");
    };
});