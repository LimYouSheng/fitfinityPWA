/* Keep remuneration cycle drill-downs free of repeated summary stats. */
const _v023OpenRemunerationBreakdown=openRemunerationBreakdown;
openRemunerationBreakdown=function(monthKey,role){
  _v023OpenRemunerationBreakdown(monthKey,role);
  document.querySelector('#remunerationBreakdownModal .remuneration-popup-stats')?.classList.add('hidden');
};
const _v023OpenOwnerTrainerRemuneration=openOwnerTrainerRemuneration;
openOwnerTrainerRemuneration=function(monthKey,trainer){
  _v023OpenOwnerTrainerRemuneration(monthKey,trainer);
  document.querySelector('#remunerationBreakdownModal .remuneration-popup-stats')?.classList.add('hidden');
};
const _v023OpenOwnerTrainer=openOwnerTrainer;
openOwnerTrainer=function(name){
  _v023OpenOwnerTrainer(name);
  const st=document.getElementById('ownerTrainerStatus');
  if(st&&ownerTrainerData[name])st.textContent=(ownerTrainerData[name].status||'Active').toUpperCase();
};
