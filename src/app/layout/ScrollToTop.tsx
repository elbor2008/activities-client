import { useEffect, FC } from 'react';
import { withRouter } from 'react-router-dom';

const ScrollToTop: FC<any> = ({ children, location: { pathname } }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return children || null;
};

export default withRouter(ScrollToTop);
