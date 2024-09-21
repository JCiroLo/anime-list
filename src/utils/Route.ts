type TPath = "anime" | "about" | (string & {}) | number;

const Route = {
  to: (...path: TPath[]) => {
    const url = path.join("/");

    return `/${url}`;
  },
};

export default Route;
