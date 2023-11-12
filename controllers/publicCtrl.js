// -----------------------get-------------------------
export const get = (req, res) => {
  return res.status(200).json({ message: "This is GET route" });
};

// -----------------------post-------------------------
export const post = (req, res) => {
  return res.status(200).json({ message: "This is POST route" });
};
