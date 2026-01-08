export const groupConsecutiveSlots = (slots) => {
    const grouped = [];
    let current = null;
  
    for (const slot of slots) {
      // ignore booked / buffer slots
      if (slot.isBooked) continue;
  
      if (!current) {
        current = {
          startTime: slot.startTime,
          endTime: slot.endTime,
          slotIds: [slot._id],
        };
      } else if (current.endTime === slot.startTime) {
        // consecutive → merge
        current.endTime = slot.endTime;
        current.slotIds.push(slot._id);
      } else {
        // break in continuity
        grouped.push(current);
        current = {
          startTime: slot.startTime,
          endTime: slot.endTime,
          slotIds: [slot._id],
        };
      }
    }
  
    if (current) grouped.push(current);
  
    return grouped;
  };
export  const groupSlots = (slots) => {
    const grouped = [];
    let current = null;
  
    for (const slot of slots) {
      if (!current) {
        current = {
          startTime: slot.startTime,
          endTime: slot.endTime,
          slotIds: [slot._id],
        };
      } else if (current.endTime === slot.startTime) {
        current.endTime = slot.endTime;
        current.slotIds.push(slot._id);
      } else {
        grouped.push(current);
        current = {
          startTime: slot.startTime,
          endTime: slot.endTime,
          slotIds: [slot._id],
        };
      }
    }
  
    if (current) grouped.push(current);
    return grouped;
  };
  