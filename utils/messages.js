function returnErrorAdmin(res, err) {
  return (
    res.status(500),
    json({
      error: true,
      message: "Technical Error, contact an administrator",
    })
  );
}

function returnContent(res, message, content, status) {
  return res.status(status).json({ error: false, message, content });
}

module.exports = {
  returnErrorAdmin,
  returnContent,
};
