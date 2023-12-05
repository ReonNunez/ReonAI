$(document).ready(function() { 
    hideLoadingAnimation();
    // Send the form on enter keypress and avoid if shift is pressed 
    $('#prompt').keypress(function(event) { 
        if (event.keyCode === 13 && !event.shiftKey) { 
            event.preventDefault(); 
            $('form').submit(); 
        } 
    }); 
    $('form').on('submit', function(event) { 
        event.preventDefault();

        let minLengthValue = parseInt($('#minlength').val());
        let maxLengthValue = parseInt($('#maxlength').val());
        
        if (minLengthValue > maxLengthValue) {
            // Prevent the form submission
            event.preventDefault();
            
            // Display an alert or handle the error in a way that fits your UI/UX
            alert('Minimum length should be less than or equal to Maximum length.');
            return;
        } 

        showLoadingAnimation();

    // get the CSRF token from the cookie 
    let csrftoken = Cookies.get('csrftoken'); 
      
    // set the CSRF token in the AJAX headers 
    $.ajaxSetup({ 
        headers: { 'X-CSRFToken': csrftoken } 
    }); 
        let formData = new FormData();
        let prompt = $('#prompt').val();
        let minlength = $('#minlength').val();
        let maxlength = $('#maxlength').val();

        formData.append('prompt', prompt);
        formData.append('minlength', minlength);
        formData.append('maxlength', maxlength);

        $.ajax({ 
            url: '/summarizer', 
            type: 'POST', 
            data: formData, 
            processData: false,  // Set processData to false to prevent jQuery from processing the data
            contentType: false,  // Set contentType to false to let the server process the data as necessary
            success: function(data) {
                hideLoadingAnimation(); 
                $('#response').html('<p id="response">' + data.response + '</p>');  
            },
            error: function(xhr, status, error) {
                hideLoadingAnimation();
                $('#response').html('<p id="response">Server error...</p>');
                console.error(xhr.responseText);
            } 
        }); 
    });

    function showLoadingAnimation() {
        $('#response').hide();
        $('#loadingAnimation').show();
    }

    function hideLoadingAnimation() {
        $('#response').show();
        $('#loadingAnimation').hide();
    }

});