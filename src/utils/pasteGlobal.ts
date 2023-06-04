import robot from "robotjs";
import clipboardy from "clipboardy";

export function globalPaste(textToPaste: string) {
  // Set the clipboard to the input text
  clipboardy.writeSync(textToPaste);

  // Trigger a global paste
  robot.keyTap("v", "command");
}
