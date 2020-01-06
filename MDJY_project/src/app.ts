import { createBrowserHistory as createHistory } from "history";
export const dva = {
  config: {
    onError(err: ErrorEvent) {
      err.preventDefault();
      console.error(err.message);
    },
    initialState: {}, // 初始state
    history: createHistory({
        basename: "/dist"
    })
  },
};
