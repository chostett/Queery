if (Meteor.isClient) {
 /* Template.hello.greeting = function () {
    return "Welcome to Queery.<img src=images/queery.png>";
  };

  Template.hello.events({
    'click input': function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
  Template.loginbuttons({

  })
*/
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
