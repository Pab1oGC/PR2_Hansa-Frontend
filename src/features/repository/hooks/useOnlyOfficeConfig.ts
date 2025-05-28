import { getOnlyOfficeCallbackUrl, getOnlyOfficeFileUrl } from '../services/onlyofficeService';

export const useOnlyOfficeConfig = (fileId: string, fileName: string) => ({
  document: {
    fileType: 'docx',
    key: fileId,
    title: fileName,
    url: getOnlyOfficeFileUrl(fileId),
  },
  documentType: 'text',
  editorConfig: {
    callbackUrl: getOnlyOfficeCallbackUrl(fileId),
    user: {
      id: 'usuario1',
      name: 'Usuario Editor',
    },
  },
  height: '100%',
  width: '100%',
});