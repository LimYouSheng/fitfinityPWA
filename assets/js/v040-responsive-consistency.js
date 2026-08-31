/* v0.40 — remuneration cycle row structure */
(function(){
  window.ownerRemunerationTrainerListMarkup=function(monthKey){
    const month=financeMonthlyData[monthKey];
    return `<div class="rem-trainer-list">${Object.entries(month.trainers).map(([trainer,detail])=>{
      const status=month.status[trainer]||'Pending';
      const cls=status==='Approved'?'green':'amber';
      const payout=(typeof ownerSensitiveMoneyV29==='function')?ownerSensitiveMoneyV29(money(detail.payout)):money(detail.payout);
      return `<div class="rem-trainer-list-row rem-trainer-list-row-v40">
        <div class="rem-list-name-v40"><strong>${escapeHtml(trainer)}</strong></div>
        <div class="rem-list-metric-v40 rem-list-sessions-v40"><small>SESSIONS</small><strong>${detail.sessions}</strong></div>
        <div class="rem-list-metric-v40 rem-list-payout-v40"><small>REMUNERATION</small><span>${payout}</span></div>
        <div class="rem-list-metric-v40 rem-list-status-v40"><small>STATUS</small><span class="pill ${cls}">${escapeHtml(status)}</span></div>
        <button class="btn btn-sm" onclick="openOwnerTrainerRemuneration('${monthKey}','${trainer.replace(/'/g,"\\'")}')">View</button>
      </div>`;
    }).join('')}</div>`;
  };
})();
