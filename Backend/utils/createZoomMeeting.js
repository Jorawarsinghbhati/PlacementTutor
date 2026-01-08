import axios from "axios";
import { getZoomAccessToken } from "./zoomToken.js";

export const createZoomMeeting = async ({
  topic,
  startTime,
  duration,
}) => {
  const token = await getZoomAccessToken();

  const res = await axios.post(
    "https://api.zoom.us/v2/users/me/meetings",
    {
      topic,
      type: 2,
      start_time: startTime,
      duration,
      timezone: "Asia/Kolkata",
      settings: {
        join_before_host: false,
        waiting_room: true,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data.join_url;
};
