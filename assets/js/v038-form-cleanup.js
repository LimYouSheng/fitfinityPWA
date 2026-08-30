/* v0.38 — remove onboarding helper copy while preserving functional match feedback. */
(function(){
  const clearMatchInstruction=()=>{
    const msg=document.getElementById('trainerMatchText');
    if(msg) msg.textContent='';
  };

  if(typeof openClientOnboarding==='function'){
    const previousOpenClientOnboarding=openClientOnboarding;
    openClientOnboarding=function(){
      const result=previousOpenClientOnboarding.apply(this,arguments);
      clearMatchInstruction();
      return result;
    };
  }

  if(typeof resetClientOnboardingSchedule==='function'){
    const previousResetClientOnboardingSchedule=resetClientOnboardingSchedule;
    resetClientOnboardingSchedule=function(){
      const result=previousResetClientOnboardingSchedule.apply(this,arguments);
      clearMatchInstruction();
      return result;
    };
  }

  document.addEventListener('DOMContentLoaded', clearMatchInstruction);
})();
