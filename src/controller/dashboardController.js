import {onPageLoad} from "../public/js/index";
const getPage = (req, res) => {
  onPageLoad()
};

module.exports = {getPage};
