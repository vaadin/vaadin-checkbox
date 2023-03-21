window.nextRender = async(element) => {
  return new Promise(resolve => {
    Polymer.RenderStatus.afterNextRender(element, resolve);
  });
};
