export const getOnlyOfficeFileUrl = (fileId: string) =>
  `http://localhost:5000/api/files/file/${fileId}`;

export const getOnlyOfficeCallbackUrl = (fileId: string) =>
  `http://localhost:5000/api/files/onlyoffice-callback/${fileId}`;