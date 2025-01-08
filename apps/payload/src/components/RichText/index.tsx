"use server";

import { cn } from "@/utils/cn";
import React from "react";

import { serializeLexical } from "./serialize";

type Props = {
  className?: string;
  content: Record<string, any>;
};

const RichText: React.FC<Props> = ({
  className,
  content,
}) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(
        "space-y-10 mt-0 pt-0",
        className,
      )}
    >
      {content &&
        !Array.isArray(content) &&
        typeof content === "object" &&
        "root" in content &&
        serializeLexical({ nodes: content?.root?.children })}
    </div>
  );
};

export default RichText;
