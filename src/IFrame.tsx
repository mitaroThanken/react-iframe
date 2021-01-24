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

export type IFrameProps = {
  /**
   * iframe に対する title 属性
   */
  title: string;

  /**
   * iframe.contentDocument.head に設定する ReactNode
   *
   * デフォルトは <src>&lt;title&gt;{title}&lt;/title&gt;</src> です。
   */
  head?: React.ReactNode;

  /**
   * iframe.contentDocument.body に設定する ReactNode
   *
   * デフォルトは <src>&lt;h1&gt;Now Loading...&lt;/h1&gt;</src> です。
   */
  children?: React.ReactNode;

  /**
   * iframe に表示する src
   *
   * src の適用は head と children のペアの後になります。
   */
  src?: string;
} & JSX.IntrinsicElements['iframe'];

/**
 * Functional Component 化した iframe
 *
 * Description のない Props は JSX.IntrinsicElements['iframe'] により提供されたもので、そのまま <src>&lt;iframe&gt;</src> の属性として適用されます。
 */
export const IFrame: React.FC<IFrameProps> = ({
  title,
  children,
  head,
  src,
  ...rest
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [iframeHead, setIFrameHead] = useState<Element>();
  const [iframeRoot, setIFrameRoot] = useState<Element>();

  const _head = head ? head : <title>{title}</title>;
  const _body = children ? children : <h1>Now Loading...</h1>;

  useEffect(() => {
    if (iframeRef && iframeRef.current && iframeRef.current.contentDocument) {
      const document = iframeRef.current.contentDocument;
      setIFrameHead(document.head);
      setIFrameRoot(document.body);
    }
  }, [iframeRef]);

  useEffect(() => {
    if (iframeRef && iframeRef.current && src !== undefined) {
      iframeRef.current.src = src;
    }
  }, [iframeRoot]);

  return (
    <iframe title={title} {...rest} ref={iframeRef}>
      {iframeHead && ReactDOM.createPortal(_head, iframeHead)}
      {iframeRoot && ReactDOM.createPortal(_body, iframeRoot)}
    </iframe>
  );
};
