/* v0.42 — exercise insertion workflow, search suggestion audit, searchable pickers */
(function(){
  function exerciseRowIsCompleteV42(row){
    if(!row)return true;
    const hidden=row.querySelector('.session-exercise-name');
    const value=(hidden?.value||'').trim();
    if(!value)return false;
    if(value==='__custom__')return !!row.querySelector('.session-custom-exercise')?.value.trim();
    return true;
  }

  function syncNewExerciseRowStateV42(row){
    if(!row)return;
    const complete=exerciseRowIsCompleteV42(row);
    row.classList.toggle('needs-exercise-v42',!complete);
    const picker=row.querySelector('.exercise-picker-btn');
    if(picker){
      picker.classList.toggle('exercise-name-needs-value-v42',!complete);
      picker.setAttribute('aria-invalid',complete?'false':'true');
    }
    const camera=row.querySelector('.camera-btn');
    if(camera){
      camera.disabled=!complete;
      camera.title=complete?'Record exercise':'Choose an exercise first';
    }
    syncAddExerciseButtonV42();
  }

  function firstIncompleteExerciseRowV42(){
    return [...document.querySelectorAll('#sessionExerciseRows .session-exercise-row')].find(row=>!exerciseRowIsCompleteV42(row))||null;
  }

  function syncAddExerciseButtonV42(){
    const btn=document.getElementById('addSessionExerciseBtn');
    if(!btn)return;
    const blocked=!!firstIncompleteExerciseRowV42();
    btn.disabled=blocked;
    btn.title=blocked?'Choose an exercise for the new row before adding another.':'Add Exercise';
  }
  window.syncAddExerciseButtonV42=syncAddExerciseButtonV42;

  /* Any render can remove an unsaved blank row (for example Cancel).
     Recompute the Add Exercise lock after the DOM has been rebuilt so a
     discarded blank row never leaves the button disabled. */
  const previousRenderSessionExerciseRowsV42=window.renderSessionExerciseRows;
  if(typeof previousRenderSessionExerciseRowsV42==='function'){
    window.renderSessionExerciseRows=function(){
      const result=previousRenderSessionExerciseRowsV42.apply(this,arguments);
      requestAnimationFrame(()=>{
        document.querySelectorAll('#sessionExerciseRows .session-exercise-row').forEach(syncNewExerciseRowStateV42);
        syncAddExerciseButtonV42();
      });
      return result;
    };
  }

  const previousBuild=window.buildSessionExerciseRow;
  if(typeof previousBuild==='function'){
    window.buildSessionExerciseRow=function(rawItem={},locked=false){
      const blank=!locked && rawItem && rawItem.exercise==='';
      const seed=blank?{...rawItem,exercise:'Smith back squat'}:rawItem;
      const row=previousBuild(seed,locked);
      if(blank){
        const hidden=row.querySelector('.session-exercise-name');
        const picker=row.querySelector('.exercise-picker-btn');
        const custom=row.querySelector('.session-custom-exercise');
        if(hidden)hidden.value='';
        if(picker)picker.textContent='Choose exercise';
        if(custom){custom.value='';custom.classList.add('hidden')}
        row.classList.add('is-new-exercise-v42','needs-exercise-v42');
        picker?.classList.add('exercise-name-needs-value-v42');
        const camera=row.querySelector('.camera-btn');
        if(camera){camera.disabled=true;camera.title='Choose an exercise first'}
      }
      const custom=row.querySelector('.session-custom-exercise');
      custom?.addEventListener('input',()=>syncNewExerciseRowStateV42(row));
      return row;
    };
  }

  const previousChoose=window.chooseExerciseFromPicker;
  if(typeof previousChoose==='function'){
    window.chooseExerciseFromPicker=function(value){
      const row=window.activeExercisePickerRow||activeExercisePickerRow;
      previousChoose(value);
      if(row){
        row.classList.add('is-new-exercise-v42');
        syncNewExerciseRowStateV42(row);
      }
    };
  }

  const previousExerciseNameFromRow=window.exerciseNameFromRow;
  window.exerciseNameFromRow=function(row){
    const hidden=row?.querySelector('.session-exercise-name');
    if(hidden && !hidden.value)return '';
    if(hidden?.value==='__custom__')return row.querySelector('.session-custom-exercise')?.value.trim()||'';
    return typeof previousExerciseNameFromRow==='function'?previousExerciseNameFromRow(row):(hidden?.value||'');
  };

  const previousAdd=window.addSessionExercise;
  window.addSessionExercise=function(){
    const incomplete=firstIncompleteExerciseRowV42();
    if(incomplete){
      toast('Choose an exercise for the new row before adding another.');
      incomplete.querySelector('.exercise-picker-btn')?.focus();
      syncAddExerciseButtonV42();
      return;
    }
    const e=getTrainerSessionEvent(activeSessionId);
    if(!e)return toast('Open a booked session first.');
    const status=sessionStatusMap[e.id]||e.status;
    if(status==='Completed')return toast('Completed session plans are locked.');
    if(!sessionPlanEditing){sessionPlanEditing=true;renderSessionExerciseRows()}
    const wrap=document.getElementById('sessionExerciseRows');
    if(!wrap)return;
    wrap.querySelectorAll('.is-new-exercise-v42').forEach(row=>row.classList.remove('is-new-exercise-v42'));
    wrap.querySelectorAll('.exercise-name-needs-value-v42').forEach(el=>el.classList.remove('exercise-name-needs-value-v42'));
    const row=buildSessionExerciseRow({exercise:'',weight:'',details:'',extraDetails:[],reps:'8',rounds:'3',rest:'60 sec'},false);
    wrap.prepend(row);
    document.getElementById('sessionExerciseEmpty')?.classList.add('hidden');
    document.getElementById('sessionExerciseHeader')?.classList.remove('hidden');
    row.querySelector('.exercise-picker-btn')?.focus();
    syncNewExerciseRowStateV42(row);
    updateClientFacingSummary();
  };

  const previousRemove=window.removeSessionExerciseRow;
  if(typeof previousRemove==='function'){
    window.removeSessionExerciseRow=function(btn){
      previousRemove(btn);
      requestAnimationFrame(syncAddExerciseButtonV42);
    };
  }

  const previousCurrentSummary=window.currentSessionPlanForSummary;
  if(typeof previousCurrentSummary==='function'){
    window.currentSessionPlanForSummary=function(){
      return previousCurrentSummary().filter(item=>String(item?.exercise||'').trim());
    };
  }

  const previousSave=window.saveSessionExercisePlan;
  if(typeof previousSave==='function'){
    window.saveSessionExercisePlan=function(showToast=true){
      const incomplete=firstIncompleteExerciseRowV42();
      if(incomplete){
        toast('Choose an exercise before saving the plan.');
        incomplete.querySelector('.exercise-picker-btn')?.focus();
        return;
      }
      return previousSave(showToast);
    };
  }


  /* Birthday replaces Age across client/trainer information collection.
     Keep a defensive migration for any older seeded record still carrying only an age. */
  function birthdayFromLegacyAgeV42(age,index=0){
    const n=Number(age);
    if(!Number.isFinite(n)||n<1||n>100)return '';
    const year=2026-n;
    const month=String((index%12)+1).padStart(2,'0');
    const day=String(((index*5)%27)+1).padStart(2,'0');
    return `${year}-${month}-${day}`;
  }
  Object.entries(typeof clientExtendedData!=='undefined'?clientExtendedData:{}).forEach(([name,d],i)=>{
    if(!d.birthday&&d.age)d.birthday=birthdayFromLegacyAgeV42(d.age,i);
    if(Array.isArray(d.people))d.people.forEach((p,j)=>{if(!p.birthday&&p.age)p.birthday=birthdayFromLegacyAgeV42(p.age,i+j+1)});
  });
  Object.entries(typeof ownerTrainerData!=='undefined'?ownerTrainerData:{}).forEach(([name,d],i)=>{
    if(!d.birthday)d.birthday=birthdayFromLegacyAgeV42(30+(i%9),i+2);
  });

  const previousDisplayClientV42=window.displayClientExtendedDataV25;
  if(typeof previousDisplayClientV42==='function'){
    window.displayClientExtendedDataV25=function(name){
      const result=previousDisplayClientV42(name);
      const d=extendedClientData(name);
      const display=document.getElementById('clientAgeDisplay');
      const input=document.getElementById('clientAgeInline');
      if(display)display.textContent=d.birthday?(typeof isoToDisplayDate==='function'?isoToDisplayDate(d.birthday):d.birthday):'—';
      if(input){input.type='date';input.value=d.birthday||''}
      return result;
    };
  }

  const previousOpenOwnerTrainerV42=window.openOwnerTrainer;
  if(typeof previousOpenOwnerTrainerV42==='function'){
    window.openOwnerTrainer=function(name){
      const result=previousOpenOwnerTrainerV42(name);
      const d=ownerTrainerData[name]||{};
      const display=document.getElementById('ownerTrainerBirthday');
      if(display)display.textContent=d.birthday?(typeof isoToDisplayDate==='function'?isoToDisplayDate(d.birthday):d.birthday):'—';
      const input=document.getElementById('ownerTrainerBirthdayInput');
      if(input)input.value=d.birthday||'';
      return result;
    };
  }

  /* Search suggestions: use the semantic purpose of each field, not "trainer" in the element id. */
  function uniqueV42(values){return [...new Set((values||[]).filter(Boolean))]}
  function clientNamesV42(assignedOnly=false){
    const rows=assignedOnly?clients.filter(c=>c.trainer===CURRENT_TRAINER):clients;
    return rows.map(c=>c.name);
  }
  function trainerNamesV42(){return Object.keys(ownerTrainerData)}
  function exerciseNamesV42(){return Object.values(EXERCISE_LIBRARY).flat().filter(x=>!inactiveExerciseNames.has(x))}

  window.suggestionsForSearchV25=function(input,q){
    const id=input?.id||'';
    const ph=(input?.placeholder||'').toLowerCase();
    let values=[];
    if(['genericPickerSearch','exercisePickerSearch'].includes(id))return [];
    switch(id){
      case 'clientSearch':
      case 'ownerTrainerAssignedClientSearch':
      case 'ownerAssignedClientSearch':
      case 'upcomingRenewalsSearch':
        values=clientNamesV42(false);break;
      case 'trainerClientSearch':
      case 'trainerAssignedClientSearch':
      case 'trainerSessionSearch':
        values=clientNamesV42(true);break;
      case 'trainerSearch':
        values=trainerNamesV42();break;
      case 'ownerSessionSearch':
      case 'ownerRequestSearch':
        values=[...clientNamesV42(false),...trainerNamesV42()];break;
      case 'ownerExerciseSearch':
        values=exerciseNamesV42();break;
      default:
        if(ph.includes('exercise'))values=exerciseNamesV42();
        else if(ph.includes('trainer or client')||ph.includes('client or trainer')||ph.includes('session'))values=[...clientNamesV42(false),...trainerNamesV42()];
        else if(ph.includes('client'))values=clientNamesV42(id.startsWith('trainer'));
        else if(ph.includes('trainer'))values=trainerNamesV42();
        else values=[];
    }
    const needle=String(q||'').toLowerCase();
    return uniqueV42(values).filter(v=>v.toLowerCase().includes(needle)).slice(0,10);
  };

  /* Make person/exercise selectors searchable even when their current option count is below the old threshold. */
  const previousPickerSearchable=window.genericPickerIsSearchable;
  const forceSearchPickerIdsV42=new Set([
    'clientTrainerFilter','permanentTrainerSelect','ownerAssignedTrainerSelect','sessionTrainerInline',
    'availableTrainerSelect','reassignTrainer','requestReplacementTrainerV29','strengthProgressExercise'
  ]);
  window.genericPickerIsSearchable=function(select){
    if(!select)return false;
    if(forceSearchPickerIdsV42.has(select.id))return true;
    const id=(select.id||'').toLowerCase();
    const label=(typeof genericPickerLabel==='function'?genericPickerLabel(select):'').toLowerCase();
    if((id.includes('trainer')||id.includes('client')||id.includes('exercise')) && !id.includes('status') && !id.includes('type'))return true;
    if(label.includes('trainer')||label.includes('client')||label.includes('exercise'))return true;
    return typeof previousPickerSearchable==='function'?previousPickerSearchable(select):Array.from(select.options||[]).length>=7;
  };

  document.addEventListener('DOMContentLoaded',()=>{
    syncAddExerciseButtonV42();
    const self=ownerTrainerData?.[typeof CURRENT_TRAINER!=='undefined'?CURRENT_TRAINER:'Marcus Tan']||ownerTrainerData?.['Marcus Tan'];
    const selfBirthday=document.getElementById('trainerSelfBirthday');
    if(selfBirthday&&self)selfBirthday.textContent=self.birthday?(typeof isoToDisplayDate==='function'?isoToDisplayDate(self.birthday):self.birthday):'—';
    requestAnimationFrame(()=>{
      document.querySelectorAll('#sessionExerciseRows .session-exercise-row').forEach(syncNewExerciseRowStateV42);
    });
  });
})();
