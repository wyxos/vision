@if(config('services.google.recaptcha_site'))
<script src="https://www.google.com/recaptcha/api.js?render={{ config('services.google.recaptcha_site') }}"></script>
@endif
