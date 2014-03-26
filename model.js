Emails = new Meteor.Collection("emails")

EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


if (Meteor.isClient) {

  Meteor.subscribe('userData');
  Meteor.subscribe('emails');

  Template.signup.events({
    'submit form' : function (evt, tmpl) {

    var email = tmpl.find('input').value , doc = {email: email, referrer: document.referrer, timestamp: new Date()}

    if (EMAIL_REGEX.test(email)){
      Session.set("showBadEmail", false);
      Meteor.call("insertEmail", doc);
      Session.set("emailSubmitted", true);
      Email.send({
        to: 'SpectrumProject@ac4d.com',
        from: 'SpectrumProject@ac4d.com',
        subject: 'New User Signup',
        text: email});
    } else {
      Session.set("showBadEmail", true);
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


  Template.main.showAdmin = function() {
    return Session.get("showAdmin");
  };

  Template.admin.emails = function() {
    return Emails.find().fetch();
  };

  }

  if (Meteor.isServer) {

/*    Meteor.publish("userData", function () {
      return Meteor.users.find({_id: this.userId}, {fields: {'services.github.username': 1, 'username':1}});
    });

    Meteor.publish("emails", function() {
      if (isAdmin(this.userId)) {
        return Emails.find();
      }
    });
*/
    Meteor.methods({
      insertEmail: function(doc) {
        Emails.insert(doc);
      }
    })
  }

displayName = function (user) {
  if (user.profile && user.profile.name)
    return user.profile.name;
  return user.emails[0].address;
};

var contactEmail = function (user) {
  if (user.emails && user.emails.length)
    return user.emails[0].address;
  if (user.services && user.services.facebook && user.services.facebook.email)
    return user.services.facebook.email;
  return null;
};
