export function highlightText(text: string, phrasesToUnderline: string[]) {
  let processedText = text;

  phrasesToUnderline.forEach((phrase) => {
    const regex = new RegExp(`(${phrase})`, 'gi');
    if (text.match(regex)) { 
      processedText = processedText.replace(regex, 
        `<span 
          style="
            color: white; 
            text-shadow: 0 0 7px rgb(0 31 170), 0 0 7px rgb(0 108 255), 0 0 20px rgb(30 76 219 / 70%);
          "
        >
          $1
        </span>`
      );
    }
  });

  return processedText;
}
