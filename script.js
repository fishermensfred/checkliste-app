// ✅ Standard-Aufgabenliste (du kannst sie ändern)
const defaultTasks = [
    "Zähne Putzen morgens",
    "Zähne putze abends",
    "Sport machen",
    "30 Minuten Schule",
    "Duschen",
    "10 Minuten Fokus",
    "Clash of Clans"
  ];
  
  // 🔑 Schlüssel für den lokalen Speicher (damit du sie später wieder findest)
  const STORAGE_KEY = "checkliste-tasks";
  const LAST_RESET_KEY = "checkliste-last-reset";
  
  // 📦 Lade gespeicherte Aufgaben oder nimm Standard
  function loadTasks() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    } else {
      // Erzeuge neue Aufgaben (alle nicht abgehakt)
      return defaultTasks.map(task => ({ name: task, checked: false }));
    }
  }
  
  // 💾 Speichere Aufgaben + das Datum des letzten Speicherns
  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    localStorage.setItem(LAST_RESET_KEY, new Date().toDateString());
  }
  
  // 🔁 Setze alle Aufgaben zurück (entfernt alle Haken)
  function resetTasks() {
    const reset = defaultTasks.map(task => ({ name: task, checked: false }));
    saveTasks(reset);
    renderTasks();
  }
  
  // 🖼️ Zeige alle Aufgaben im HTML an
  function renderTasks() {
    const container = document.getElementById("task-list");
    container.innerHTML = ""; // Löscht vorherige Anzeige
  
    const tasks = loadTasks();
  
    tasks.forEach((task, index) => {
      const taskDiv = document.createElement("div");
      taskDiv.className = "task";
  
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = task.checked;
  
      checkbox.onchange = () => {
        tasks[index].checked = checkbox.checked;
        saveTasks(tasks);
        if (checkbox.checked) {
          shootConfetti();  // Hier wird das Konfetti ausgelöst!
        }
      };
      
  
      const label = document.createElement("span");
      label.textContent = task.name;
  
      taskDiv.appendChild(checkbox);
      taskDiv.appendChild(label);
      container.appendChild(taskDiv);
    });
  }
  
  // 📅 Täglicher Reset: Prüft, ob das Datum seit letztem Speichern anders ist
  function checkDailyReset() {
    const lastReset = localStorage.getItem(LAST_RESET_KEY);
    const today = new Date().toDateString();
  
    if (lastReset !== today) {
      resetTasks(); // Aufgaben zurücksetzen, wenn neuer Tag
    } else {
      renderTasks(); // Ansonsten einfach anzeigen
    }
  }
  function shootConfetti() {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
  
  // ▶️ Starte die App, wenn die Seite geladen ist
  window.onload = checkDailyReset;
  
