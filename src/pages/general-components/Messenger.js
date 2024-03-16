import { notification } from "antd";

export const showNotification = (
	type,
	description,
	key = undefined,
	duration = 1,
) => {
	notification[type]({
		message: "",
		description,
		key,
		duration,
	});
};

export const destroyNotification = (key) => notification.destroy(key);
