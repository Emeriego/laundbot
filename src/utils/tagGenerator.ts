export function generateNextOrderTag(lastTag: string): string {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const parseTag = (tag: string) => {
      const letters = tag.substring(0, 2);
      const digits = parseInt(tag.substring(2), 10);
      return { letters, digits };
    };
  
    const incrementTag = (letters: string, digits: number) => {
      if (digits < 99) {
        return `${letters}${(digits + 1).toString().padStart(2, '0')}`;
      } else {
        let [firstLetter, secondLetter] = letters.split('');
        if (secondLetter === 'Z') {
          secondLetter = 'A';
          firstLetter = alphabets[(alphabets.indexOf(firstLetter) + 1) % alphabets.length];
        } else {
          secondLetter = alphabets[(alphabets.indexOf(secondLetter) + 1) % alphabets.length];
        }
        return `${firstLetter}${secondLetter}00`;
      }
    };
  
    const { letters, digits } = parseTag(lastTag || 'AA00');
    return incrementTag(letters, digits);
  }
  