import React from 'react';

import { Story, Meta } from '@storybook/react';

import { IFrame, IFrameProps } from '../IFrame';

export default {
  title: 'IFrame',
  component: IFrame,
} as Meta;

const Template: Story<IFrameProps> = (args) => <IFrame {...args} />;

export const EmbeddedContents = Template.bind({});
EmbeddedContents.args = {
  title: 'embedded contents',
  head: <title>custom IFrame test</title>,
  children: <h1>Hello world</h1>,
};

export const YouTubePlayer = Template.bind({});
YouTubePlayer.args = {
  title: 'embedded YouTube Player',
  width: '560',
  height: '315',
  src: 'https://www.youtube.com/embed/6bbFuPFaEjs',
  frameBorder: '0',
  allow:
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  allowFullScreen: 'true',
};
