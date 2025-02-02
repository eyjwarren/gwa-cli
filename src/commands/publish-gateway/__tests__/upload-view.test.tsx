import React, { Suspense } from 'react';
import chalk from 'chalk';
import delay from 'delay';
import { render } from 'ink-testing-library';
import { Text } from 'ink';

import UploadView from '../upload-view';
import publish from '../../../services/publish';

jest.mock('../../../services/publish');

describe('commands/publish/upload-view', () => {
  const result = {
    message: 'success',
    results: 'all done',
  };

  it('should send the correct args to publish', async () => {
    publish.mockResolvedValueOnce(result);
    const options = {
      configFile: 'input',
      dryRun: 'true',
    };
    render(
      <Suspense fallback={<Text>Loading...</Text>}>
        <UploadView options={options} />
      </Suspense>
    );
    await delay(100);
    expect(publish).toHaveBeenCalledWith(
      '/namespaces/:namespace/gateway',
      options
    );
  });

  it('should render upload message', async () => {
    publish.mockResolvedValueOnce(result);
    const options = {
      configFile: 'input.yaml',
      dryRun: 'true',
    };
    const { lastFrame } = render(
      <Suspense fallback={<Text>Loading...</Text>}>
        <UploadView options={options} />
      </Suspense>
    );
    await delay(100);
    expect(lastFrame()).toEqual(
      `${chalk.bold.green`✓`} ${chalk.bold(
        chalk.green`Success`,
        'Configuration input.yaml Published'
      )}

success

all done`
    );
  });
});
