"use client";

import { createClientFeature } from "@payloadcms/richtext-lexical/client";
import { MyNode } from "./nodes/MyNode";

export const CustomNodeFeature = createClientFeature({
  nodes: [MyNode],
});
