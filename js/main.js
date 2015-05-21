var app = {

    findByName: function() {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function(employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i=0; i<l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    playMedia: function(ev) {
        console.log(ev);
        console.log('playMedia');
        ev.preventDefault();

        var my_media = new Media("/android_asset/www/fzn15.mp3",
            function() {
                navigator.notification.alert('Success!', alertDismissed);
            },
            function(err) {
                navigator.notification.alert('Error!', alertDismissed);
            });

        my_media.play();

    },

    initialize: function() {
        this.store = new MemoryStore(); //LocalStorageStore // WebSqlStore
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        $(".go").on('click', $.proxy(this.playMedia, this));
    }

};

app.initialize();