function get_places() {
    $.ajax({
        data: JSON.stringify({"amenities": Object.keys(amenities)}),
        url: 'http://0.0.0.0:5001/api/v1/places_search/',
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        type: 'post',
        success: function (articles) {
            /* Before clean section places*/
            $('.places').empty();

            let i = setInterval(function () {
                if ($('.places').html === '') {
                    clearInterval(i);
                }

                $('.places').html = '';
            }, 3);

            $('.places').append($('<h1/>', {'html': 'Places'}));
            [...articles].filter(function (obj) {
                /*
                * Section div.title
                * */
                const div_title = $('<div/>', {'class': 'title'});

                div_title.append($('<h2/>', {'html': obj.name}));
                div_title.append($('<div/>', {'html': '$' + obj.price_by_night, 'class': 'price_by_night'}));

                /*
                * Section div.information
                * */
                let number_bathrooms = $('<div/>', {'class': 'number_bathrooms'});
                let number_rooms = $('<div/>', {'class': 'number_rooms'});
                const div_info = $('<div/>', {'class': 'information'});
                let max_guest = $('<div/>', {'class': 'max_guest'});

                number_bathrooms.append($('<i/>', {'class': 'fa fa-bath fa-3x'}));
                number_rooms.append($('<i/>', {'class': 'fa fa-bed fa-3x'}));
                max_guest.append($('<i/>', {'class': 'fa fa-users fa-3x'}));

                number_bathrooms.append($('<br/>'));
                number_bathrooms.append(obj.number_bathrooms + ' Bathroom');

                number_rooms.append($('<br/>'));
                number_rooms.append(obj.number_rooms + ' Bedrooms');

                max_guest.append($('<br/>'));
                max_guest.append(obj.max_guest + ' Guests');

                div_info.append(max_guest);
                div_info.append(number_rooms);
                div_info.append(number_bathrooms);

                /*
                * Section div.description
                * */
                const div_desc = $('<div/>', {'html': obj.description, 'class': 'description'});
                const div_user = $('<div/>', {'class': 'user'});

                const narticle = $('<article/>');
                narticle.append(div_title);
                narticle.append(div_info);
                narticle.append(div_user);
                narticle.append(div_desc);

                $('.places').append(narticle);
            });
        }
    })

}

let amenities = {};

$('document').ready(function () {
        function list_amenities() {
            amenities = [];

            $('.popover input[type="checkbox"]:checked').each(function () {
                amenities[$(this).attr('data-id')] = $(this).attr('data-name');
            });

            $('.amenities H4').text(Object.values(amenities).join(', '));
        }

        $('INPUT[type="checkbox"]').change(list_amenities);
        list_amenities();

        $.getJSON('http://0.0.0.0:5001/api/v1/status/', {}, function (emp) {
            if (emp.status === 'OK') {
                $('#api_status').addClass('available');
            }
        });

        /* load places from api*/
        get_places();
    }
);
