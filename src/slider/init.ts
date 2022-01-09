import defaultOptions from 'slider/defaultOptions';

function create() {
  document.querySelectorAll('[data-super-slider]').forEach((s) => {
    const data = (<HTMLElement>s).dataset;
    $(s).slider(
      Object.entries(defaultOptions).reduce(
        (options, [o, v]) =>
          o in data
            ? {
                ...options,
                [o]:
                  typeof v === 'number'
                    ? parseFloat(data[o] || String(v))
                    : data[o] === 'true' || (data[o] !== 'false' && v),
              }
            : options,
        {} as Options
      )
    );
  });
}

function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', create);
    return;
  }
  create();
}

export default init;
