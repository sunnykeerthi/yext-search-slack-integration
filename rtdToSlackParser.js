module.exports.formatItem = (x) => {
  const re1 = new RegExp(/([*]{1})(.*)([*]{1})/g);
  const re2 = new RegExp(/([*]{2})(.*)([*]{2})/g);
  const re3 = new RegExp(/([*]{3})(.*)([*]{3})/g);
  const re4 = new RegExp(/([*]{1})(.*)/g);
  const re5 = new RegExp(/\[([^\]]+)\]\(([^)]+)\)/g);
  x = x.replaceAll(re3, "(bital)$2(/bital)");
  x = x.replaceAll(re2, "(bold)$2(/bold)");
  x = x.replaceAll(re1, "(ital)$2(/ital)");
  x = x.replaceAll(re4, "(bullet)$2");
  x = x.replaceAll(re5, "<$2|$1>");
  x = findAndReplace(x);
  x = x.replaceAll("\\-", "-");
  return x;
};

const findAndReplace = (x) => {
  x = x.replaceAll("(bital)", "_*");
  x = x.replaceAll("(/bital)", "*_");
  x = x.replaceAll("(bold)", "*");
  x = x.replaceAll("(/bold)", "*");
  x = x.replaceAll("(ital)", "_");
  x = x.replaceAll("(/ital)", "_");
  x = x.replaceAll("(bullet)", "• ");
  return x;
};
