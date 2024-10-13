type TPath = "anime" | "about" | (string & {}) | number;

const Route = {
  to: (...path: TPath[]) => {
    const url = path.join("/");

    return `/${url}`;
  },
  build: (path: TPath[]) => {
    const url = path.join("/");

    return `${window.location.origin}/${url}`;
  },
};

export default Route;
