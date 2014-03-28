Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


if (Meteor.isClient) {

  process.env.MAIL_URL='smtp://alex@getqueery.com:14th3m0ney@smtp.google.com:465'
  Meteor.subscribe('userData');
  Meteor.subscribe('emails');

  Template.signup.events({
    'submit form' : function (evt, tmpl) {

    var emails = tmpl.find('input').value , doc = {email: email, referrer: document.referrer, timestamp: new Date()}

    if (EMAIL_REGEX.test(email)){
      console.log("1");
      Session.set("showBadEmail", false);
      console.log("2");
      Meteor.call("insertEmail", doc);
      console.log("3");
      Session.set("emailSubmitted", true);
      console.log("4");
      Meteor.call(sendEmail,email);
      console.log("5");
    } else {
      console.log(email, "bademail 1");
      Session.set("showBadEmail", true);
      console.log("bademail 2");
    }
      return false;
    }
  });

  Template.signup.showBadEmail = function () {
    return Session.get("showBadEmail");
  };

  Template.signup.emailSubmitted = function () {
    return Session.get("emailSubmitted");
  };

  } //end of if Meteor.isClient

  if (Meteor.isServer) {

    Meteor.methods({
      insertEmail: function(doc) {
        Emails.insert(doc);
      },

      sendEmail: function(email) {
          check([email],[String]);
        Email.send({
          to: 'SpectrumProject@ac4d.com',
          from: 'SpectrumProject@ac4d.com',
          subject: 'New User Signup',
          text: email
        });   
      }
    })
  }

