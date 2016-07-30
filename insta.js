

app.FeedCollection = Backbone.Model.extend({
    
  //  urlRoot : 'http://127.0.0.1:8000/posts/api/feed/',
   // model: app.Feed
});

app.Likes = Backbone.Model.extend({
     defaults : {
        count : 0,
        next : null,
        previous : null,
        results : null
    },
    urlRoot : 'http://harshitkumar.pythonanywhere.com/posts/api/posts/likes',
    
});


app.CommentCollection = Backbone.Model.extend({
    defaults : {
        comments : null,
    },
    urlRoot : 'http://harshitkumar.pythonanywhere.com/posts/api/posts/comments/'

});


app.feed = new app.FeedCollection();

app.commDict={};

app.Router = Backbone.Router.extend({
  routes: {
        
        'show/:id': 'showDetail',
        'delete/:id' :'deleteList',
        'home' : 'showAll'
  },deleteList: function(id){
      
      console.log("Path travelled");
      app.posts.fetch();
      var clt = app.posts.where({id : parseInt(id)})[0];
      clt.destroy();
  },
    showAll : function(){
        $('#comment').hide();
     app.appView = new app.AppView({collection : app.feed});
    },
  showDetail: function(id){
    console.log(id);
    $('#lists').hide();
    $('#comment').show();
    app.imgPost = new app.ImageDetail({id: parseInt(id)});
    
    app.likes = new app.Likes({id : parseInt(id)}); 
      
      app.imgPost.fetch().done(function(){
          console.log("Done");
          app.likes.fetch().done(function(){
              app.postUser = new app.User({id: parseInt( app.imgPost.get('user'))});
              
              app.postUser.fetch().done(function(){
              console.log("Likes inside img done");
              var uid =parseInt( $('#userid').val());
              var userStat;
                if(parseInt(app.imgPost.get('user'))===uid){
                    userStat = true;
                }else{
                    userStat = false;
                }
                  
              app.detailPost = new app.PostDetail({image : app.imgPost.get('image'),id: app.imgPost.get('id'),title :app.imgPost.get('title'), date_created : app.imgPost.get('date_created'),logged_in_user:uid ,postUsername : app.postUser.get('username'), user : app.imgPost.get('user'), likes : app.likes.get('count'), userStat : userStat});
              
              view = new app.PostDetailView({model : app.detailPost});
              $('#output2').html(view.render().el);
                  
             app.comments = new app.CommentCollection({id : app.imgPost.get('id')});
             app.comments.fetch().done(function(){
                 
                 var y = app.comments.get('comments');
                 app.ind =0;
                 app.lim = y.length;
                for(var i =0;i<y.length;i++){
                    app.commDict[i]={};
                    app.commDict[i]['date'] = y[i].date_created.slice(0,10);
                    app.commDict[i]['comm'] = y[i].comment;
                    app.commDict[i]['user'] = new app.User({id : y[i].user});
                    //var x =app.commDict[i]['user'];
                    //x.fetch().done(function(){
                    app.commDict[i]['user'].fetch({
                        success:function(){
                    app.ind+=1;
                    if(app.ind==app.lim){
                    for(i=0;i<app.lim;i++){
                        comment = new app.Comment({date_created : app.commDict[i]['date'], user : app.commDict[i]['user'].get('username'), comment : app.commDict[i]['comm'] } );
                    
                    var imgView = new app.CommentView({model : comment });
                    $('#output2').append(imgView.render().el);
                    // $('#output2').append("<br>");
                    
                    }
                    }
                        }
                    });                   
                }
                   $('#comment').show();
             });
          });
              
      });
      });
      $('#comment').show();
  }
    
});     



app.router = new app.Router();
Backbone.history.start();    


app.appView = new app.AppView({collection : app.feed});
