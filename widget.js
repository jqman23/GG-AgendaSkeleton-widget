const skeleton = [
  {
    day: 'Tuesday, Oct 6',
    blocks: [
      { start: '3:00 AM',  end: '6:30 AM',  types: ['Skill Building Institutes'] },
      { start: '7:00 AM',  end: '10:30 AM', types: ['Skill Building Institutes'] },
      { start: '9:00 AM',  end: '12:30 PM', types: ['Skill Building Institutes'] },
      { start: '11:00 AM', end: '2:30 PM',  types: ['Skill Building Institutes'] },
      { start: '1:00 PM',  end: '4:30 PM',  types: ['Skill Building Institutes'] },
      { start: '3:00 PM',  end: '6:30 PM',  types: ['Skill Building Institutes'] },
      { start: '7:00 PM',  end: '10:30 PM', types: ['Skill Building Institutes'] },
    ],
  },
  {
    day: 'Wednesday, Oct 7',
    blocks: [
      { start: '3:00 AM',  end: '4:00 AM',  types: ['Workshops', 'Creative Space'] },
      { start: '4:15 AM',  end: '5:30 AM',  types: ['Workshops', 'Creative Space'] },
      // Change #1: added International Exchange
      { start: '5:45 AM',  end: '7:15 AM',  types: ['Strategy Sessions', 'International Exchange'] },
      { start: '7:30 AM',  end: '8:45 AM',  types: ['Workshops', 'Creative Space'] },
      { start: '9:00 AM',  end: '10:30 AM', types: ['Strategy Sessions'] },
      { start: '10:45 AM', end: '11:45 AM', types: ['Workshops', 'Creative Space'] },
      { start: '12:00 PM', end: '1:00 PM',  types: ['Keynote'] },
      // Change #2: added Workshops
      { start: '1:15 PM',  end: '2:45 PM',  types: ['Strategy Sessions', 'Workshops'] },
      { start: '3:00 PM',  end: '4:15 PM',  types: ['Workshops', 'Creative Space'] },
      { start: '4:30 PM',  end: '5:30 PM',  types: ['Workshops', 'Creative Space'] },
      { start: '5:45 PM',  end: '7:00 PM',  types: ['Workshops', 'Creative Space'] },
      { start: '7:15 PM',  end: '8:45 PM',  types: ['Strategy Sessions'] },
    ],
  },
  {
    day: 'Thursday, Oct 8',
    blocks: [
      { start: '3:00 AM',  end: '4:00 AM',  types: ['Workshops', 'Creative Space'] },
      { start: '4:15 AM',  end: '5:30 AM',  types: ['Workshops', 'Creative Space'] },
      // Change #3: added Workshops
      { start: '5:45 AM',  end: '7:15 AM',  types: ['Strategy Sessions', 'Workshops'] },
      { start: '7:30 AM',  end: '8:45 AM',  types: ['Workshops', 'Creative Space'] },
      { start: '9:00 AM',  end: '10:30 AM', types: ['Strategy Sessions'] },
      { start: '10:45 AM', end: '11:45 AM', types: ['Workshops', 'Creative Space'] },
      { start: '12:00 PM', end: '1:00 PM',  types: ['Workshops', 'Creative Space'] },
      // Change #5: end time 2:45 → 2:15 (all sessions in this block end at 2:15)
      { start: '1:15 PM',  end: '2:15 PM',  types: ['Workshops', 'Strategy Sessions', 'Creative Space'] },
      { start: '3:00 PM',  end: '3:45 PM',  types: ['Keynote'] },
      { start: '4:00 PM',  end: '5:00 PM',  types: ['Workshops', 'Creative Space'] },
      { start: '5:15 PM',  end: '6:30 PM',  types: ['Workshops', 'Creative Space'] },
      // Change #4: added Creative Space
      { start: '6:45 PM',  end: '8:15 PM',  types: ['Strategy Sessions', 'Creative Space'] },
    ],
  },
];

const typeColors = {
  'Skill Building Institutes': '#7c3aed',
  'Workshops':                 '#2563eb',
  'Creative Space':            '#d97706',
  'Strategy Sessions':         '#059669',
  'International Exchange':    '#dc2626',
  'Keynote':                   '#0891b2',
};

function typePill(type) {
  const color = typeColors[type] || '#6b7280';
  return `<span class="pill" style="background:${color}">${type}</span>`;
}

function render() {
  const app = document.getElementById('app');
  app.innerHTML = skeleton.map(({ day, blocks }) => `
    <section class="day">
      <h2 class="day-header">${day}</h2>
      <div class="blocks">
        ${blocks.map(({ start, end, types }) => `
          <div class="block">
            <div class="time">${start} – ${end}</div>
            <div class="pills">${types.map(typePill).join('')}</div>
          </div>
        `).join('')}
      </div>
    </section>
  `).join('');
}

render();
