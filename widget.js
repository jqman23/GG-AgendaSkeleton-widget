const agendaItems = [
  { time: '9:00 AM', title: 'Standup', subtitle: 'Team sync' },
  { time: '10:30 AM', title: 'Design Review', subtitle: 'Widget mockups' },
  { time: '1:00 PM', title: 'Lunch', subtitle: '' },
  { time: '3:00 PM', title: 'Sprint Planning', subtitle: 'Q3 roadmap' },
];

function renderAgenda(items) {
  const list = document.getElementById('agenda-list');
  list.innerHTML = items.map(item => `
    <div class="agenda-item">
      <span class="time">${item.time}</span>
      <div class="details">
        <div class="title">${item.title}</div>
        ${item.subtitle ? `<div class="subtitle">${item.subtitle}</div>` : ''}
      </div>
    </div>
  `).join('');
}

renderAgenda(agendaItems);
