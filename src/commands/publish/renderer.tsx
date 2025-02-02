import React from 'react';
import { render } from 'ink';

import AsyncAction from '../../components/async-action';
import UploadView from './upload-view';

interface PublishRenderOptions {
  body: string;
  content?: string;
  verbose?: boolean;
}

const renderer = (action: string, options: PublishRenderOptions) => {
  render(
    <AsyncAction
      loadingText={`Publishing ${action}...`}
      verbose={options.verbose}
    >
      <UploadView action={action} options={options} />
    </AsyncAction>
  );
};

export default renderer;
