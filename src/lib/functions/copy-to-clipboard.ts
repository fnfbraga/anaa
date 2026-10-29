import { AlertEnum } from '$lib/models/misc';
import { alerts } from '$lib/store';

export const handleCopytoClipBoard = async ({
	elementId,
	message,
	content
}: {
	elementId?: string;
	message?: string;
	content?: string | null | undefined;
}): Promise<boolean> => {
	const text = elementId ? document.getElementById(elementId)?.innerText : content;
	if (!text && !content) return false;
	const valueToCopy = text || content || '';

	try {
		await navigator.clipboard.writeText(valueToCopy);
		const createdOn = Date.now();
		alerts.update((current) => [
			...current.slice(-3),
			{
				type: AlertEnum.info,
				message: message || 'Copied to clipboard',
				createdOn
			}
		]);
		setTimeout(() => {
			alerts.update((current) => current.filter((item) => item.createdOn !== createdOn));
		}, 3200);
		return true;
	} catch {
		const createdOn = Date.now();
		alerts.update((current) => [
			...current.slice(-3),
			{
				type: AlertEnum.error,
				message: 'Could not copy to clipboard',
				createdOn
			}
		]);
		return false;
	}
};
