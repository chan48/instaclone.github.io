app.PostView = Backbone.View.extend({

    //tagName : "tr",
    //className : "success",
    tagName : 'div',
    template : _.template($('#posts-template').html()),
    initialize : function(){
        this.model = this.options.model;
        this.render();
       
    },
    render : function(){
       console.log(this.$el);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

app.UserView = Backbone.View.extend({
    
//    tagName : 'li',
//    className : 'list-group-item',
    tagName :'tr',
    template : _.template($('#user-template').html()),
    initialize : function(){
        this.model = this.options.model;
        this.render();
       
    },
    render : function(){
       console.log(this.$el);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});


//app.View = Backbone.View.extend({
//    initialize : function(){
//        this.options.promise.done(function(){
//            console.log("Done LIkes");
//        });
//    }
//});

app.PostDetailView = Backbone.View.extend({
    tagName :"div",
    className : "success",
    template : _.template($('#post-detail-template').html()),
    initialize : function(){
        this.model = this.options.model;
        this.render();
       
    },
    render : function(){
       console.log(this.$el);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
    
});


app.AppView = Backbone.View.extend({

    el : "#instaclone",
    events : {

        'click label' : 'showItems',
//        'keypress #title' : 'addOne',
        'click #sButton' : 'addOne',
        'click a#logout':'logout',
        'click a#showUsers': 'showUsers',
        'click button#searchSub' : 'searchUsers',
        'click div#no_likes' : 'showLikeUsers',
        //'click a' : 'showAll'
        'click a#homePage': 'showAll',
        
    },
    logout : function(e){
        
        Cookies.remove('instaUser');
//        Backbone.history.loadUrl();
//        return false;
        $('#lists').html("");
        $('#lists').hide();
        $('#output3').html("");
        $('#output3').hide();
        $('#output2').html("");
        $('#output2').hide();
        $('#comment').hide();
        $('#auth').show();
        Backbone.history.stop(); 
        Backbone.history.start();
    },
    addOne : function(e){
         
        console.log(document.getElementById("image").files[0]);
        var newTodoL = new app.ImagePost(this.newValues());
        console.log(app.posts);
        app.feed.fetch();
        app.feed.create(newTodoL);
        
        console.log("Saved " + app.feed);
        this.input.val('');
    },
    newValues : function(){
        console.log(this.input.val().trim());
        return {
            title : this.input.val().trim(),
            image :  document.getElementById("image").files[0].fileName,
            //image : this.imageInput.val(),
            date_created : new Date().toISOString().substring(0,10), 
            user : 2
        }
    },
    showAll : function(e){
        app.router.navigate('home',true);
    },
    showLikeUsers : function(e){
        app.usersList= new app.UserCollection();
        var pid = e.currentTarget.getAttribute('data');
        app.usersList.url = 'https://harshitkumar.pythonanywhere.com/posts/api/posts/likes/' + pid + '/users' ;
        
        app.usersList.fetch({
            
            success : function(){
                
                console.log(app.usersList);
                $('#lists').hide();
                $('#output3').html("");
                $('#output3').hide();
                $('#output2').html("");
                $('#output2').hide();
                $('#comment').hide();
        
                
                var x = app.usersList.models[0].get('results');
                for(i=0;i<x.length;i++){
                    var userView = new app.UserView({model :new app.User(x[i]) });
                    $('#likesModal').append(userView.render().el);
                }
                
                $('#likesModalB').click();
                
            }
        });
        
    },
    showUsers : function(e){
        
        app.usersList= new app.UserCollection();
        app.usersList.url = 'https://harshitkumar.pythonanywhere.com/posts/api/logaccounts/';
        
        app.usersList.fetch({
            
            success : function(){
                
                console.log(app.usersList);
                $('#lists').hide();
                $('#output3').html("");
                $('#output3').hide();
                $('#output2').html("");
                $('#output2').hide();
                $('#comment').hide();
        
                
                var x = app.usersList.models[0].get('results');
                for(i=0;i<x.length;i++){
                    var userView = new app.UserView({model :new app.User(x[i]) });
                    $('#subscribe_List').append(userView.render().el);
                }
                
                
            }
        });
        
        
    },
    searchUsers : function(e){
        
        app.usersList= new app.UserCollection();
        
        
        app.usersList.url = 'https://harshitkumar.pythonanywhere.com/posts/api/' + $('#criteria').val() + '/search';
        
        app.usersList.fetch({
            
            success : function(){
                
                console.log(app.usersList);
                $('#subscribe_List').html('');
                $('#lists').hide();
                $('#output3').html("");
                $('#output3').hide();
                $('#output2').html("");
                $('#output2').hide();
                $('#comment').hide();
        
                
                var x = app.usersList.models[0].get('results');
                for(i=0;i<x.length;i++){
                    var userView = new app.UserView({model :new app.User(x[i]) });
                    $('#subscribe_List').append(userView.render().el);
                }
                
                
            }
        });
        
        
    },
    showItems : function(e){

      //  alert("Clicked!");
        console.log( e);
        $('#comment').show();
        var lid = $(e.currentTarget).attr('data');
        app.router.navigate('show/' + parseInt(lid),true);
    },
    initialize: function(){

        this.input = this.$('#title');
        this.iteminput = this.$('#add-todoItem');
        this.imageInput = this.$('#image');
        var self = this;
        app.feed = new app.FeedCollection();
        var id = parseInt(Cookies.get('instaUser'));
        if(! isNaN(id)){
         app.feed.url ='https://harshitkumar.pythonanywhere.com/posts/api/feed/' + id;
          $('#auth').hide();
        $('#comment').hide();
       
        var y =app.feed.fetch({
             
            success:function(response,xhr,options){
                console.log(response);
                console.log(xhr);
                console.log(options);
                self.render();
            }
            
        });
    
//        this.listenTo(app.feed,'add',this.render);
      //  this.listenTo(app.feed,'change',this.render);
        }else{
            $('#auth').show();
            $('#comment').hide();
        }
        $('#header-items').hide();

    },
    render : function(){

        $('#auth').hide();
        $('#lists').html("");
        var cookie = Cookies.get('instaUser');
        if(cookie){
        $("#userid").val(parseInt(cookie));
        $('#auth').hide();
        $('#comment').hide();
        $('#lists').html("");
        
        console.log("Main App view");
        var x = app.feed.models[0];
        var y = x.get('results');
        for(var i =0;i<y.length;i++){
            var imgPost = new app.ImagePost(y[i]);
            var imgView = new app.PostView({model : imgPost });
            $('#lists').append(imgView.render().el);
        }
        
    
        }else{
            $('#auth').show();
            $('#lists').hide();

    }
    }

});

app.CommentView = Backbone.View.extend({
    tagName : 'div',
    className : "text-center",
    template : _.template($('#comment-template').html()),
    
    initialize: function(){
        this.model = this.options.model;
        this.render();
       
    },
    render : function(){
       console.log(this.$el);
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});
