import { DocumentEditor } from '@onlyoffice/document-editor-react';
import React from 'react';

const OnlyOfficeEditor: React.FC = () => {
  const fileId = '682d3aca9ec31deac0247768';
  const fileName = 'practica celulas.docx';

  const config = {
    document: {
      fileType: 'docx',
      key: fileId + '-' + Date.now(),
      title: fileName,
      url: `https://bug-learning-philadelphia-affairs.trycloudflare.com/api/files/68249c55d9046cfb735e9f01`,
    },
    documentType: 'text',
    editorConfig: {
      callbackUrl: '',
      user: {
        id: 'usuario1',
        name: 'Usuario Editor',
      },
    },
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: 400,
        background: '#fff',
        zIndex: 9999,
        position: 'fixed',
        top: 0,
        left: 0,
        border: '2px solid red'
      }}
    >
      <DocumentEditor
        id="docEditor"
        documentServerUrl="http://localhost:8888/" // Cambia esto si tu ONLYOFFICE está en otro lado
        config={config}
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default OnlyOfficeEditor;
