/**
 * Return only the notifications that have not been read.
 * @param {Array} notifications
 * @returns {Array} notifications that have not been read
 */
export const unreadNotification = (notifications) => {
  return notifications.filter((notification) => notification.isRead === false);
};
