String.prototype.capitalizeFirst = function () {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
};

String.prototype.langCode = function () {
  return this.split("-")[0];
};
