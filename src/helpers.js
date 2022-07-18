import sha256 from "sha256";

export const encrypt256 = (key) => {
  try {
    return sha256(key);
  } catch (error) {
    console.log("encrypt error", error);
  }
};

//format định dạng giá khi thao tác ô input giá
export const formatNumberToPrice = (string, currency = "") => {
  if (!string || string === "" || string === 0) return 0;
  string = string.toString();
  string = string.replace(/ /g, "");
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(string)) string = string.replace(pattern, "$1.$2");
  if (typeof currency === "string") {
    string = currency !== "" ? string + " " + currency : string;
  }
  return string;
};
