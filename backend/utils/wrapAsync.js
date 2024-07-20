const wrapAsync = (fn) => {
  return (req, res, next) => {
    console.log("wrapAsynch hit ");
    fn(req, res, next).catch(next);
  };
};
module.exports = wrapAsync;
