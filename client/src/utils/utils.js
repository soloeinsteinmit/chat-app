import moment from "moment";

/**
 * Formats a timestamp into a human-readable format.
 * @param {number|string|Date} createdAt - The timestamp to format.
 * @returns {string} The formatted timestamp, e.g. "Today, 10:30 AM", "Yesterday, 10:30 AM", "Tuesday, 10:30 AM", or "Sep 18, 2024, 10:30 AM".
 */
export const formatTimestamp = (createdAt) => {
  const now = moment();
  const messageDate = moment(createdAt);

  if (messageDate.isSame(now, "day")) {
    // Same day - show "Today, 10:30 AM"
    return `Today, ${messageDate.format("h:mm A")}`;
  } else if (messageDate.isSame(now.subtract(1, "day"), "day")) {
    // Previous day - show "Yesterday, 10:30 AM"
    return `Yesterday, ${messageDate.format("h:mm A")}`;
  } else if (messageDate.isSame(now, "week")) {
    // Same week - show day of the week, e.g. "Tuesday, 10:30 AM"
    return `${messageDate.format("dddd")}, ${messageDate.format("h:mm A")}`;
  } else {
    // Older messages - show full date, e.g. "Sep 18, 2024, 10:30 AM"
    return messageDate.format("MMM D, YYYY, h:mm A");
  }
};
