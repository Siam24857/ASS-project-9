import { auth } from "@/app/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";


const handlers = toNextJsHandler(auth);

export const { GET, POST } = handlers;