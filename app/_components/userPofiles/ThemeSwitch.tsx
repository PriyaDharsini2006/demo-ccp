"use client";

import { IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { CiDark, CiLight } from "react-icons/ci";

const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div>
      <IconButton
        onClick={() => {
          theme == "light" ? setTheme("dark") : setTheme("light");
        }}
        variant="ghost"
        color="gray"
        highContrast
      >
        {theme == "light" ? <CiDark size={26} /> : <CiLight size={26} />}
      </IconButton>
    </div>
  );
};

export default ThemeSwitch;
