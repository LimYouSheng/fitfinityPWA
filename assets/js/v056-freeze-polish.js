/* v0.56 — session entity View buttons + approval-checkbox synchronization */
(function(){
  function activeEventV56(){
    return typeof getTrainerSessionEvent==='function' ? getTrainerSessionEvent(activeSessionId) : null;
  }

  window.openSessionClientProfileV56=function(){
    const e=activeEventV56();
    if(!e||!e.client)return;
    if(typeof openSharedClientProfile==='function')openSharedClientProfile(e.client);
  };

  window.openSessionTrainerProfileV56=function(){
    const e=activeEventV56();
    if(!e||!e.trainer)return;
    if(typeof currentRole!=='undefined'&&currentRole==='owner'){
      if(typeof openOwnerTrainer==='function')openOwnerTrainer(e.trainer);
      return;
    }
    /* Trainers viewing their own session land on their own profile. */
    if(typeof CURRENT_TRAINER!=='undefined'&&e.trainer===CURRENT_TRAINER){
      if(typeof openPage==='function')openPage('trainer-profile');
      return;
    }
    if(typeof toast==='function')toast('Trainer profile is not available from this account.');
  };

  function syncSessionEntityControlsV56(){
    const e=activeEventV56();if(!e)return;
    const client=document.getElementById('trainerSessionClient');
    if(client)client.textContent=e.client||'—';
    const trainer=document.getElementById('trainerSessionTrainer');
    if(trainer&&!trainer.classList.contains('hidden'))trainer.textContent=e.trainer||'—';
    const clientBtn=document.getElementById('sessionViewClientBtnV56');
    const trainerBtn=document.getElementById('sessionViewTrainerBtnV56');
    if(clientBtn){clientBtn.disabled=!e.client;clientBtn.setAttribute('aria-label',e.client?`View ${e.client} client profile`:'View client profile')}
    if(trainerBtn){trainerBtn.disabled=!e.trainer;trainerBtn.setAttribute('aria-label',e.trainer?`View ${e.trainer} trainer profile`:'View trainer profile')}
  }
  window.syncSessionEntityControlsV56=syncSessionEntityControlsV56;

  const previousRefreshV56=window.refreshTrainerSessionPage;
  if(typeof previousRefreshV56==='function'){
    window.refreshTrainerSessionPage=function(){
      const out=previousRefreshV56();
      syncSessionEntityControlsV56();
      return out;
    };
  }

  /* UI semantics: checked means owner approval is needed. Keep editor state
     explicitly synchronized with the status shown immediately before Edit. */
  function syncOwnerApprovalCheckboxesV56(){
    if(typeof getTrainerAutonomyV52!=='function')return;
    const editor=document.getElementById('ownerTrainerAutonomyEditorV52');
    if(!editor||editor.classList.contains('hidden'))return;
    const a=getTrainerAutonomyV52(typeof activeOwnerTrainer!=='undefined'?activeOwnerTrainer:undefined);
    const map={
      availability:'ownerAutonomyAvailabilityV52',
      sessionTime:'ownerAutonomySessionTimeV52',
      trainerChange:'ownerAutonomyTrainerChangeV52',
      fixedSchedule:'ownerAutonomyFixedScheduleV52'
    };
    Object.entries(map).forEach(([key,id])=>{
      const checkbox=document.getElementById(id);
      if(checkbox)checkbox.checked=a[key]!==true; // direct=false => approval needed => checked
    });
  }
  window.syncOwnerApprovalCheckboxesV56=syncOwnerApprovalCheckboxesV56;

  const previousToggleAutonomyV56=window.toggleOwnerTrainerAutonomyEditV52;
  if(typeof previousToggleAutonomyV56==='function'){
    window.toggleOwnerTrainerAutonomyEditV52=function(){
      const out=previousToggleAutonomyV56();
      /* Run after the v0.52 editor has switched into edit mode. */
      syncOwnerApprovalCheckboxesV56();
      return out;
    };
  }

  document.addEventListener('DOMContentLoaded',()=>{
    try{syncSessionEntityControlsV56()}catch(e){}
  });
})();
