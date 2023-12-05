$(document).ready(function() { 
    // Send the form on enter keypress and avoid if shift is pressed 
    $('#prompt').keypress(function(event) { 
        if (event.keyCode === 13 && !event.shiftKey) { 
            event.preventDefault(); 
            $('form').submit(); 
        } 
    }); 
    $('form').on('submit', function(event) { 
        event.preventDefault(); 
    // get the CSRF token from the cookie 
    let csrftoken = Cookies.get('csrftoken'); 
      
    // set the CSRF token in the AJAX headers 
    $.ajaxSetup({ 
        headers: { 'X-CSRFToken': csrftoken } 
    }); 
        let formData = new FormData();
        let prompt = $('#prompt').val();
        let imageFile = $('#imageInput')[0].files[0];  // Assuming you have an input element with type file for image

        formData.append('prompt', prompt);
        formData.append('image', imageFile);

        $.ajax({ 
            url: '/docvqa', 
            type: 'POST', 
            data: formData, 
            processData: false,  // Set processData to false to prevent jQuery from processing the data
            contentType: false,  // Set contentType to false to let the server process the data as necessary
            success: function(data) { 
                $('#response').html('<p>Answer: ' + data.response + '</p>');
                $('#score').html('<p>Confidence Score: ' + data.score + '</p>');   
            } 
        }); 
    });

});

let loadFile = function(event) {
    let output = document.getElementById('imagePreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
      URL.revokeObjectURL(output.src) // free memory
    }
};