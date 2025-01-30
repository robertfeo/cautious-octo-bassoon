"use client";
import { Highlight } from "prism-react-renderer";
import React from "react";
import { CopyButton } from "./CopyButton";

type Props = {
  code: string;
  language?: string;
};

export const Code: React.FC<Props> = ({ code, language = "" }) => {
  if (!code) return null;

  return (
    <Highlight code={code} language={language}>
      {({ getLineProps, getTokenProps, tokens }) => (
        <pre className="bg-slate-900 p-4 border text-xs border-border rounded overflow-x-auto">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ className: "table-row", line })}>
              <span className="table-cell select-none text-right text-white/25">
                {i + 1}
              </span>
              <span className="table-cell pl-4">
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </span>
            </div>
          ))}
          <CopyButton code={code} />
        </pre>
      )}
    </Highlight>
  );
};
