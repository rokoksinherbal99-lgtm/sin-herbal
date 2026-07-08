import Midtrans from "midtrans-client";

const SERVER_KEY = process.env.MIDTRANS_SERVER_KEY || "";
const CLIENT_KEY = process.env.MIDTRANS_CLIENT_KEY || "";

const isProduction = process.env.MIDTRANS_IS_PRODUCTION === "true";

export const midtransClient = SERVER_KEY
  ? new Midtrans.Snap({
      isProduction,
      serverKey: SERVER_KEY,
      clientKey: CLIENT_KEY,
    })
  : null;

export function getClientKey() {
  return CLIENT_KEY;
}

export function isMidtransEnabled() {
  return !!SERVER_KEY;
}
