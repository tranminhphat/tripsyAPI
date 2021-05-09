const CronJob = require("cron").CronJob;
const activityService = require("../services/activityService");
const notificationService = require("../services/notificationService");

const job = new CronJob(
  "* * 6 * * *",
  async () => {
    try {
      const activities = await activityService.getActivities(
        { status: "0" },
        { createdAt: -1 }
      );
      const now = Math.round(Date.now() / 1000);
      if (activities.length !== 0) {
        activities.forEach(async (activity) => {
          if (activity.date.dateObject.unix - now < 2 * 86400) {
            await notificationService.createNotification({
              receiverId: activity.experience.hostId,
              message: `Hoạt động ${activity.experience.title} vào ngày ${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year} sắp bắt đầu`,
              link: `/user/experience-hosting/${activity.experience._id}/activation/${activity._id}`,
            });

            if (activity.listOfGuestId !== 0) {
              activity.listOfGuestId.forEach(async (guestId) => {
                await notificationService.createNotification({
                  receiverId: guestId,
                  message: `Hoạt động ${activity.experience.title} vào ngày ${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year} sắp bắt đầu`,
                  link: `/user/activities`,
                });
              });
            }
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();
