import ReactGA from 'react-ga';

export const initGA = () => {
  ReactGA.initialize('G-RWW57SD920'); // Replace with your actual measurement ID
};

export const logPageView = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};
