export function authorizeModification(req, res, next) {
  const targetUserId = Number(req.params.userId);

  // Parent boleh mengubah watchlist siapa saja
  if (req.user.role === "parent") {
    return next();
  }

  // Child hanya boleh mengubah watchlist miliknya sendiri
  if (
    req.user.role === "child" &&
    Number(req.user.id) === targetUserId
  ) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied",
  });
} 
