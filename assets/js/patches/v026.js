function setSessionMainInlineEditV26(on){
  setHidden('trainerSessionDateTime',on);
  setHidden('sessionDateTimeInline',!on);
  const owner=activeSessionRole==='owner';
  setHidden('trainerSessionTrainer',owner&&on);
  setHidden('sessionTrainerInline',!(owner&&on));
  if(!owner||!on)document.getElementById('sessionNotifyTrainerRow')?.classList.add('hidden');
}
const _v26RefreshSession=refreshTrainerSessionPage;
refreshTrainerSessionPage=function(){
  _v26RefreshSession();
  const e=getTrainerSessionEvent(activeSessionId);if(!e)return;
  const status=sessionStatusMap[e.id]||e.status||'Planned';
  const btn=document.getElementById('ownerSessionHeaderEditBtn');
  if(btn){btn.classList.toggle('hidden',status==='Completed');btn.textContent='Edit';btn.title=activeSessionRole==='trainer'?'Edit session time':'Edit session';btn.setAttribute('aria-label',btn.title)}
  if(activeSessionRole==='trainer'){document.getElementById('sessionTrainerInline')?.classList.add('hidden');document.getElementById('sessionNotifyTrainerRow')?.classList.add('hidden')}
};

toggleOwnerSessionEdit=function(){
  const e=getTrainerSessionEvent(activeSessionId),btn=document.getElementById('ownerSessionHeaderEditBtn');if(!e)return;
  const status=sessionStatusMap[e.id]||e.status;if(status==='Completed')return toast('Completed sessions are locked.');
  if(!ownerSessionEditing){
    if(!canBeginEditV25('session-main'))return;
    ownerSessionEditing=true;
    const o=sessionScheduleOverrides[e.id]||{};
    document.getElementById('sessionDateInline').value=o.date||e.date;
    document.getElementById('sessionTimeInline').value=o.time||to24Hour(e.time);
    document.getElementById('sessionEndTimeInline').value=o.endTime||addMinutesV25(o.time||to24Hour(e.time),60);
    if(activeSessionRole==='owner')populateSessionTrainerInline(e.trainer);
    setSessionMainInlineEditV26(true);setHeaderActionState(btn,true);setCancelVisible('ownerSessionCancelBtn',true);return;
  }
  const owner=activeSessionRole==='owner';
  if(!confirm(owner?'Save this ad-hoc session change? The recurring schedule will not change.':'Save this session date/time change? The recurring schedule will not change.'))return;
  const date=document.getElementById('sessionDateInline').value,time=document.getElementById('sessionTimeInline').value,endTime=document.getElementById('sessionEndTimeInline').value;
  if(!date||!time||!endTime)return toast('Date, From and To are required.');if(endTime<=time)return toast('Session end time must be after the start time.');
  sessionScheduleOverrides[e.id]={...(sessionScheduleOverrides[e.id]||{}),date,time,endTime};
  let changedTrainer=false,inform=false;
  if(owner){const trainer=document.getElementById('sessionTrainerInline').value;if(!trainer)return toast('Trainer is required.');changedTrainer=trainer!==sessionOriginalTrainerV25;inform=!!document.getElementById('sessionNotifyTrainerCheckbox')?.checked;sessionTrainerOverrides[e.id]=trainer}
  ownerSessionEditing=false;setSessionMainInlineEditV26(false);setHeaderActionState(btn,false);setCancelVisible('ownerSessionCancelBtn',false);
  setDashboardCalendar('owner',calendarNavState.owner.view);setDashboardCalendar('trainer',calendarNavState.trainer.view);renderOwnerAllSessions();renderTrainerAllSessions();refreshTrainerSessionPage();
  toast(owner?(changedTrainer&&inform?'Session saved. Trainer notification queued.':'Session changes saved.'):'Session time saved.');
};

cancelOwnerSessionEdit=function(){if(!ownerSessionEditing)return;ownerSessionEditing=false;setSessionMainInlineEditV26(false);setHeaderActionState(document.getElementById('ownerSessionHeaderEditBtn'),false);setCancelVisible('ownerSessionCancelBtn',false);refreshTrainerSessionPage()};

function resetTrainerOnboardingAvailabilityV26(){
  const builder=document.querySelector('#trainerModal .availability-builder');if(!builder)return;
  builder.querySelectorAll('.day-chip input').forEach(x=>{x.checked=false;x.disabled=false;x.removeAttribute('disabled')});
  const times=builder.querySelectorAll('input[type="time"]');if(times[0]){times[0].value='18:00';times[0].disabled=false}if(times[1]){times[1].value='21:00';times[1].disabled=false}
  builder.querySelectorAll('button').forEach(x=>{x.disabled=false;x.removeAttribute('disabled')});const list=document.getElementById('newTrainerAvailabilityBlocks');if(list)list.innerHTML='';
}
function restoreTrainerAvailabilityRequestV26(){
  const builder=document.getElementById('trainerAvailabilityRequestBuilder');if(!builder)return;
  builder.querySelectorAll('.day-chip input').forEach(x=>{x.checked=false;x.disabled=false;x.removeAttribute('disabled')});
  const from=document.getElementById('trainerAvailabilityRequestFrom'),to=document.getElementById('trainerAvailabilityRequestTo');if(from){from.value='18:00';from.disabled=false}if(to){to.value='21:00';to.disabled=false}
  builder.querySelectorAll('button').forEach(x=>{x.disabled=false;x.removeAttribute('disabled')});
  const list=document.getElementById('trainerAvailabilityRequestBlocks');
  if(list){
    const days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    list.innerHTML=days.flatMap(day=>(trainerAvailabilityBlocks[CURRENT_TRAINER]?.[day]||[]).map(([a,b])=>'<div class="block-row" data-days="'+day.slice(0,3)+'" data-from="'+a+'" data-to="'+b+'"><div><strong>'+day.slice(0,3)+'</strong><br><small>'+prettyTime(a)+'–'+prettyTime(b)+'</small></div><button class="btn btn-sm btn-danger" onclick="this.closest(\'.block-row\').remove()">Remove</button></div>')).join('');
  }
  const reason=document.getElementById('trainerAvailabilityRequestReason');if(reason)reason.value='';
}
const _v26OpenTrainerAvailabilityRequest=openTrainerAvailabilityRequest;
openTrainerAvailabilityRequest=function(){_v26OpenTrainerAvailabilityRequest();document.getElementById('trainerAvailabilityRequestBuilder')?.querySelectorAll('input,button').forEach(x=>{x.disabled=false;x.removeAttribute('disabled')})};

document.addEventListener('DOMContentLoaded',()=>{
  const trainerBuilder=document.querySelector('#trainerModal .availability-builder');
  if(trainerBuilder&&!document.getElementById('trainerOnboardingResetAvailabilityV26')){const a=document.createElement('div');a.className='trainer-reset-actions-v26';a.innerHTML='<button id="trainerOnboardingResetAvailabilityV26" type="button" class="btn btn-sm" onclick="resetTrainerOnboardingAvailabilityV26()">Reset Availability</button>';trainerBuilder.after(a)}
  const reqActions=document.querySelector('#availabilityRequestModal .actions');
  if(reqActions&&!document.getElementById('trainerRequestResetAvailabilityV26')){const b=document.createElement('button');b.id='trainerRequestResetAvailabilityV26';b.type='button';b.className='btn';b.textContent='Reset Availability';b.onclick=restoreTrainerAvailabilityRequestV26;reqActions.insertBefore(b,reqActions.firstChild)}
});
