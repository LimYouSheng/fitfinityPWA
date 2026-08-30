function setHeaderActionState(btn,saving){
  if(!btn)return;
  btn.textContent=saving?'Save':'Edit';
  btn.classList.toggle('is-save',!!saving);
}

/* All tracked exercises are included in one concise report. */
exportProgressReport=function(){
  const entries=Object.entries(strengthProgressData||{}).filter(([,points])=>Array.isArray(points)&&points.length);
  if(!entries.length)return toast('No progress data to export.');
  const client=document.getElementById('sharedClientDisplayName')?.textContent?.trim()||'Client';
  const summaryRows=entries.map(([name,points])=>{
    const first=points[0],latest=points[points.length-1];
    const diff=Number((latest.load-first.load).toFixed(1));
    const change=(diff>0?'+':'')+diff+' kg';
    return `<tr><td><strong>${escapeHtml(strengthExerciseShortName(name))}</strong></td><td>${first.load} kg</td><td>${latest.load} kg</td><td>${change}</td><td>${points.length}</td></tr>`;
  }).join('');
  const historyRows=entries.flatMap(([name,points])=>[...points].reverse().map(p=>`<tr><td>${escapeHtml(strengthExerciseShortName(name))}</td><td>${p.date}</td><td>${p.sets}</td><td>${p.reps}</td><td>${p.load} kg</td></tr>`)).join('');
  const html=`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(client)} Progress Report</title><style>body{font-family:Arial,sans-serif;color:#111;padding:22px;max-width:900px;margin:auto;font-size:11px}h1{font-size:20px;margin:0 0 4px}h2{font-size:14px;margin:18px 0 6px}.meta{color:#555;margin-bottom:12px}table{width:100%;border-collapse:collapse;table-layout:fixed}th,td{padding:5px 4px;border-bottom:1px solid #ddd;text-align:left;vertical-align:top;overflow-wrap:anywhere}th{font-size:9px;color:#555;text-transform:uppercase}.summary th:first-child,.summary td:first-child{width:38%}@media print{body{padding:0}h2{break-after:avoid}tr{break-inside:avoid}}
/* Review 52 — compact session actions, list popups, trainer month summaries and swipe back */
.compact-calendar-toolbar{justify-content:flex-end!important}.calendar-nav-actions{display:grid!important;grid-template-columns:auto minmax(135px,auto) auto!important;gap:6px!important;align-items:center!important;margin-left:auto}.calendar-period-btn{min-width:135px!important;font-weight:850!important;padding-left:10px!important;padding-right:10px!important}.compact-head-actions{display:flex;align-items:center;gap:7px;flex-wrap:wrap;justify-content:flex-end}.compact-list-head{align-items:center!important}.compact-list-head p{margin:3px 0 0!important}.session-status-cluster{display:grid!important;grid-template-columns:repeat(3,minmax(0,1fr))!important;gap:5px!important;width:100%!important;flex-wrap:nowrap!important}.session-status-item{min-width:0!important;padding:5px 6px!important;border-radius:6px!important}.session-status-label{font-size:6.5px!important;letter-spacing:.35px!important;margin-bottom:3px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important}.session-status-item .pill{font-size:7px!important;padding:3px 5px!important;white-space:nowrap!important}.session-status-item .muted{font-size:8px!important;white-space:nowrap!important}.session-delivery-strip{display:flex;justify-content:flex-end;gap:7px;flex-wrap:wrap}.session-delivery-btn{min-height:34px!important;padding:7px 11px!important;font-size:10px!important;border-radius:7px!important;width:auto!important}.compact-list-modal{width:min(760px,100%)}.modal-search-toolbar{display:grid!important;grid-template-columns:minmax(0,1.5fr) minmax(120px,.7fr)!important;gap:8px!important;margin-top:14px}.modal-search-toolbar>*{width:100%!important;min-width:0!important}.modal-result-list{margin-top:10px;max-height:60vh;overflow-y:auto;overscroll-behavior:contain}.modal-client-row{min-width:0}.modal-client-row>div{min-width:0}.compact-row-meta{display:flex;gap:7px;align-items:center;flex-wrap:wrap;margin-top:5px;color:#9fa7b6;font-size:10px}.empty-modal-result{padding:18px 2px}.trainer-day-summary-card{min-width:0!important;width:100%!important}.swipe-back-indicator{position:fixed;left:8px;top:50%;z-index:500;transform:translate(-120%,-50%) scale(.9);opacity:0;pointer-events:none;border:1px solid #555d70;background:rgba(17,19,26,.94);color:#fff;border-radius:999px;padding:8px 12px;font-size:10px;font-weight:850;transition:opacity .12s ease,transform .12s ease}.swipe-back-indicator.ready{opacity:.28;transform:translate(-70%,-50%) scale(.92)}.swipe-back-indicator.show{opacity:1;transform:translate(0,-50%) scale(1)}
@media(max-width:780px){.calendar-nav-actions{width:100%!important;grid-template-columns:40px minmax(0,1fr) 40px!important}.calendar-period-btn{min-width:0!important;width:100%!important;font-size:9px!important;padding:8px 4px!important}.session-main-head-right{width:100%!important}.session-status-cluster{margin-top:4px!important}.session-status-item{padding:5px 4px!important}.session-status-label{font-size:6px!important}.session-status-item .pill{font-size:6.5px!important;padding:2px 4px!important}.session-delivery-strip{display:grid!important;grid-template-columns:1fr 1fr!important;gap:6px!important}.session-delivery-btn{width:100%!important;min-width:0!important;font-size:9px!important;padding:7px 5px!important}.month-grid.trainer-month-grid .trainer-day-summary-card{min-height:44px!important;padding:3px 1px!important;margin:2px 0!important}.month-grid.trainer-month-grid .trainer-day-summary-card strong{font-size:16px!important}.month-grid.trainer-month-grid .trainer-day-summary-card span{font-size:7px!important}.month-grid.trainer-month-grid .trainer-day-summary-card small{font-size:6px!important;white-space:nowrap!important;overflow:hidden!important;text-overflow:ellipsis!important;width:100%}.modal-search-toolbar{grid-template-columns:1fr 120px!important}.compact-list-modal{max-width:100%!important}.modal-result-list{max-height:68dvh}.modal-renewal-row{grid-template-columns:1fr auto!important}.compact-head-actions{width:auto!important}.owner-milestone-head{gap:8px!important}.owner-milestone-head .compact-head-actions{flex-shrink:0}.compact-list-head{flex-direction:row!important;align-items:center!important}.compact-list-head>div{min-width:0}.compact-list-head>.btn{align-self:center!important;flex-shrink:0}}
@media(max-width:390px){.modal-search-toolbar{grid-template-columns:1fr!important}.session-status-label{font-size:5.6px!important}.session-status-item .pill{font-size:6px!important}.month-grid.trainer-month-grid .trainer-day-summary-card{min-height:40px!important}.month-grid.trainer-month-grid .trainer-day-summary-card strong{font-size:14px!important}}
</style>
<style id="v026-styles">
@media(max-width:780px){
  .header-edit-icon,.header-edit-icon.small,.header-action-edit,.header-cancel-btn,.header-cancel-btn.small{
    min-width:46px!important;height:32px!important;min-height:32px!important;padding:0 9px!important;font-size:10px!important;border-radius:8px!important;
  }
  .session-status-item{padding:6px 5px!important}
  .session-status-label{font-size:7px!important;letter-spacing:.3px!important}
  .session-status-item .pill,.session-status-item .muted{font-size:8px!important;padding:3px 5px!important}
}
.trainer-reset-actions-v26{display:flex;justify-content:flex-start;margin-top:9px}
.trainer-reset-actions-v26 .btn{min-width:140px}
@media(max-width:780px){.trainer-reset-actions-v26 .btn{width:100%;min-width:0}}
</style>
</head><body onload="window.print()"><h1>${escapeHtml(client)} — Progress Report</h1><div class="meta">${new Date().toLocaleDateString('en-SG')}</div><h2>Exercise Progress</h2><table class="summary"><thead><tr><th>Exercise</th><th>Start</th><th>Latest</th><th>Change</th><th>Sessions</th></tr></thead><tbody>${summaryRows}</tbody></table><h2>Training History</h2><table><thead><tr><th>Exercise</th><th>Date</th><th>Rounds</th><th>Reps</th><th>Load</th></tr></thead><tbody>${historyRows}</tbody></table></body></html>`;
  const w=window.open('','_blank');if(!w)return toast('Allow pop-ups to export the report.');w.document.open();w.document.write(html);w.document.close();
};

