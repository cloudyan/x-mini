export function App(opts) {
  opts.onLaunch();

  // opts.data;

  opts.onShow();
}

export function Page(opts) {
  opts.onLoad({});

  // opts.data;

  opts.onShow();
}
