/* v0.33 polish */
(function(){
  /* Remove remuneration subtitles everywhere the page header is sourced. */
  try{
    if(typeof titles!=='undefined'){
      if(titles['owner-finance'])titles['owner-finance'][1]='';
      if(titles['trainer-remuneration'])titles['trainer-remuneration'][1]='';
    }
  }catch(e){}

  /* Use explicit columns so View cannot drop below the trainer record. */
  window.ownerRemunerationTrainerListMarkup=function(monthKey){
    const month=financeMonthlyData[monthKey];
    return `<div class="rem-trainer-list">${Object.entries(month.trainers).map(([trainer,detail])=>{
      const status=month.status[trainer]||'Pending';
      const cls=status==='Approved'?'green':'amber';
      const payout=(typeof ownerSensitiveMoneyV29==='function')?ownerSensitiveMoneyV29(money(detail.payout)):money(detail.payout);
      return `<div class="rem-trainer-list-row"><strong class="rem-trainer-list-name">${escapeHtml(trainer)}</strong><div class="rem-trainer-list-meta"><span>${detail.sessions} sessions • ${payout}</span><span class="pill ${cls}">${escapeHtml(status)}</span></div><button class="btn btn-sm" onclick="openOwnerTrainerRemuneration('${monthKey}','${trainer.replace(/'/g,"\\'")}')">View</button></div>`;
    }).join('')}</div>`;
  };

  function removeRemunerationSubtitlesV33(){
    document.querySelectorAll('#owner-finance>.page-head p,#trainer-remuneration>.page-head p').forEach(el=>el.remove());
    if((window.currentPortalPage==='owner-finance'||window.currentPortalPage==='trainer-remuneration')){
      const sub=document.getElementById('portalSubtitle');
      if(sub)sub.textContent='';
    }
  }

  const previousShowPortal=window.showPortal;
  if(typeof previousShowPortal==='function'){
    window.showPortal=function(id,options={}){
      const result=previousShowPortal(id,options);
      if(id==='owner-finance'||id==='trainer-remuneration'){
        const sub=document.getElementById('portalSubtitle');
        if(sub)sub.textContent='';
      }
      return result;
    };
  }

  document.addEventListener('DOMContentLoaded',()=>{
    removeRemunerationSubtitlesV33();
    if(typeof syncTabletPortalV32==='function')syncTabletPortalV32();
  });
})();
