/* v0.18 overrides */
let ownerTrainerRatesEditing=false;
let ownerTrainerRateBaseline={peak:0,offpeak:0};

function setOwnerTrainerMainEdit(on){
  const displayIds=['ownerTrainerName','ownerTrainerSpecialty','ownerTrainerEmail','ownerTrainerQualifications','ownerTrainerPublic','ownerTrainerStatusText'];
  const editIds=['ownerTrainerNameInput','ownerTrainerSpecialtyInput','ownerTrainerEmailInput','ownerTrainerQualificationsInput','ownerTrainerPublicInput','ownerTrainerStatusInput'];
  displayIds.forEach(id=>setHidden(id,on));
  editIds.forEach(id=>setHidden(id,!on));
  document.getElementById('owner-trainer')?.classList.toggle('ownerTrainer-name-editing',on);
}

toggleOwnerTrainerEdit=function(){
  const btn=document.getElementById('ownerTrainerHeaderEditBtn');
  const d=ownerTrainerData[activeOwnerTrainer];
  if(!d||!btn)return;
  if(!ownerTrainerEditing){
    ownerTrainerEditing=true;
    document.getElementById('ownerTrainerNameInput').value=activeOwnerTrainer;
    document.getElementById('ownerTrainerSpecialtyInput').value=d.specialty||'';
    document.getElementById('ownerTrainerEmailInput').value=d.email||'';
    document.getElementById('ownerTrainerQualificationsInput').value=d.qualifications||'';
    document.getElementById('ownerTrainerPublicInput').value=d.public||'Visible';
    document.getElementById('ownerTrainerStatusInput').value=d.status||'Active';
    setOwnerTrainerMainEdit(true);
    setHeaderActionState(btn,true);
    setCancelVisible('ownerTrainerCancelBtn',true);
    setTimeout(()=>document.getElementById('ownerTrainerNameInput')?.focus(),0);
    return;
  }
  if(!confirm('Save these trainer details?'))return;
  const oldName=activeOwnerTrainer;
  const newName=document.getElementById('ownerTrainerNameInput').value.trim();
  if(!newName)return toast('Trainer name is required.');
  if(newName!==oldName&&ownerTrainerData[newName])return toast('Another trainer already uses this name.');
  d.specialty=document.getElementById('ownerTrainerSpecialtyInput').value.trim();
  d.email=document.getElementById('ownerTrainerEmailInput').value.trim();
  d.qualifications=document.getElementById('ownerTrainerQualificationsInput').value.trim();
  d.public=document.getElementById('ownerTrainerPublicInput').value;
  d.status=document.getElementById('ownerTrainerStatusInput').value;
  if(newName!==oldName){
    ownerTrainerData[newName]=d;delete ownerTrainerData[oldName];
    trainerAvailabilityBlocks[newName]=trainerAvailabilityBlocks[oldName]||{};delete trainerAvailabilityBlocks[oldName];
    clients.forEach(c=>{if(c.trainer===oldName)c.trainer=newName});
    Object.keys(sessionTrainerOverrides).forEach(k=>{if(sessionTrainerOverrides[k]===oldName)sessionTrainerOverrides[k]=newName});
    if(CURRENT_TRAINER===oldName)CURRENT_TRAINER=newName;
    activeOwnerTrainer=newName;
  }
  ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);setHeaderActionState(btn,false);setCancelVisible('ownerTrainerCancelBtn',false);
  renderTrainerDirectory();populateTrainerControls();refreshTrainerAssignmentViews();openOwnerTrainer(activeOwnerTrainer);toast('Trainer details saved.');
};

cancelOwnerTrainerEdit=function(){
  if(!ownerTrainerEditing)return;
  ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);
  setHeaderActionState(document.getElementById('ownerTrainerHeaderEditBtn'),false);setCancelVisible('ownerTrainerCancelBtn',false);
  openOwnerTrainer(activeOwnerTrainer);
};

