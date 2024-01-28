/**
 * @description 创建 uuid
 */
export default function createUUID(): string {
	const tempUrl: string = URL.createObjectURL(new Blob());
	const uuid: string = tempUrl.substring(tempUrl.lastIndexOf('/') + 1);
	//释放这个url
	URL.revokeObjectURL(tempUrl);
	return uuid;
}
