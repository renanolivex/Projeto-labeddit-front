export const goToHomePage = (navigate) => {
  navigate("/posts");
};

export const goToSignupPage = (navigate) => {
  navigate("/signup");
};

export const goToLoginPage = (navigate) => {
  navigate("/");
};

export const goToCommentsPage = (navigate,id) => {
  navigate(`/comments/${id}`);
};

/* export const goToCommentsPage = (navigate, recipeId) => {
  navigate(`/comments/${recipeId}`);
};
 */
