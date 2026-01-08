import AdminGlobalBlock from "../models/AdminGlobalBlock";

export const isGlobalBlocked = async ({ date, startTime, endTime }) => {
  const block = await AdminGlobalBlock.findOne({
    date,
    isActive: true,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  });

  return !!block;
};
