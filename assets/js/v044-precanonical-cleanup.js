/* v0.44 — final pre-canonical form and exercise-plan consistency fixes */
(function(){
  function exerciseNameMissingV44(row){
    if(!row)return false;
    const hidden=row.querySelector('.session-exercise-name');
    if(!hidden)return false;
    const value=String(hidden.value||'').trim();
    if(!value)return true;
    if(value==='__custom__')return !String(row.querySelector('.session-custom-exercise')?.value||'').trim();
    return false;
  }

  function firstUnnamedExerciseV44(){
    return [...document.querySelectorAll('#sessionExerciseRows .session-exercise-row')].find(exerciseNameMissingV44)||null;
  }

  function syncPlanSaveGuardV44(){
    const incomplete=firstUnnamedExerciseV44();
    const save=document.getElementById('saveSessionPlanBtn');
    if(save){
      save.disabled=!!incomplete;
      save.title=incomplete?'Choose an exercise name before saving.':'Save Exercise Plan';
      save.setAttribute('aria-disabled',incomplete?'true':'false');
    }
    return incomplete;
  }
  window.syncPlanSaveGuardV44=syncPlanSaveGuardV44;

  function rejectUnnamedExerciseV44(){
    const incomplete=syncPlanSaveGuardV44();
    if(!incomplete)return false;
    if(typeof toast==='function')toast('Choose an exercise name before saving the plan.');
    incomplete.querySelector('.exercise-picker-btn')?.focus();
    return true;
  }

  /* Guard every current save entry point, including the confirmation button. */
  const previousSave=window.saveSessionExercisePlan;
  if(typeof previousSave==='function'){
    window.saveSessionExercisePlan=function(){
      if(rejectUnnamedExerciseV44())return;
      return previousSave.apply(this,arguments);
    };
  }

  const previousConfirm=window.confirmSaveSessionExercisePlan;
  if(typeof previousConfirm==='function'){
    window.confirmSaveSessionExercisePlan=function(){
      if(rejectUnnamedExerciseV44())return;
      return previousConfirm.apply(this,arguments);
    };
  }

  const previousActiveSave=window.saveActiveSessionPlan;
  if(typeof previousActiveSave==='function'){
    window.saveActiveSessionPlan=function(){
      if(rejectUnnamedExerciseV44())return;
      return previousActiveSave.apply(this,arguments);
    };
  }

  /* Re-evaluate the Save state whenever exercise rows are created, removed, rendered or named. */
  ['addSessionExercise','removeSessionExerciseRow','renderSessionExerciseRows','cancelSessionPlanEdit','editSessionExercisePlan','startNewSessionExercisePlan'].forEach(name=>{
    const previous=window[name];
    if(typeof previous!=='function')return;
    window[name]=function(){
      const result=previous.apply(this,arguments);
      requestAnimationFrame(syncPlanSaveGuardV44);
      return result;
    };
  });

  const previousChoose=window.chooseExerciseFromPicker;
  if(typeof previousChoose==='function'){
    window.chooseExerciseFromPicker=function(){
      const result=previousChoose.apply(this,arguments);
      requestAnimationFrame(syncPlanSaveGuardV44);
      return result;
    };
  }

  document.addEventListener('input',event=>{
    if(event.target?.closest?.('#sessionExerciseRows'))requestAnimationFrame(syncPlanSaveGuardV44);
  });
  document.addEventListener('change',event=>{
    if(event.target?.closest?.('#sessionExerciseRows'))requestAnimationFrame(syncPlanSaveGuardV44);
  });

  document.addEventListener('DOMContentLoaded',()=>{
    /* Add Trainer availability starts intentionally empty: no day and no saved block is preselected. */
    const builder=document.querySelector('#trainerModal .availability-builder');
    builder?.querySelectorAll('.day-chip input[type="checkbox"]').forEach(input=>{input.checked=false});
    const list=document.getElementById('newTrainerAvailabilityBlocks');
    if(list)list.innerHTML='';
    syncPlanSaveGuardV44();
  });
})();
