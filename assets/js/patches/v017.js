/* v0.17 — targeted interaction cleanup */
const GENERIC_PICKER_SEARCH_THRESHOLD=7;
function genericPickerIsSearchable(select){
  if(!select)return false;
  if(select.dataset.pickerSearch==='on')return true;
  if(select.dataset.pickerSearch==='off')return false;
  return Array.from(select.options).filter(o=>!o.disabled).length>=GENERIC_PICKER_SEARCH_THRESHOLD;
}
openGenericPicker=function(select,button){
  if(!select||select.disabled)return;
  activeGenericSelect=select;
  activeGenericPickerButton=button;
  syncInAppSelect(select);
  const title=document.getElementById('genericPickerTitle');
  const search=document.getElementById('genericPickerSearch');
  const searchField=search?.closest('.generic-picker-search-field');
  const searchable=genericPickerIsSearchable(select);
  if(title)title.textContent=genericPickerLabel(select);
  if(search){
    search.value='';
    searchField?.classList.toggle('hidden-search',!searchable);
  }
  renderGenericPickerOptions();
  openModal('genericPickerModal');
  button?.setAttribute('aria-expanded','true');
  if(searchable)setTimeout(()=>search?.focus(),100);
};
function activateDateFilter(el){
  if(!el)return;
  if(el.type!=='date')el.type='date';
  setTimeout(()=>{try{el.showPicker?.()}catch(e){}},0);
}
function deactivateDateFilter(el){
  if(!el)return;
  if(!el.value){el.type='text';el.placeholder='Date'}
}

let activeRemunerationMonthKey='';
function remunerationTitleForMonth(monthKey){
  const label=financeMonthlyData[monthKey]?.label||'Remuneration';
  return label.replace(/\s*•\s*Payout.*$/,'');
}
function setRemunerationStats(monthKey,trainerName=''){
  const totals=financeMonthTotals(monthKey,trainerName);
  const status=financeMonthStatus(monthKey,trainerName);
  const approved=status==='Approved';
  document.getElementById('remBreakdownSessions').textContent=totals.sessions;
  document.getElementById('remBreakdownHours').textContent=totals.hours.toFixed(1);
  document.getElementById('remBreakdownTotal').textContent=money(totals.payout);
  document.getElementById('remBreakdownStatus').innerHTML=`<span class="pill ${approved?'green':'amber'}">${status}</span>`;
}
function ownerRemunerationTrainerListMarkup(monthKey){
  const month=financeMonthlyData[monthKey];
  return `<div class="rem-trainer-list">${Object.entries(month.trainers).map(([trainer,detail])=>{
    const status=month.status[trainer]||'Pending';
    return `<div class="rem-trainer-list-row"><div><strong>${escapeHtml(trainer)}</strong><small>${detail.sessions} sessions • ${money(detail.payout)} • ${escapeHtml(status)}</small></div><button class="btn btn-sm" onclick="openOwnerTrainerRemuneration('${monthKey}','${trainer.replace(/'/g,"\\'")}')">View</button></div>`;
  }).join('')}</div>`;
}
function openOwnerTrainerRemuneration(monthKey,trainer){
  const month=financeMonthlyData[monthKey];
  if(!month||!month.trainers[trainer])return;
  activeRemunerationMonthKey=monthKey;
  document.getElementById('remunerationBreakdownTitle').textContent=`${trainer} • ${remunerationTitleForMonth(monthKey)}`;
  document.getElementById('remunerationTrainerListBtn')?.classList.remove('hidden');
  document.querySelector('#remunerationBreakdownModal .remuneration-popup-stats')?.classList.remove('hidden');
  setRemunerationStats(monthKey,trainer);
  const groups=document.getElementById('remunerationOwnerGroups');
  const rowsHost=document.getElementById('remunerationSessionTableWrap');
  groups?.classList.add('hidden');
  rowsHost?.classList.remove('hidden');
  if(rowsHost)rowsHost.innerHTML=generateFinanceSessions(monthKey,trainer).map(r=>remunerationSessionCardMarkup(r)).join('');
  const action=document.getElementById('remunerationTrainerAction');
  const status=month.status[trainer]||'Pending';
  if(action){
    action.classList.remove('hidden');
    action.innerHTML=status==='Approved'
      ? '<span class="pill green">Approved</span>'
      : `<button class="btn btn-sm btn-blue" onclick="approveOwnerTrainerDetail('${monthKey}','${trainer.replace(/'/g,"\\'")}')">Approve</button>`;
  }
}
function approveOwnerTrainerDetail(monthKey,trainer){
  const month=financeMonthlyData[monthKey];
  if(!month||!month.status[trainer])return;
  if(!confirm(`Approve remuneration for ${trainer}?`))return;
  month.status[trainer]='Approved';
  renderOwnerRemunerationMonths();
  renderTrainerRemunerationMonths();
  openOwnerTrainerRemuneration(monthKey,trainer);
  toast(`${trainer} remuneration approved.`);
}
function returnToRemunerationTrainerList(){
  if(activeRemunerationMonthKey)openRemunerationBreakdown(activeRemunerationMonthKey,'owner');
}
openRemunerationBreakdown=function(monthKey,role){
  const month=financeMonthlyData[monthKey];
  if(!month)return;
  activeRemunerationMonthKey=monthKey;
  const title=document.getElementById('remunerationBreakdownTitle');
  const listBtn=document.getElementById('remunerationTrainerListBtn');
  const stats=document.querySelector('#remunerationBreakdownModal .remuneration-popup-stats');
  const groups=document.getElementById('remunerationOwnerGroups');
  const rowsHost=document.getElementById('remunerationSessionTableWrap');
  const action=document.getElementById('remunerationTrainerAction');
  action?.classList.add('hidden');
  if(action)action.innerHTML='';
  if(role==='owner'){
    if(title)title.textContent=remunerationTitleForMonth(monthKey);
    listBtn?.classList.add('hidden');
    stats?.classList.add('hidden');
    rowsHost?.classList.add('hidden');
    groups?.classList.remove('hidden');
    if(groups)groups.innerHTML=ownerRemunerationTrainerListMarkup(monthKey);
  }else{
    if(title)title.textContent=remunerationTitleForMonth(monthKey);
    listBtn?.classList.add('hidden');
    stats?.classList.remove('hidden');
    groups?.classList.add('hidden');
    rowsHost?.classList.remove('hidden');
    setRemunerationStats(monthKey,CURRENT_TRAINER);
    if(rowsHost)rowsHost.innerHTML=generateFinanceSessions(monthKey,CURRENT_TRAINER).map(r=>remunerationSessionCardMarkup(r)).join('');
  }
  openModal('remunerationBreakdownModal');
};

document.addEventListener('DOMContentLoaded',()=>{
  ['ownerSessionDateFilter','trainerSessionDateFilter'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&!el.value){el.type='text';el.placeholder='Date'}
  });
});
