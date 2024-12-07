const StringUtils = {
  slugify(string: string) {
    return string.replace(/\s+/g, "-").toLowerCase();
  },
};

export default StringUtils;