/* Standardize all edit states after earlier prototype functions update the same controls. */
const _v12ClientMain=toggleClientMainEdit;toggleClientMainEdit=function(){_v12ClientMain();setHeaderActionState(document.getElementById('sharedClientEditBtn'),clientMainEditing)};
const _v12ClientHealth=toggleClientHealthEdit;toggleClientHealthEdit=function(){_v12ClientHealth();setHeaderActionState(document.getElementById('clientHealthEditBtn'),clientHealthEditing)};
const _v12Trainer=toggleOwnerTrainerEdit;toggleOwnerTrainerEdit=function(){_v12Trainer();setHeaderActionState(document.getElementById('ownerTrainerHeaderEditBtn'),ownerTrainerEditing)};
const _v12Session=toggleOwnerSessionEdit;toggleOwnerSessionEdit=function(){_v12Session();setHeaderActionState(document.getElementById('ownerSessionHeaderEditBtn'),ownerSessionEditing)};
const _v12Outcome=toggleSessionOutcomeEdit;toggleSessionOutcomeEdit=function(){_v12Outcome();setHeaderActionState(document.getElementById('sessionOutcomeEditBtn'),sessionOutcomeEditing)};
const _v12Summary=toggleClientSummaryEdit;toggleClientSummaryEdit=function(){_v12Summary();setHeaderActionState(document.getElementById('clientSummaryEditBtn'),clientSummaryEditing)};

