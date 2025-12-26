const PageTitle = ({ title }) => {
  document.title = title ? `${title} | Your App` : "Your App";
  return null;
};

export default PageTitle;
