(function(){
  const publicStaffLink=document.querySelector('.nav-link[data-page="login"]');
  if(publicStaffLink) publicStaffLink.remove();
  const params=new URLSearchParams(window.location.search);
  const isStandalone=window.matchMedia && window.matchMedia('(display-mode: standalone)').matches;
  const isIOSStandalone=window.navigator.standalone === true;
  if(params.get('staff')==='1' || isStandalone || isIOSStandalone){
    try{ goPublic('login'); }catch(e){}
  }
  if('serviceWorker' in navigator){
    window.addEventListener('load', function(){
      navigator.serviceWorker.register('./sw.js').catch(function(err){
        console.warn('Service worker registration failed', err);
      });
    });
  }
})();
