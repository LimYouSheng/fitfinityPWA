/* v0.19 overrides */
function updatePortalBackButton(){
  const canGoBack=portalHistory.length>0;
  ['portalBackBtn','portalBackCue'].forEach(id=>{const btn=document.getElementById(id);if(btn){btn.disabled=!canGoBack;btn.title=canGoBack?'Back — or swipe right':'Swipe right is available after opening another screen';}});
}

function compactAvailabilityMarkup(trainer){
  const days=[['Monday','MON'],['Tuesday','TUE'],['Wednesday','WED'],['Thursday','THU'],['Friday','FRI'],['Saturday','SAT'],['Sunday','SUN']];
  const blocks=trainerAvailabilityBlocks[trainer]||{};
  const rows=days.filter(([day])=>(blocks[day]||[]).length).map(([day,short])=>{
    const text=(blocks[day]||[]).map(([a,b])=>`${prettyTime(a)}–${prettyTime(b)}`).join(' · ');
    return `<div class="availability-compact-row"><strong>${short}</strong><span>${text}</span></div>`;
  });
  return rows.length?rows.join(''):'<div class="availability-compact-row unavailable"><strong>—</strong><span>No approved availability</span></div>';
}

renderOwnerTrainerAvailability=function(name=activeOwnerTrainer){
  const grid=document.getElementById('ownerTrainerAvailabilityGrid');if(grid)grid.innerHTML=compactAvailabilityMarkup(name);
  const pending=document.getElementById('ownerTrainerPendingAvailability');
  if(pending){
    if(name===CURRENT_TRAINER&&pendingAvailabilityRequest){
      const r=pendingAvailabilityRequest,days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
      const proposedRows=days.flatMap(day=>(r.proposed?.[day]||[]).map(([a,b])=>`<div class="availability-review-row"><strong>${day}</strong><span>${prettyTime(a)}–${prettyTime(b)}</span></div>`)).join('');
      pending.classList.remove('hidden');pending.innerHTML=`<div class="page-head" style="margin-bottom:10px"><div><h3>Pending Availability Change</h3></div><span class="pill amber">Review</span></div><div class="availability-review-list">${proposedRows}</div><div class="actions" style="margin-top:12px"><button class="btn btn-sm btn-danger" onclick="rejectAvailabilityRequest()">Reject</button><button class="btn btn-sm btn-blue" onclick="approveAvailabilityRequest()">Approve</button></div>`;
    }else{pending.classList.add('hidden');pending.innerHTML='';}
  }
};
renderTrainerSelfAvailability=function(){const host=document.getElementById('trainerSelfAvailabilityGrid');if(host)host.innerHTML=compactAvailabilityMarkup(CURRENT_TRAINER)};

