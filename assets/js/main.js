
$(document).ready(function () {
    var thumb;
    var currentKey = "Star Wars";
    var localArr = [];
    var savedArr = JSON.parse(localStorage.getItem("mySubs"));

    // var savedArr = JSON.parse(localStorage.getItem("mySubs"));
    // localArr.push(JSON.parse(localStorage.getItem("mySubs")));
    if (savedArr == null) {
        console.log('nothing Saved YEt');
    } else {
        for (var i = 0; i < savedArr.length; i++) {
            localArr.push(savedArr[i]);
        }
    }


    console.log(savedArr);
    
        function active(){
            $(".sub").on('click', function () {
                var src = $(this).data('src');
                console.log('pushed');
                var queryURL = "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + src;

                for (var i = 0; i < 10; i++) {
                    getGif(src);
                }
            });
        }
            
          


      


    var getGif = function (j) {
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + j,
            method: "GET"
        })
            .then(function (response) {
                var Gif = response.data.fixed_height_downsampled_url;
                var t = response.data.title;
                var d = response.data.images.downsized_medium.url;


                var img = $("<img>");
                var p = $('<p>');

                var div = $('<div>');
                var divCOn = $('<div>');
                var a = $('<a>');
                div.attr("class", "imgFound");
                divCOn.attr('class', "col-md-3 conDiv")
                img.attr("src", Gif);
                a.attr("download", d);

                p.text(t);
                a.append(img);
                div.append(a);
                divCOn.prepend(div);
                divCOn.append(p);

                $('#content').prepend(divCOn);


            });
    }

    var createSub = function (j) {
        var div = $('<div>').attr({ "class": 'sub', "data-src": j });

        var img = $('<img>').attr('class', 'thumbbail');;
        var p = $('<p>').text(j);
        div.attr('data-src', j);
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + j,
            method: "GET"
        })
            .then(function (response) {
                var jpg = response.data.fixed_width_small_still_url;
                img.attr('src', jpg);


                div.append(img);
                div.append(p);

                $('#subList').prepend(div);
                active();

            });
    }
    for (i = 0; i < localArr.length; i++) {
        createSub(localArr[i]);
        //    console.log(localArr[i]);
    }

    $('#addSub').click(function (event) {
        event.preventDefault();

        var term = $('#key').val();
        currentKey = term;
        localArr.push(term);
        localStorage.setItem("mySubs", JSON.stringify(localArr));


        createSub(term);
        for (var i = 0; i < 12; i++) {
            getGif(term);
        }

    })
    $("#menu-toggle").click(function (e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });

    for (var i = 0; i < 12; i++) {
        getGif("star Wars");

    };
   
active();



});
