import { cn } from "@/utils/cn";
import React from "react";

import { serializeLexical } from "./serialize";

type Props = {
  className?: string;
  content: Record<string, any>;
  enableGutter?: boolean;
  enableProse?: boolean;
};

const RichText: React.FC<Props> = ({
  className,
  content,
  enableGutter = true,
  enableProse = true,
}) => {
  if (!content) {
    return null;
  }

  return (
    <div
      className={cn(
        /* customCSS */
        "gap-10",
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
