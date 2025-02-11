import { Boom } from "@hapi/boom";
import makeWASocket, {
  DisconnectReason,
  fetchLatestBaileysVersion,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
} from "@whiskeysockets/baileys";
import core from "express";
import fs from "fs";
import NodeCache from "node-cache";
import P from "pino";
import { convertToValidPhoneNumber } from "./common";

const logger = P({ timestamp: () => `,"time":"${new Date().toJSON()}"` });
logger.level = "silent";

const msgRetryCounterCache = new NodeCache();
const authDir = "wauth";
const idSuffix = "@s.whatsapp.net";

export class Whatsapp {
  private static socket: any;

  static async init(app: core.Express): Promise<void> {
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const { version } = await fetchLatestBaileysVersion();

    const sock = makeWASocket({
      version,
      logger,
      printQRInTerminal: false,
      auth: {
        creds: state.creds,
        keys: makeCacheableSignalKeyStore(state.keys, logger),
      },
      msgRetryCounterCache,
      generateHighQualityLinkPreview: true,
    });

    sock.ev.process(async (events: any) => {
      if (events["connection.update"]) {
        const update = events["connection.update"];
        const { connection, lastDisconnect, qr } = update;

        if (connection === "open") {
          app.locals.qr = { status: "complete", qr: null };
        }

        if (connection === "close") {
          if (
            (lastDisconnect?.error as Boom)?.output?.statusCode ==
            DisconnectReason.loggedOut
          ) {
            fs.rmSync(authDir, {
              recursive: true,
              force: true,
            });
          }

          this.init(app);
        }

        if (qr) {
          app.locals.qr = { status: "pending", qr: qr };
        }
      }

      if (events["creds.update"]) {
        await saveCreds();
      }
    });

    this.socket = sock;
  }

  static async send(phone: string, message: string): Promise<void> {
    if (this.socket) {
      const formattedPhone = convertToValidPhoneNumber(phone);
      const id = formattedPhone + idSuffix;

      if (message.length > 0) {
        await this.socket.sendMessage(id, {
          text: message,
        });
      }
    }
  }
}