const _v12CancelClientMain=cancelClientMainEdit;cancelClientMainEdit=function(){_v12CancelClientMain();setHeaderActionState(document.getElementById('sharedClientEditBtn'),false)};
const _v12CancelHealth=cancelClientHealthEdit;cancelClientHealthEdit=function(){_v12CancelHealth();setHeaderActionState(document.getElementById('clientHealthEditBtn'),false)};
const _v12CancelTrainer=cancelOwnerTrainerEdit;cancelOwnerTrainerEdit=function(){_v12CancelTrainer();setHeaderActionState(document.getElementById('ownerTrainerHeaderEditBtn'),false)};
const _v12CancelSession=cancelOwnerSessionEdit;cancelOwnerSessionEdit=function(){_v12CancelSession();setHeaderActionState(document.getElementById('ownerSessionHeaderEditBtn'),false)};
const _v12CancelOutcome=cancelSessionOutcomeEdit;cancelSessionOutcomeEdit=function(){_v12CancelOutcome();setHeaderActionState(document.getElementById('sessionOutcomeEditBtn'),false)};
const _v12CancelSummary=cancelClientSummaryEdit;cancelClientSummaryEdit=function(){_v12CancelSummary();setHeaderActionState(document.getElementById('clientSummaryEditBtn'),false)};

/* Exercise Plan: exactly one Edit action in view mode; edit mode is Add Exercise + Save + Cancel. */
const _v12RenderPlan=renderSessionExerciseRows;
renderSessionExerciseRows=function(){
  _v12RenderPlan();
  const edit=document.getElementById('editSessionPlanBtn');if(edit)edit.textContent='Edit';
  const add=document.getElementById('addSessionExerciseBtn');if(add)add.textContent='Add Exercise';
  const save=document.getElementById('saveSessionPlanBtn');if(save)save.textContent='Save';
  const cancel=document.getElementById('cancelSessionPlanBtn');if(cancel)cancel.textContent='Cancel';
  /* In view mode only Edit is visible. Edit actions appear only after Edit is selected. */
  const view=document.getElementById('sessionPlanViewActions');
  const actions=document.getElementById('sessionPlanEditActions');
  if(sessionPlanEditing){ view?.classList.add('hidden'); actions?.classList.remove('hidden'); }
  else { actions?.classList.add('hidden'); }
};

const _v13RefreshSession=refreshTrainerSessionPage;
refreshTrainerSessionPage=function(){
  _v13RefreshSession();
  const edit=document.getElementById('ownerSessionHeaderEditBtn');
  if(edit)setHeaderActionState(edit,ownerSessionEditing);
  setHeaderActionState(document.getElementById('sessionOutcomeEditBtn'),sessionOutcomeEditing);
  setHeaderActionState(document.getElementById('clientSummaryEditBtn'),clientSummaryEditing);
  const planEdit=document.getElementById('editSessionPlanBtn');if(planEdit)planEdit.textContent='Edit';
  if(!sessionPlanEditing)document.getElementById('sessionPlanEditActions')?.classList.add('hidden');
};

const _v12Capture=toggleCaptureRecording;
toggleCaptureRecording=function(btn){_v12Capture(btn);const ind=document.getElementById('captureRecordingIndicator');if(ind)ind.textContent=captureRecording?'Recording':'Video ready';if(btn)btn.textContent=captureRecording?'Stop':'Record'};

window.addEventListener('load',()=>{
  ['sharedClientEditBtn','clientHealthEditBtn','ownerTrainerHeaderEditBtn','ownerSessionHeaderEditBtn','sessionOutcomeEditBtn','clientSummaryEditBtn'].forEach(id=>setHeaderActionState(document.getElementById(id),false));
  const e=document.getElementById('editSessionPlanBtn');if(e)e.textContent='Edit';
  document.querySelectorAll('.portal-page .page-head p').forEach(p=>{const t=p.textContent.trim();if(['Client directory','Trainer directory','Session schedule','Monthly trainer remuneration','Monthly remuneration','Website content','Schedule and activity','Business overview','Exercise management','Trainer profile','Profile and availability'].includes(t))p.remove()});
});