function syncOwnerTrainerRatesCard(){
  const d=ownerTrainerData[activeOwnerTrainer];if(!d)return;
  document.getElementById('ownerTrainerPeakRateDisplay').textContent='$'+(d.peakRate??80)+' / session';
  document.getElementById('ownerTrainerOffpeakRateDisplay').textContent='$'+(d.offpeakRate??55)+' / session';
  document.getElementById('ownerTrainerRateEffectiveDisplay').textContent=isoToDisplayDate(d.rateEffectiveFrom||'2026-08-29');
  document.getElementById('ownerTrainerPeakRateInput').value=d.peakRate??80;
  document.getElementById('ownerTrainerOffpeakRateInput').value=d.offpeakRate??55;
  document.getElementById('ownerTrainerRateEffectiveInput').value=d.rateEffectiveFrom||'2026-08-29';
}
function setOwnerTrainerRatesEdit(on){
  ['ownerTrainerPeakRateDisplay','ownerTrainerOffpeakRateDisplay'].forEach(id=>setHidden(id,on));
  ['ownerTrainerPeakRateInput','ownerTrainerOffpeakRateInput'].forEach(id=>setHidden(id,!on));
  if(!on)document.getElementById('ownerTrainerNewRateEffectiveRow')?.classList.add('hidden');
}
function handleOwnerTrainerRateChange(){
  if(!ownerTrainerRatesEditing)return;
  const peak=Number(document.getElementById('ownerTrainerPeakRateInput').value||0);
  const offpeak=Number(document.getElementById('ownerTrainerOffpeakRateInput').value||0);
  const changed=peak!==ownerTrainerRateBaseline.peak||offpeak!==ownerTrainerRateBaseline.offpeak;
  document.getElementById('ownerTrainerNewRateEffectiveRow')?.classList.toggle('hidden',!changed);
}
function toggleOwnerTrainerRatesEdit(){
  const d=ownerTrainerData[activeOwnerTrainer],btn=document.getElementById('ownerTrainerRatesEditBtn');if(!d||!btn)return;
  if(!ownerTrainerRatesEditing){
    ownerTrainerRatesEditing=true;ownerTrainerRateBaseline={peak:Number(d.peakRate??80),offpeak:Number(d.offpeakRate??55)};
    syncOwnerTrainerRatesCard();setOwnerTrainerRatesEdit(true);setHeaderActionState(btn,true);setCancelVisible('ownerTrainerRatesCancelBtn',true);return;
  }
  const peak=Number(document.getElementById('ownerTrainerPeakRateInput').value||0),offpeak=Number(document.getElementById('ownerTrainerOffpeakRateInput').value||0);
  if(peak<0||offpeak<0)return toast('Rates cannot be negative.');
  const changed=peak!==ownerTrainerRateBaseline.peak||offpeak!==ownerTrainerRateBaseline.offpeak;
  if(changed){
    const eff=document.getElementById('ownerTrainerRateEffectiveInput').value;if(!eff)return toast('Choose when the new rates become active.');
    if(!confirm(`Save the new trainer rates effective ${isoToDisplayDate(eff)}?`))return;
    d.peakRate=peak;d.offpeakRate=offpeak;d.rateEffectiveFrom=eff;
  }
  ownerTrainerRatesEditing=false;setOwnerTrainerRatesEdit(false);setHeaderActionState(btn,false);setCancelVisible('ownerTrainerRatesCancelBtn',false);syncOwnerTrainerRatesCard();
  toast(changed?'New rates saved.':'No rate changes made.');
}
function cancelOwnerTrainerRatesEdit(){
  ownerTrainerRatesEditing=false;setOwnerTrainerRatesEdit(false);setHeaderActionState(document.getElementById('ownerTrainerRatesEditBtn'),false);setCancelVisible('ownerTrainerRatesCancelBtn',false);syncOwnerTrainerRatesCard();
}

const _openOwnerTrainerV18=openOwnerTrainer;
openOwnerTrainer=function(name){
  if(ownerTrainerRatesEditing)cancelOwnerTrainerRatesEdit();
  _openOwnerTrainerV18(name);
  syncOwnerTrainerRatesCard();
};

function populateOwnerAssignedTrainerSelect(){
  const sel=document.getElementById('ownerAssignedTrainerSelect');if(!sel)return;
  const names=Object.keys(ownerTrainerData);
  sel.innerHTML=names.map(n=>`<option value="${escapeHtml(n)}" ${n===activeOwnerTrainer?'selected':''}>${escapeHtml(n)}</option>`).join('');
  if(typeof enhancePortalSelect==='function')enhancePortalSelect(sel);
}
function openOwnerAssignedClientsPage(){
  populateOwnerAssignedTrainerSelect();renderOwnerAssignedClientsPage();showPortal('owner-trainer-clients');
}
function setOwnerAssignedTrainer(name){if(ownerTrainerData[name])activeOwnerTrainer=name;renderOwnerAssignedClientsPage()}
function renderOwnerAssignedClientsPage(){
  const q=(document.getElementById('ownerAssignedClientSearch')?.value||'').trim().toLowerCase();
  const type=document.getElementById('ownerAssignedClientType')?.value||'';
  const rows=assignedClientsForTrainer(activeOwnerTrainer).filter(c=>(!q||c.name.toLowerCase().includes(q)||c.goal.toLowerCase().includes(q))&&(!type||c.type===type));
  const sub=document.getElementById('ownerAssignedClientsSubtitle');if(sub)sub.textContent=`${activeOwnerTrainer} • ${rows.length} ${rows.length===1?'client':'clients'}`;
  const host=document.getElementById('ownerAssignedClientsRows');if(!host)return;
  host.innerHTML=rows.length?rows.map(c=>`<div class="quick-row"><div><strong>${escapeHtml(c.name)}</strong><div class="compact-row-meta"><span class="pill ${c.type==='Couple'?'pink':'blue'}">${escapeHtml(c.type)}</span><span>${escapeHtml(c.goal)}</span></div></div><button class="btn btn-sm" onclick="openOwnerClient('${String(c.name).replace(/'/g,"\'")}')">View</button></div>`).join(''):'<div class="muted empty-modal-result">No assigned clients match these filters.</div>';
}

/* Remuneration owner list: show correct overall month totals; trainer detail replaces them with trainer totals. */
const _openRemunerationBreakdownV18=openRemunerationBreakdown;
openRemunerationBreakdown=function(monthKey,role){
  _openRemunerationBreakdownV18(monthKey,role);
  if(role==='owner'){
    document.querySelector('#remunerationBreakdownModal .remuneration-popup-stats')?.classList.remove('hidden');
    setRemunerationStats(monthKey,'');
  }
};

/* Unsaved-rate edits join the existing leave warning. */
const _hasUnsavedPortalEditsV18=hasUnsavedPortalEdits;
hasUnsavedPortalEdits=function(){return _hasUnsavedPortalEditsV18()||ownerTrainerRatesEditing};
