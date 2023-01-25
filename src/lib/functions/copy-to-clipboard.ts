import { AlertEnum } from '$lib/models/misc';
import { alerts } from '$lib/store';

export const handleCopytoClipBoard = ({
	elementId,
	message,
	content
}: {
	elementId?: string;
	message?: string;
	content?: string;
}) => {
	const text = elementId ? document.getElementById(elementId)?.innerText : content;
	if (!text && !content) return;
	navigator.clipboard.writeText(text || content || '');
	alerts.update((alerts) => [
		...alerts,
		{ type: AlertEnum.info, message: message || text || '', createdOn: new Date().getTime() }
	]);
};
