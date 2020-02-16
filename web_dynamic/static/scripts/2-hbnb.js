$('document').ready(function () {
  const amenities = {};
  $('INPUT[type="checkbox"]').change(function () {
    if ($(this).is(':checked')) {
      amenities[$(this).attr('data-id')] = $(this).attr('data-name');
    } else {
      delete amenities[$(this).attr('data-id')];
    }
    $('.amenities H4').text(Object.values(amenities).join(', '));
  });

  $.getJSON('http://0.0.0.0:5001/api/v1/status/', {}, function (emp) {
    if (emp.status === 'OK') {
      $('#api_status').addClass('available');
    }
  })
});
