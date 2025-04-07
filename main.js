const shiftsDiv = document.getElementById('shifts');
const logDiv = document.getElementById('log');

function addShift() {
  const div = document.createElement('div');
  div.className = 'shift-entry';
  div.innerHTML = '<input type="time" class="start"> ~ <input type="time" class="end"> 備註：<input type="text" class="note">';
  shiftsDiv.appendChild(div);
}

function saveLog() {
  const date = document.getElementById('date').value;
  const entries = shiftsDiv.querySelectorAll('.shift-entry');
  let logHtml = `<h3>日期：${date}</h3><ul>`;
  entries.forEach(entry => {
    const start = entry.querySelector('.start').value;
    const end = entry.querySelector('.end').value;
    const note = entry.querySelector('.note').value;
    if (start && end) {
      const duration = calcDuration(start, end);
      logHtml += `<li>${start} - ${end}（${duration}）${note ? '｜備註：' + note : ''}</li>`;
    }
  });
  logHtml += '</ul>';
  logDiv.innerHTML = logHtml;
  shiftsDiv.innerHTML = '';
}

function calcDuration(start, end) {
  const [sh, sm] = start.split(':').map(Number);
  const [eh, em] = end.split(':').map(Number);
  let startMins = sh * 60 + sm;
  let endMins = eh * 60 + em;
  if (endMins < startMins) endMins += 24 * 60;
  const diff = endMins - startMins;
  return `${Math.floor(diff / 60)}小時${diff % 60}分鐘`;
}

addShift();