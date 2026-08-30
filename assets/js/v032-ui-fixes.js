/* v0.32 UI fixes */
(function(){
  function syncTabletPortalV32(){
    const width=Math.max(document.documentElement.clientWidth||0, window.innerWidth||0);
    const touch=(navigator.maxTouchPoints||0)>0 || window.matchMedia?.('(pointer: coarse)')?.matches;
    document.documentElement.classList.toggle('portal-tablet-v32', !!touch && width>=781 && width<=1366);
  }

  window.syncTabletPortalV32=syncTabletPortalV32;
  syncTabletPortalV32();
  window.addEventListener('resize',syncTabletPortalV32,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(syncTabletPortalV32,50),{passive:true});

  /* Add the current request status to the owner dashboard preview without changing request behavior. */
  function dashboardRequestRowMarkupV32(r){
    const context=r.type==='Availability'?'Availability change':(requestSessionLineV30(r)||r.summary||'Request');
    const who=r.client?(r.trainer+' • '+r.client):r.trainer;
    const status=requestStatusPillV29(r.status).replace('class="pill','class="pill request-status-v32');
    return '<div class="dashboard-request-row-v30f">'+requestTypePillV29(r.type)+'<div class="dashboard-request-text"><strong>'+escapeHtml(who)+'</strong><small>'+escapeHtml(context)+'</small></div>'+status+'<button class="btn btn-sm" onclick="openOwnerRequestV29(\''+r.id+'\')">View</button></div>';
  }
  window.dashboardRequestRowMarkupV30Final=dashboardRequestRowMarkupV32;
  window.renderOwnerDashboardRequestsV29=function(){
    const host=document.getElementById('ownerDashboardRequestRows');
    if(!host)return;
    const pending=portalRequestsV29.filter(r=>r.status==='Pending').slice(0,3);
    host.innerHTML=pending.length?pending.map(dashboardRequestRowMarkupV32).join(''):'<div class="muted" style="font-size:10px;padding:4px 0">No pending requests.</div>';
  };

  /* v0.30 render function resolves dashboardRequestRowMarkupV30Final at call time. Re-render after override. */
  document.addEventListener('DOMContentLoaded',()=>{
    syncTabletPortalV32();
    if(typeof markTabletPageHeadersV30Final==='function')markTabletPageHeadersV30Final();
    if(typeof renderOwnerDashboardRequestsV29==='function')renderOwnerDashboardRequestsV29();
  });
})();
