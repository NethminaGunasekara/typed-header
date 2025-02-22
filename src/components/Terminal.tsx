import PSIcon from "@/assets/icons/powershell.svg";
import CloseTab from "@/assets/icons/close-tab.svg";
import MinimizeIcon from "@/assets/icons/minimize.svg";
import MaximizeIcon from "@/assets/icons/maximize.svg";
import ArrowDown from "@/assets/icons/arrow-down.svg";
import AddIcon from "@/assets/icons/add-icon.svg";

import styles from "./Terminal.module.css";
import Typed from "typed.js";
import { useEffect, useRef } from "react";
import { userInfo } from "./userInfo";

export default function Terminal() {
  const output = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const generateCatCommand = () => {
      const skillsFormatted = userInfo.skills
        .map(
          (category) =>
            `&emsp;{<br />
            &emsp;&emsp;"name": "${category.name}",<br />
            &emsp;&emsp;"items": ${JSON.stringify(category.items)}<br />
            &emsp;}`
        )
        .join(",<br />");

      return `cat user.ts<br />
      export const user = {<br />
      &emsp;"name": "${userInfo.name}",<br />
      &emsp;"role": "${userInfo.role}",<br />
      &emsp;"location": "${userInfo.location}",<br />
      &emsp;"skills": [<br />
      ${skillsFormatted}<br />
      &emsp;],<br />
      &emsp;"github": "${userInfo.github}",<br />
      &emsp;"website": "${userInfo.website}"<br />
      };`;
    };

    if (output.current) {
      const typed = new Typed(output.current, {
        strings: [generateCatCommand()],
        typeSpeed: 60,
        backSpeed: 0,
        loop: true,
        startDelay: 1000,
        backDelay: 4000,
      });
      return () => typed.destroy();
    }
  }, []);

  return (
    <div className={styles.terminal}>
      <div className={styles.titlebar}>
        <div className={styles.tabTitle}>
          <img src={PSIcon} className={styles.PSIcon} alt="PowerShell Icon" />
          <span>Windows PowerShell</span>
          <img src={CloseTab} className={styles.closeTab} alt="Close Tab" />
        </div>

        <div className={styles.tabControls}>
          <img src={AddIcon} className={styles.addTab} alt="Add Tab" />

          <div className={styles.separator}></div>

          <img
            src={ArrowDown}
            className={styles.selectProfile}
            alt="Select Profile"
          />

          <div className={styles.windowControls}>
            <img
              src={MinimizeIcon}
              className={styles.minimizeWindow}
              alt="Minimize Window"
            />

            <img
              src={MaximizeIcon}
              className={styles.maximizeWindow}
              alt="Maximize Window"
            />

            <img
              src={CloseTab}
              className={styles.closeWindow}
              alt="Close Window"
            />
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <span>{"PS C:\\Users\\Nethmina>"}</span>
        <p ref={output}></p>
      </div>
    </div>
  );
}
