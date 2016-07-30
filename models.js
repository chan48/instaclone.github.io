var app={};

//Backbone.AuthenticatedModel = Backbone.Model.extend({
//    sync: function(method, collection, options){
//        options = options || {};
//        options.beforeSend = function (xhr) {
//            var user = "aishu";// your actual username
//            var pass = "class123";// your actual password
//            var token = user.concat(":", pass);
//            xhr.setRequestHeader('Authorization', ("Basic ".concat(btoa(token))));
//            console.log("xhr" + xhr);
//        };
//        return Backbone.Model.prototype.sync.apply(this, arguments);
//    }
//
//});


app.ImagePost=Backbone.Model.extend({
    defaults :{
        id : null,   
        title :null,
        image : null,
        user :null,
        date_created : null
    }
});

app.ImageDetail = Backbone.Model.extend({
    defaults :{
        id : null,   
        title :null,
        image : null,
        user :null,
        date_created : null
    },
    urlRoot : 'http://harshitkumar.pythonanywhere.com/posts/api/posts/'
    
});

//app.Feed = Backbone.AuthenticatedModel.extend({
  app.Feed = Backbone.Model.extend({  
    defaults : {
        count : 0,
        next : null,
        previous : null,
        results : null
    },
//    parse : function(resp,xhr){
//        console.log(resp);
//        console.log(xhr);
//        var allHeaders = xhr.getAllResponseHeaders();
//        var cookieHeader = xhr.getResponseHeader("Set-Cookie");
//        console.log("Cookie header - "+ cookieHeader);
//        return resp;
//    }
});


app.PostDetail = Backbone.Model.extend({
    defaults : {
        id : null,
        title : null,
        image : null,
        user : null,
        postUsername : null,
        date_created : null,
        likes : null,
        userStat : null,
        logged_in_user : null,
        comments : null
    }
    
});

app.Comment = Backbone.Model.extend({
    defaults : {
        post : null,
        user : null,
        date_created : null,
        comment : null,
    }
});


app.User = Backbone.Model.extend({
    defaults : {
        first_name : null, 
        last_name : null, 
        email : null,
        username : null
    },
    urlRoot : 'http://harshitkumar.pythonanywhere.com/posts/api/logaccounts/'
    
});

