import history from "../../router/RouterHistory";

const open = (param: string, id?: string, title?: string) => {
  var queriedString = `modal-${param}`;
  if (id) {
    queriedString = new URLSearchParams({
      modal: `modal-${param}`,
      id: id,
      title: title || "",
    }).toString();
  }
  history.push({
    pathname: history.location.pathname,
    search: queriedString,
  });
};

const close = (param: string) => {
  history.push({
    pathname: history.location.pathname,
    search: "",
  });
};

const isOpen = (param: string) =>
  history.location.search.includes(`modal-${param}`);

export const createQueryModal = (param: string) => ({
  open: (id?: string, title?: string) => open(param, id!, title!),
  close: () => close(param),
  isOpen: () => isOpen(param),
});
