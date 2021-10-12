import defaultOptions from 'slider/defaultOptions';

function init(): void {
  document.querySelectorAll("[data-super-slider]").forEach((s) => {
    const data = (<HTMLElement>s).dataset;
    const options: { [k: string]: number | boolean } = {};
    for (const [o, value] of Object.entries(defaultOptions)) {
      if (o in data) { 
        if (typeof value === 'number') {
          options[o] = Number(data[o]);
        }
        if (typeof value === 'boolean') {
          options[o] = data[o] === 'false' ? false : true;
        }
      }
    }
    $(s).slider(options);
  });
}

export default init;

