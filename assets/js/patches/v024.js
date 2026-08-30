setOwnerTrainerMainEdit=function(on){
  const displayIds=['ownerTrainerSpecialty','ownerTrainerEmail','ownerTrainerQualifications','ownerTrainerPublic','ownerTrainerStatusText'];
  const editIds=['ownerTrainerSpecialtyInput','ownerTrainerEmailInput','ownerTrainerQualificationsInput','ownerTrainerPublicInput','ownerTrainerStatusInput'];
  displayIds.forEach(id=>setHidden(id,on));
  editIds.forEach(id=>setHidden(id,!on));
  document.getElementById('ownerTrainerProfileName')?.classList.remove('hidden');
  document.getElementById('ownerTrainerName')?.classList.add('hidden');
  document.getElementById('ownerTrainerNameInput')?.classList.add('hidden');
};
toggleOwnerTrainerEdit=function(){
  const btn=document.getElementById('ownerTrainerHeaderEditBtn');
  const d=ownerTrainerData[activeOwnerTrainer];
  if(!d||!btn)return;
  if(!ownerTrainerEditing){
    ownerTrainerEditing=true;
    document.getElementById('ownerTrainerSpecialtyInput').value=d.specialty||'';
    document.getElementById('ownerTrainerEmailInput').value=d.email||'';
    document.getElementById('ownerTrainerQualificationsInput').value=d.qualifications||'';
    document.getElementById('ownerTrainerPublicInput').value=d.public||'Visible';
    document.getElementById('ownerTrainerStatusInput').value=d.status||'Active';
    setOwnerTrainerMainEdit(true);setHeaderActionState(btn,true);setCancelVisible('ownerTrainerCancelBtn',true);
    setTimeout(()=>document.getElementById('ownerTrainerSpecialtyInput')?.focus(),0);return;
  }
  if(!confirm('Save these trainer details?'))return;
  d.specialty=document.getElementById('ownerTrainerSpecialtyInput').value.trim();
  d.email=document.getElementById('ownerTrainerEmailInput').value.trim();
  d.qualifications=document.getElementById('ownerTrainerQualificationsInput').value.trim();
  d.public=document.getElementById('ownerTrainerPublicInput').value;d.status=document.getElementById('ownerTrainerStatusInput').value;
  ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);setHeaderActionState(btn,false);setCancelVisible('ownerTrainerCancelBtn',false);
  renderTrainerDirectory();populateTrainerControls();refreshTrainerAssignmentViews();openOwnerTrainer(activeOwnerTrainer);toast('Trainer details saved.');
};
cancelOwnerTrainerEdit=function(){
  if(!ownerTrainerEditing)return;ownerTrainerEditing=false;setOwnerTrainerMainEdit(false);
  setHeaderActionState(document.getElementById('ownerTrainerHeaderEditBtn'),false);setCancelVisible('ownerTrainerCancelBtn',false);openOwnerTrainer(activeOwnerTrainer);
};
const _v024OpenOwnerTrainerRemuneration=openOwnerTrainerRemuneration;
openOwnerTrainerRemuneration=function(monthKey,trainer){
  _v024OpenOwnerTrainerRemuneration(monthKey,trainer);
  const modal=document.getElementById('remunerationBreakdownModal');modal?.classList.add('rem-trainer-detail-open');
  document.getElementById('remunerationTrainerListBtn')?.classList.add('hidden');
  const title=document.getElementById('remunerationBreakdownTitle');
  if(title)title.innerHTML='<span class="rem-detail-name">'+escapeHtml(trainer)+'</span><small class="rem-detail-cycle">'+escapeHtml(remunerationTitleForMonth(monthKey))+'</small>';
};
const _v024OpenRemunerationBreakdown=openRemunerationBreakdown;
openRemunerationBreakdown=function(monthKey,role){
  document.getElementById('remunerationBreakdownModal')?.classList.remove('rem-trainer-detail-open');
  _v024OpenRemunerationBreakdown(monthKey,role);
};
