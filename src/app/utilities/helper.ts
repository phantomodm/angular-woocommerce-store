export const convertToWPValue = (value: string) => {
  if(value.split(' ').length > 1){
    value = formatter(value,' ')
  } else {
    return value.toLocaleLowerCase();
  }
  return;
}

export const formatter = (input: string, separator: string) => {
  const val = input.split(separator);
  val.forEach((w: string, i: number) => {
    val[i] = w.toLowerCase();
  });
  return val.join('-');
}
