export default class TextUtils{

  static isEmpty(value: string | null | undefined): boolean{
    if (value === null || value === undefined) {
      return true;
    }

    return value.trim() === '';
  }

  static contains(text: string | null | undefined, substring: string): boolean{
    if (text === null || text === undefined) {
      return false;
    }

    return text.includes(substring)
  }

  static equals(text1: string, text2: string){
    return text1 === text2;
  }
}