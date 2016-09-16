$(document).ready(function () {

    $('#contact-form .form-control').each(function () {

        if ($.trim($(this).val()) == '') {
            $(this).removeClass('input-filled');
        } else {
            $(this).addClass('input-filled');
        }
    });

    $('#contact-form .form-control').on('blur', function () {

        if ($.trim($(this).val()) == '') {
            $(this).removeClass('input-filled');
        } else {
            $(this).addClass('input-filled');
        }
    });

    $('#contact-form .form-control').on('focus', function () {
        $(this).parent('.controls').find('.error-message').fadeOut(300);
    });


    $('#contact-form').submit(function () {

        if ($('#contact-form').hasClass('clicked')) {
            return false;
        }

        $('#contact-form').addClass('clicked');

        var buttonCopy = $('#contact-form button').html()
            , errorMessage = $('#contact-form button').data('error-message')
            , sendingMessage = $('#contact-form button').data('sending-message')
            , okMessage = $('#contact-form button').data('ok-message')
            , hasError = false;

        $('#contact-form .error-message,#contact-form .contact-form-message').remove();

        $('.requiredField').each(function () {
            if ($(this).attr('name') != 'phone' && $(this).attr('name') != 'webAddress' && $.trim($(this).val()) == '') {
                var errorText = $(this).data('error-empty');
                $(this).next('label').append('<span class="error-message" style="display:none;">' + errorText + '.</span>').find('.error-message').fadeIn('fast');
                hasError = true;
            }
            if ($(this).attr('name') === 'email') {
                var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;
                if (!emailReg.test($.trim($(this).val()))) {
                    var invalidEmail = $(this).data('error-invalid');
                    $(this).next('label').append('<span class="error-message" style="display:none;">' + invalidEmail + '.</span>').find('.error-message').fadeIn('fast');
                    hasError = true;
                }
            }
            if ($(this).attr('name') === 'confirmPassword' &&
                $(this).val() != $('#contact-form #contact-password').val()) {
                var invalidPass = $(this).data('error-invalid');
                $(this).next('label').append('<span class="error-message" style="display:none;">' + invalidPass + '.</span>').find('.error-message').fadeIn('fast');
                hasError = true;
            }
            if ($(this).attr('name') === 'phone' && $.trim($(this).val()) != '') {
                var phoneReg = /^\d{3}-\d{3}-\d{4}$/;
                if (!phoneReg.test($.trim($(this).val()))) {
                    var invalidPhone = $(this).data('error-invalid');
                    $(this).next('label').append('<span class="error-message" style="display:none;">' + invalidPhone + '.</span>').find('.error-message').fadeIn('fast');
                    hasError = true;
                }
            }
            if ($(this).attr('name') === 'webAddress' && $.trim($(this).val()) != '') {
                var webReg = /^(http)?:\/\/[a-zA-Z0-9]+\.[a-z]{2,4}\.[a-z]{2}/;
                if (!webReg.test($.trim($(this).val()))) {
                    var invalidWeb = $(this).data('error-invalid');
                    $(this).next('label').append('<span class="error-message" style="display:none;">' + invalidWeb + '.</span>').find('.error-message').fadeIn('fast');
                    hasError = true;
                }
            }
        });

        if (hasError) {
            $('#contact-form').append('<p class="contact-form-message">' + errorMessage + '</p>');
            $('#contact-form').removeClass('clicked');
        } else {
            $('#contact-form').append('<p class="contact-form-message"><i class="fa fa-spinner fa-pulse"></i>' + sendingMessage + '</p>');


            $('#contact-form .contact-form-message').remove();
            $('#contact-form').append('<p class="contact-form-message">' + okMessage + '</p>');
            $('#contact-form').removeClass('clicked');
            $('#contact-form')[0].reset();
            $('#contact-form .form-control').removeClass('input-filled');


        }

        return false;
    });
});