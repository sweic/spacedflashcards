import React, { useState } from "react";

export const useSidebar = () => {
  const [content, setContent] = useState<string>("dashboard");
  return { content, setContent };
};
