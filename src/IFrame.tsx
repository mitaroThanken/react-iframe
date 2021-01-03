/*
  react-iframe

  Copyright (C) 2021 mitarothanken

  Use of this source code is governed by a ISC-style
  license that can be found in the LICENSE file or at
  https://opensource.org/licenses/ISC
 */
import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import * as ReactDOM from 'react-dom';

type IFrameProps = {
  children?: React.ReactNode;
  head?: React.ReactNode;
} & JSX.IntrinsicElements['iframe'];

export const IFrame: React.FC<IFrameProps> = ({
  title,
  children,
  head,
  ...rest
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [iframeHead, setIFrameHead] = useState<Element>();
  const [iframeRoot, setIFrameRoot] = useState<Element>();

  useEffect(() => {
    if (iframeRef && iframeRef.current && iframeRef.current.contentDocument) {
      setIFrameHead(iframeRef.current.contentDocument.head);
      setIFrameRoot(iframeRef.current.contentDocument.body);
    }
  }, [iframeRef]);

  return (
    <iframe title={title} {...rest} ref={iframeRef}>
      {iframeHead && ReactDOM.createPortal(head, iframeHead)}
      {iframeRoot && ReactDOM.createPortal(children, iframeRoot)}
    </iframe>
  );
};
