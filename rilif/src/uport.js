import { Connect } from "uport-connect"

const uport = new Connect('Rilif', {
  network: "rinkeby",
  bannerImage: {"/": "/ipfs/QmXuH4EfrLQt2fafeGs1GyHjq71CdKp9E3esiq5vYQDLUM"},
});

export default uport;
