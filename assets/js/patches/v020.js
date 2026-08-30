/* v0.20 — true logical previous-page navigation with scroll restoration. */
const portalScrollMemoryV20={};
const _showPortalV20=showPortal;
showPortal=function(id,options={}){
  if(currentPortalPage&&currentPortalPage!==id){portalScrollMemoryV20[currentPortalPage]=window.scrollY||0;}
  const restore=!!options.restoreScroll;
  const result=_showPortalV20(id,options);
  if(result!==false&&restore){requestAnimationFrame(()=>window.scrollTo(0,portalScrollMemoryV20[id]||0));}
  return result;
};
portalBack=function(){
  if(!portalHistory.length)return;
  const previous=portalHistory[portalHistory.length-1];
  const result=showPortal(previous,{skipHistory:true,replaceBrowser:true,restoreScroll:true});
  if(result!==false){portalHistory.pop();updatePortalBackButton();}
};
function assignedClientPackageText(c){
  const label=clientListPackageLabel(c)||'';
  return label.replace(/\s*•\s*/g,' · ');
}
renderAssignedClientRows=function(hostId,trainer,searchId,typeId,ownerMode){
  const host=document.getElementById(hostId);if(!host)return;
  host.classList.add('assigned-client-list');
  const q=(document.getElementById(searchId)?.value||'').trim().toLowerCase();
  const type=document.getElementById(typeId)?.value||'';
  const rows=assignedClientsForTrainer(trainer).filter(c=>(!q||c.name.toLowerCase().includes(q)||String(c.goal||'').toLowerCase().includes(q))&&(!type||c.type===type));
  host.innerHTML=rows.length?rows.map(c=>{
    const safe=String(c.name).replace(/'/g,"\\'");
    const action=ownerMode?`openOwnerClient('${safe}')`:`openTrainerClient('${safe}')`;
    return `<div class="assigned-client-row"><div class="assigned-client-main"><strong>${escapeHtml(c.name)}</strong><small>${escapeHtml(c.type)}</small></div><div class="assigned-client-package"><small>PACKAGE</small><strong>${escapeHtml(assignedClientPackageText(c))}</strong></div><button class="btn btn-sm" onclick="${action}">View</button></div>`;
  }).join(''):'<div class="muted empty-modal-result">No clients match these filters.</div>';
};
renderOwnerTrainerAssignedClients=function(){renderAssignedClientRows('ownerTrainerAssignedClientsRows',activeOwnerTrainer,'ownerTrainerAssignedClientSearch','ownerTrainerAssignedClientType',true)};
trainerSelfTab=function(btn,id){
  document.querySelectorAll('.trainer-self-tab').forEach(x=>x.classList.add('hidden'));
  document.getElementById(id)?.classList.remove('hidden');
  btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));
  btn.classList.add('active');
  if(id==='trainerSelfAvailability')renderTrainerSelfAvailability();
};
