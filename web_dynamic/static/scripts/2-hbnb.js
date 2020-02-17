let amenities = {};

$('document').ready(function () {
        function list_amenities() {
            $('.popover input[type="checkbox"]:checked').each(function () {
                amenities[$(this).attr('data-id')] = $(this).attr('data-name');
            });

            $('.amenities H4').text(Object.values(amenities).join(', '));
        }

        $('INPUT[type="checkbox"]').change(list_amenities)
        list_amenities();

        $.getJSON('http://0.0.0.0:5001/api/v1/status/', {}, function (emp) {
            if (emp.status === 'OK') {
                $('#api_status').addClass('available');
            }
        });

        $.ajax({
            url: 'http://0.0.0.0:5001/api/v1/places_search/',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify({"amenities": Object.keys(amenities)}),
            dataType: 'json',
            type: 'post',
            success: function (x) {
                console.log(x);
            }
        })
    }
);
