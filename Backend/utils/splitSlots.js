const addMinutes = (time, minutes) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m + minutes, 0, 0);
    return d.toTimeString().slice(0, 5);
  };
  
  export const splitIntoSlots = (startTime, endTime, duration = 15) => {
    const slots = [];
    let current = startTime;
  
    while (current < endTime) {
      const next = addMinutes(current, duration);
      if (next > endTime) break;
  
      slots.push({ startTime: current, endTime: next });
      current = next;
    }
  
    return slots;
  };
  