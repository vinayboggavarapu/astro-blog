import { createIconPack } from "astro-icon/pack";

// Resolves `name` from a remote server, like GitHub! Notice that the `dir` option is not required
export default createIconPack({
  url: "https://raw.githubusercontent.com/radix-ui/icons/master/packages/radix-icons/icons/",
});
