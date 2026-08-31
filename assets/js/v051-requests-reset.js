/* v0.51 — client matching reset + trainer My Requests */
(function(){
  const esc=v=>typeof escapeHtml==='function'?escapeHtml(String(v??'')):String(v??'');

  /* Reset must also release controls disabled by saveClientAssignment(). */
  const previousReset=window.resetClientOnboardingSchedule;
  window.resetClientOnboardingSchedule=function(){
    const out=typeof previousReset==='function'?previousReset():undefined;
    clientAssignmentLocked=false;
    clientTrainerMatches={};
    clientFinalAssignment=null;
    document.getElementById('clientModal')?.classList.remove('client-assignment-locked');

    document.querySelectorAll('#clientMatchPanel button,#clientMatchPanel input').forEach(el=>{
      el.disabled=false;
      el.removeAttribute('disabled');
    });
    const trainerSelect=document.getElementById('availableTrainerSelect');
    if(trainerSelect){
      trainerSelect.disabled=true;
      trainerSelect.innerHTML='<option>Add availability options first</option>';
      if(typeof syncInAppSelect==='function')syncInAppSelect(trainerSelect);
    }
    const save=document.getElementById('saveClientAssignmentBtn');
    if(save){save.classList.add('hidden');save.disabled=false;save.removeAttribute('disabled')}
    const edit=document.getElementById('editClientAssignmentBtn');
    if(edit){edit.classList.add('hidden');edit.disabled=false;edit.removeAttribute('disabled')}
    const findBtn=[...document.querySelectorAll('#clientMatchPanel button')].find(b=>/find matching trainers/i.test(b.textContent||''));
    if(findBtn){findBtn.disabled=false;findBtn.removeAttribute('disabled')}
    return out;
  };

  window.renderTrainerRequestsV51=function(){
    const host=document.getElementById('trainerRequestRows');
    if(!host||typeof portalRequestsV29==='undefined')return;
    const q=(document.getElementById('trainerRequestSearch')?.value||'').trim().toLowerCase();
    const type=document.getElementById('trainerRequestType')?.value||'';
    const status=document.getElementById('trainerRequestStatus')?.value||'';
    const trainer=typeof CURRENT_TRAINER!=='undefined'?CURRENT_TRAINER:'Marcus Tan';
    const rows=portalRequestsV29.filter(r=>{
      const mine=r.trainer===trainer||r.requestedBy===trainer;
      const hay=[r.type,r.client,r.summary,r.reason,r.requestedTrainer,r.submitted,r.status].filter(Boolean).join(' ').toLowerCase();
      return mine&&(!q||hay.includes(q))&&(!type||r.type===type)&&(!status||r.status===status);
    });
    host.innerHTML=rows.length?rows.map(r=>{
      const context=r.client||r.summary||r.type;
      return `<div class="request-row request-row-v30f trainer-request-row-v51"><div class="request-main">${typeof requestTypePillV29==='function'?requestTypePillV29(r.type):`<span class="pill blue request-type">${esc(r.type)}</span>`}<strong>${esc(context)}</strong><small>${esc(r.summary||'')}</small></div><div class="request-meta">${typeof requestStatusPillV29==='function'?requestStatusPillV29(r.status):`<span class="pill amber">${esc(r.status)}</span>`}<small>${esc(r.submitted||'')}</small></div><button class="btn btn-sm" onclick="openTrainerRequestV51('${esc(r.id)}')">View</button></div>`;
    }).join(''):'<div class="empty-plan-state">No matching requests.</div>';
  };

  window.openTrainerRequestV51=function(id){
    if(typeof portalRequestsV29==='undefined')return;
    const trainer=typeof CURRENT_TRAINER!=='undefined'?CURRENT_TRAINER:'Marcus Tan';
    const r=portalRequestsV29.find(x=>x.id===id&&(x.trainer===trainer||x.requestedBy===trainer));
    if(!r)return;
    const title=document.getElementById('ownerRequestDetailTitleV29');
    const meta=document.getElementById('ownerRequestDetailMetaV29');
    const body=document.getElementById('ownerRequestDetailBodyV29');
    const actions=document.getElementById('ownerRequestDetailActionsV29');
    if(title)title.textContent=r.type;
    if(meta)meta.textContent=r.client?`${r.client} • ${r.submitted||''}`:(r.submitted||'');
    if(body)body.innerHTML=typeof requestDetailCardsV29==='function'?requestDetailCardsV29(r):'';
    if(actions)actions.innerHTML=typeof requestStatusPillV29==='function'?requestStatusPillV29(r.status):`<span class="pill amber">${esc(r.status)}</span>`;
    if(typeof openModal==='function')openModal('ownerRequestDetailModalV29');
  };

  if(typeof titles!=='undefined')titles['trainer-requests']=['My Requests',''];

  const previousShow=window.showPortal;
  window.showPortal=function(id,options={}){
    const out=typeof previousShow==='function'?previousShow(id,options):undefined;
    if(out!==false&&id==='trainer-requests')requestAnimationFrame(()=>window.renderTrainerRequestsV51());
    return out;
  };

  const previousAdd=window.addOwnerRequestV29;
  if(typeof previousAdd==='function'){
    window.addOwnerRequestV29=function(data){
      const out=previousAdd(data);
      window.renderTrainerRequestsV51();
      return out;
    };
  }

  const previousResolve=window.resolveOwnerRequestV29;
  if(typeof previousResolve==='function'){
    window.resolveOwnerRequestV29=function(status){
      const out=previousResolve(status);
      window.renderTrainerRequestsV51();
      return out;
    };
  }

  document.addEventListener('DOMContentLoaded',()=>window.renderTrainerRequestsV51());
})();
