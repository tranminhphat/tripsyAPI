const activityService = require("../services/activityService");
const notificationService = require("../services/notificationService");

const CronJob = require("cron").CronJob;

const incommingActivityJob = new CronJob(
	"59 59 23 * * *",
	async () => {
		try {
			const activities = await activityService.getActivities(
				{ status: "0" },
				{ createdAt: -1 }
			);
			const now = Math.round(Date.now() / 1000);
			if (activities.length !== 0) {
				activities.forEach(async (activity) => {
					if (
						activity.date.dateObject.unix - now < 86400 &&
						activity.date.dateObject.unix - now > 0
					) {
						await notificationService.createNotification({
							receiverId: activity.experience.hostId,
							message: `Hoạt động <b>${activity.experience.title}</b> vào ngày <b>${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year}</b> sắp bắt đầu`,
							link: `/user/experience-hosting/${activity.experience._id}/activation/${activity._id}`,
						});

						if (activity.listOfGuestId !== 0) {
							activity.listOfGuestId.forEach(async (guestId) => {
								await notificationService.createNotification({
									receiverId: guestId,
									message: `Hoạt động <b>${activity.experience.title}</b> vào ngày <b>${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year}</b> sắp bắt đầu`,
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

const inactivatedActivityJob = new CronJob("59 59 5 * * *", async () => {
	try {
		const activities = await activityService.getActivities(
			{ status: "0" },
			{ createdAt: -1 }
		);
		const now = Math.round(Date.now() / 1000);
		if (activities.length !== 0) {
			activities.forEach(async (activity) => {
				if (
					activity.date.dateObject.unix - now < 0 &&
					activity.listOfGuestId.length === 0
				) {
					await activityService.deleteActivityById(activity._id);
					await notificationService.createNotification({
						receiverId: activity.experience.hostId,
						message: `Hoạt động <b>${activity.experience.title}</b> vào ngày <b>${activity.date.dateObject.day}/${activity.date.dateObject.month}/${activity.date.dateObject.year}</b> đã được hủy tự động vì không có khách tham gia`,
						link: `/user/experience-hosting/${activity.experience._id}/activation`,
					});
				}
			});
		}
	} catch (err) {
		console.error(err);
	}
});

incommingActivityJob.start();
inactivatedActivityJob.start();