function renderAssignedClientRows(hostId,trainer,searchId,typeId,ownerMode){
  const host=document.getElementById(hostId);if(!host)return;
  const q=(document.getElementById(searchId)?.value||'').trim().toLowerCase(),type=document.getElementById(typeId)?.value||'';
  const rows=assignedClientsForTrainer(trainer).filter(c=>(!q||c.name.toLowerCase().includes(q)||String(c.goal||'').toLowerCase().includes(q))&&(!type||c.type===type));
  host.innerHTML=rows.length?rows.map(c=>`<div class="quick-row"><div><strong>${escapeHtml(c.name)}</strong><div class="compact-row-meta"><span class="pill ${c.type==='Couple'?'pink':'blue'}">${escapeHtml(c.type)}</span><span>${escapeHtml(clientListPackageLabel(c))}</span></div></div><button class="btn btn-sm" onclick="${ownerMode?`openOwnerClient('${String(c.name).replace(/'/g,"\\'")}')`:`openTrainerClient('${String(c.name).replace(/'/g,"\\'")}')`}">View</button></div>`).join(''):'<div class="muted empty-modal-result">No clients match these filters.</div>';
}
function renderOwnerTrainerAssignedClients(){renderAssignedClientRows('ownerTrainerAssignedClientsRows',activeOwnerTrainer,'ownerTrainerAssignedClientSearch','ownerTrainerAssignedClientType',true)}
function renderTrainerSelfAssignedClients(){renderAssignedClientRows('trainerSelfAssignedClientsRows',CURRENT_TRAINER,'trainerSelfAssignedClientSearch','trainerSelfAssignedClientType',false)}
function trainerSelfTab(btn,id){document.querySelectorAll('.trainer-self-tab').forEach(x=>x.classList.add('hidden'));document.getElementById(id)?.classList.remove('hidden');btn.parentElement.querySelectorAll('button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(id==='trainerSelfAvailability')renderTrainerSelfAvailability();if(id==='trainerSelfAssignedClients')renderTrainerSelfAssignedClients()}

/* Trainer name is immutable from the owner edit flow. */
setOwnerTrainerMainEdit=function(on){
  const displayIds=['ownerTrainerSpecialty','ownerTrainerEmail','ownerTrainerQualifications','ownerTrainerPublic','ownerTrainerStatusText'];
  const editIds=['ownerTrainerSpecialtyInput','ownerTrainerEmailInput','ownerTrainerQualificationsInput','ownerTrainerPublicInput','ownerTrainerStatusInput'];
  displayIds.forEach(id=>setHidden(id,on));editIds.forEach(id=>setHidden(id,!on));
  document.getElementById('ownerTrainerName')?.classList.remove('hidden');document.getElementById('ownerTrainerNameInput')?.classList.add('hidden');
  document.getElementById('owner-trainer')?.classList.remove('ownerTrainer-name-editing');
};
toggleOwnerTrainerEdit=function(){
  const btn=document.getElementById('ownerTrainerHeaderEditBtn'),d=ownerTrainerData[activeOwnerTrainer];if(!d||!btn)return;
  if(!ownerTrainerEditing){
    ownerTrainerEditing=true;document.getElementById('ownerTrainerSpecialtyInput').value=d.specialty||'';document.getElementById('ownerTrainerEmailInput').value=d.email||'';document.getElementById('ownerTrainerQualificationsInput').value=d.qualifications||'';document.getElementById('ownerTrainerPublicInput').value=d.public||'Visible';document.getElementById('ownerTrainerStatusInput').value=d.status||'Active';setOwnerTrainerMainEdit(true);setHeaderActionState(btn,true);setCancelVisible('ownerTrainerCancelBtn',true);setTimeout(()=>document.getElementById('ownerTrainerSpecialtyInput')?.focus(),0);return;
  }
  if(!confirm('Save these trainer details?'))return;
  d.specialty=document.getElementById('ownerTrainerSpecialtyInput').value.trim();d.email=document.getElementById('ownerTrainerEmailInput').value.trim();d.qualifications=document.getElementById('ownerTrainerQualificationsInput').value.trim();d.public=document.getElementById('ownerTrainerPublicInput').value;d.status=document.getElementById('ownerTrainerStatusInput').value;
  ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);setHeaderActionState(btn,false);setCancelVisible('ownerTrainerCancelBtn',false);renderTrainerDirectory();populateTrainerControls();refreshTrainerAssignmentViews();openOwnerTrainer(activeOwnerTrainer);toast('Trainer details saved.');
};
cancelOwnerTrainerEdit=function(){if(!ownerTrainerEditing)return;ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);setHeaderActionState(document.getElementById('ownerTrainerHeaderEditBtn'),false);setCancelVisible('ownerTrainerCancelBtn',false);openOwnerTrainer(activeOwnerTrainer)};

/* Keep the owner trainer's assigned-client tab fresh when opening a trainer. */
const _openOwnerTrainerV19=openOwnerTrainer;
openOwnerTrainer=function(name){_openOwnerTrainerV19(name);const q=document.getElementById('ownerTrainerAssignedClientSearch');if(q)q.value='';const t=document.getElementById('ownerTrainerAssignedClientType');if(t)t.value='';renderOwnerTrainerAssignedClients();};

/* Renewal modal preserves dashboard position on a normal close and after returning from a client. */
let renewalsDashboardScrollY=0, suppressRenewalCloseRestore=false;
const _openUpcomingRenewalsV19=openUpcomingRenewalsModal;
openUpcomingRenewalsModal=function(){renewalsDashboardScrollY=window.scrollY||0;_openUpcomingRenewalsV19();};
const _closeModalV19=closeModal;
closeModal=function(id){_closeModalV19(id);if(id==='upcomingRenewalsModal'&&!suppressRenewalCloseRestore&&currentPortalPage==='owner-dashboard'){const y=renewalsDashboardScrollY;const restore=()=>window.scrollTo(0,y);requestAnimationFrame(restore);setTimeout(restore,40);setTimeout(restore,120);}};
function closeUpcomingRenewalsModal(){closeModal('upcomingRenewalsModal')}
openRenewalClientFromModal=function(name){const list=document.getElementById('upcomingRenewalsModalRows');renewalReturnState={modalScroll:list?.scrollTop||0,pageScroll:renewalsDashboardScrollY||window.scrollY||0,search:document.getElementById('upcomingRenewalsSearch')?.value||'',type:document.getElementById('upcomingRenewalsType')?.value||'',waiting:true};suppressRenewalCloseRestore=true;_closeModalV19('upcomingRenewalsModal');suppressRenewalCloseRestore=false;openOwnerClient(name)};
restoreRenewalsAfterBack=function(){if(!renewalReturnState?.waiting||currentPortalPage!=='owner-dashboard')return;const state=renewalReturnState;renewalReturnState=null;renewalsDashboardScrollY=state.pageScroll||0;setTimeout(()=>{window.scrollTo(0,renewalsDashboardScrollY);const search=document.getElementById('upcomingRenewalsSearch'),type=document.getElementById('upcomingRenewalsType');if(search)search.value=state.search;if(type)type.value=state.type;renderUpcomingRenewalsModal();openModal('upcomingRenewalsModal');setTimeout(()=>{const list=document.getElementById('upcomingRenewalsModalRows');if(list)list.scrollTop=state.modalScroll||0},40)},0)};

/* Make sure the new controls are enhanced and initial back state is correct. */
document.addEventListener('DOMContentLoaded',()=>{enhancePortalSelects?.(document);renderTrainerSelfAvailability();updatePortalBackButton();});
