/**
 * @description 创建 uuid
 * @returns {string} 唯一值 uuid
 */
export function createUUID() {
	const temp_url = URL.createObjectURL(new Blob());
	const uuid = temp_url.toString();
	URL.revokeObjectURL(temp_url); //释放这个url
	return uuid.substring(uuid.lastIndexOf('/') + 1);
}
