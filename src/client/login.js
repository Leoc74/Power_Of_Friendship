function loginWithGoogle(){
  window.location.href = 'https://accounts.google.com/o/oauth2/auth?' + 
  'client_id=YOUR_CLIENT_ID' + 
  '&redirect_uri=YOUR_REDIRECT_URI' + 
  '&response_type= code' + 
  '&scope=email profile';
}