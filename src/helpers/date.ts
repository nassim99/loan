export const convertDate: (d: string) => string = inputFormat => {
  function pad(s: any) {
    return s < 10 ? '0' + s : s;
  }
  var d = new Date(inputFormat.replace(' ', 'T'));
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
};
